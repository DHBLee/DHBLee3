document.addEventListener('DOMContentLoaded', function() {
    const mainContainer = document.querySelector('.main');

    console.log('hello');

    fetch('./data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {

        updateComments(data);

        updateCurrentUser(data);

        applyListeners(data);
        




    })


    function updateCurrentUser(data) {
        const userContainer = document.createElement('div');
        userContainer.className = 'user';
        userContainer.innerHTML = `
                <input class="user__input" placeholder="Add a comment...">

                <div class="user__wrapper" style="display: flex; justify-content: space-between;
                    align-items: center;">
                    <img class="user__profile" src="./images/avatars/image-juliusomo.png" alt="">

                    <button class="user__send">SEND</button>
                </div>
        ` ;

        mainContainer.appendChild(userContainer);
    }
    
    function updateComments(data) {
        console.log(data.comments);
        console.log(data.comments[0].content);

        for (let i = 0; i < data.comments.length; i++) {
            const commentContainer = document.createElement('div');
            commentContainer.className = 'main__comments';

            const comment = data.comments[i];

            commentContainer.innerHTML = `
            <div class="main__profile">
                <img class="main__picture" src="${comment.user.image.webp}" alt="">
                <h6 class="main__username">${comment.user.username}</h6>
                <h6 class="main__date">${comment.createdAt}</h6>
            </div>

            <p class="main__comment">
                ${comment.content}
            </p>

            <div class="main__toggle">
                <div class="main__like">
                    <button class="main__plus">+</button>
                    <span class="main__likecount">${comment.score}</span>
                    <button class="main__minus">-</button>
                </div>
                <span class="main__reply">Reply</span>
            </div>
            `;

            mainContainer.appendChild(commentContainer);

            if (comment.replies.length > 0) {
                console.log('yehey');


                for (let i = 0; i < comment.replies.length; i++) {
                    console.log(comment.replies[i].user.username);

                    const replyContainer = document.createElement('div');
                    replyContainer.className = 'main__comments main__replies';

                    const reply = comment.replies[i];

                    replyContainer.innerHTML = `
                        <div class="main__profile">
                            <img class="main__picture" src="${reply.user.image.webp}" alt="">
                            <h6 class="main__username">${reply.user.username}</h6>
                            <h6 class="main__date">${reply.createdAt}</h6>
                        </div>

                        <p class="main__comment">
                            ${reply.content}
                        </p>

                        <div class="main__toggle">
                            <div class="main__like">
                            <button class="main__plus">+</button>
                            <span class="main__likecount">${reply.score}</span>
                            <button class="main__minus">-</button>
                            </div>
                            <span class="main__reply">Reply</span>
                        </div>
                    `

                    mainContainer.appendChild(replyContainer);
                }



            }
        }
    };

    function applyListeners(data) {
        const replyBtn = document.querySelectorAll('.main__reply');

        replyBtn.forEach(reply => {

            if (!reply.hasAttribute('data-reply')) {

                reply.addEventListener('click', (event) => {  
                    reply.setAttribute('data-reply', 'true');
                    
                    const parentDiv = event.target.parentElement.parentElement;
                    console.log(parentDiv);

                    const username = parentDiv.querySelector('.main__username').textContent;

                    if (parentDiv.nextElementSibling && parentDiv.nextElementSibling.classList.contains('user')) {
                        console.log('Reply container already exists');
                        return;
                    }

                    const replyInput = document.createElement('div');

                    replyInput.className = 'user';
                    replyInput.innerHTML = `
                        <input class="user__input" value="@${username}" placeholder="Add a comment...">

                        <div class="user__wrapper" style="display: flex; justify-content: space-between;
                            align-items: center;">
                            <img class="user__profile" src="./images/avatars/image-juliusomo.png" alt="">

                            <button class="user__send reply">REPLY</button>
                        </div>
                    `;
                    parentDiv.insertAdjacentElement('afterend', replyInput);

                    replyInput.querySelector('.user__send.reply').addEventListener('click', () => {
                        const userInput = replyInput.querySelector('.user__input').value;

                        if (!userInput.trim()) {
                            console.log('Reply cannot be empty');
                            return;
                        }

                        const currentTime = new Date().toLocaleString();

                        replyInput.innerHTML = `
                           <div class="main__profile">
                                <img class="main__picture" src="${data.currentUser.image.webp}" alt="">
                                <h6 class="main__username">${data.currentUser.username}</h6>
                                <h6 class="main__date">${currentTime}</h6>
                            </div>

                            <p class="main__comment">
                                ${userInput}
                            </p>

                            <div class="main__toggle">
                                <div class="main__like">
                                    <button class="main__plus">+</button>
                                    <span class="main__likecount">0</span>
                                    <button class="main__minus">-</button>
                                </div>
                                <span class="main__reply">Reply</span>
                            </div>
                        `;
                        
                    })
                })
            } else {

                return;
            }
        })

        document.querySelectorAll('.main__like button').forEach(button => {

            if (!button.hasAttribute('data-likes')) {

                button.addEventListener('click', (event) => {
                    console.log('hello');
                    const isPlus = button.classList.contains('main__plus');
                    const countElement = isPlus
                        ? button.nextElementSibling
                        : button.previousElementSibling;
    
                    let currentScore = parseInt(countElement.textContent, 10);
                    countElement.textContent = isPlus
                        ? currentScore + 1
                        : Math.max(currentScore - 1, 0);
                });

                button.setAttribute('data-likes', 'true');
            }
        });
    }
})