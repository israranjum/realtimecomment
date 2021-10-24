let username

// socket function
let socket = io()




do{
    username = prompt('Enter your name:')
}while(!username)

const textarea = document.querySelector('#textarea')

const commentBox = document.querySelector('.comment__box')


submitBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    let comment = textarea.value
    if(!comment){
        return
    }
    postComment(comment)
})

function postComment(comment){
     //Append
        let data = {
            username: username,
            comment: comment
        }
        appendToDom(data)
        textarea.value = ''

  //BroadCast
        broadcastComment(data)
  //Sync with mongo db

}


function appendToDom(data){
    let lTag = document.createElement('li')
    lTag.classList.add('comment', 'mb-3')

    let markup = `
                <div class="card border-light mb-3">
                <div class="card-body">
                    <h6>${data.username}</h6>
                    <p>${data.comment}</p>
                    <div>
                        <img src="./img/clock.png" alt="clock">
                        <small>${moment(data.time).format('LT')}</small>
                    </div>
                </div>
            </div>
    
    `
    lTag.innerHTML = markup


    commentBox.prepend(lTag)
}


function broadcastComment(data){
    //Socket data send to server
    socket.emit('comment', data)
}

socket.on('comment',(data)=>{
    appendToDom(data)
})

///debounce function here
let timerId = null;
function debounce(func, timer){
    if(timerId){
        clearTimeout(timerId)
    }
    timerId = setTimeout(()=>{
        func()
    },timer)
}


let typingDiv = document.querySelector('.typing')
socket.on('typing',(data)=>{
    typingDiv.innerText = `${data.username} is typing...`;

    debounce(function(){
        typingDiv.innerHTML = ''
    },1000)
})


// Event Listner on textarea

textarea.addEventListener('keyup',(e)=>{
    socket.emit('typing',{username:username})
})