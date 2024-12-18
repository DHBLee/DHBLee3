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

        applyListenersTwo(data);
        




    })


    function updateCurrentUser(data) {
        const userContainer = document.createElement('div');
        userContainer.className = 'user';
        userContainer.innerHTML = `

                <button class="user__send desktop">SEND</button>

                <input class="user__input" placeholder="Add a comment...">

                <div class="user__wrapper" style="display: flex; justify-content: space-between;
                    align-items: center;">
                    <img class="user__profile" src="./images/avatars/image-juliusomo.png" alt="">

                    <button class="user__send mobile">SEND</button>
                </div>
        ` ;

        mainContainer.appendChild(userContainer);

        document.querySelectorAll('.user__send').forEach(send => {
            send.addEventListener('click', () => {

                let userValue = document.querySelector('.user__input').value;
    
                const commentContainer = document.createElement('div');
                commentContainer.className = 'main__comments';
                const currentTime = new Date().toLocaleString();
    
                commentContainer.innerHTML = `
                <div class="main__profile">
                    <img class="main__picture" src="${data.currentUser.image.webp}" alt="">
                    <h6 class="main__username">${data.currentUser.username}</h6>
                    <span class="main__indicator">you</span>
                    <h6 class="main__date">${currentTime}</h6>
                </div>
    
                <p class="main__comment">
                    ${userValue}
                </p>
    
                <div class="main__toggle">
                    <div class="main__like">
                        <button class="main__plus">+</button>
                        <span class="main__likecount">0</span>
                        <button class="main__minus">-</button>
                    </div>
                    <div style="display: flex; gap: 0.7rem;">
                        <button class="main__delete">Delete</button>
                        <button class="main__edit">Edit</button>
                    </div>
                </div>
                `;
    
                mainContainer.insertBefore(commentContainer, userContainer);
                document.querySelector('.user__input').value = '';
                applyListeners(data);
                applyListenersTwo(data);
            })
        })
       
    }
    
    function updateComments(data) {
        console.log(data.comments);
        console.log(data.comments[0].content);

        const sortedComments = data.comments.sort((a,b) => b.score - a.score);

        for (let i = 0; i < sortedComments.length; i++) {
            const commentContainer = document.createElement('div');
            commentContainer.className = 'main__comments';

            const comment = sortedComments[i];

            commentContainer.innerHTML = `

            <div class="desktop__wrapper">
                <div class="desktop__wrapper__wrapper">
                    <div class="main__profile">
                        <img class="main__picture" src="${comment.user.image.webp}" alt="">
                        <h6 class="main__username">${comment.user.username}</h6>
                        <h6 class="main__date">${comment.createdAt}</h6>
                    </div>

                    <button class="main__reply desktop">Reply</button>
                </div>
                

                <p class="main__comment">
                    ${comment.content}
                </p>
            </div>

            <div class="main__toggle">
                <div class="main__like">
                    <button class="main__plus">+</button>
                    <span class="main__likecount">${comment.score}</span>
                    <button class="main__minus">-</button>
                </div>

                <button class="main__reply mobile">Reply</button>
            </div>
            `;

            mainContainer.appendChild(commentContainer);

            if (comment.replies.length > 0) {
                console.log('yehey');

                comment.replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

                for (let i = 0; i < comment.replies.length; i++) {
                    console.log(comment.replies[i].user.username);

                    

                    const replyContainer = document.createElement('div');
                    replyContainer.className = 'main__comments main__replies';

                    const reply = comment.replies[i];

                    if (data.currentUser.username === reply.user.username) {
                        loadUserComment(data, reply, replyContainer);
                    } else {
                        replyContainer.innerHTML = `
                        <div class="desktop__wrapper">
                            <div class="desktop__wrapper__wrapper">
                                <div class="main__profile">
                                    <img class="main__picture" src="${reply.user.image.webp}" alt="">
                                    <h6 class="main__username">${reply.user.username}</h6>
                                    <h6 class="main__date">${reply.createdAt}</h6>
                                </div>

                                <button class="main__reply desktop">Reply</button>
                            </div>

                            <p class="main__comment">
                                <a href="#" class="main__link">@${reply.replyingTo}</a> ${reply.content}
                            </p>
                        </div>

                        <div class="main__toggle">
                            <div class="main__like">
                                <button class="main__plus">+</button>
                                <span class="main__likecount">${reply.score}</span>
                                <button class="main__minus">-</button>
                            </div>

                            <button class="main__reply mobile">Reply</button>
                        </div>
                        `

                        mainContainer.appendChild(replyContainer);
                    }
                }
            }
        }

    };

    function applyListeners(data) {
        const replyBtn = document.querySelectorAll('.main__reply');
        const deleteBtn = document.querySelectorAll('.main__delete');
        const editBtn = document.querySelectorAll('.main__edit');

        if (deleteBtn && editBtn) {
            deleteBtn.forEach(deletes => {

                if (!deletes.hasAttribute('data-delete')) {
                    deletes.addEventListener('click', () => {

                        deletes.getAttribute('data-delete', 'true');

                        const confirmationModal = document.querySelector('.confirmation');

                        confirmationModal.style.display = 'grid';
                        confirmationModal.setAttribute('tabindex', '-1');
                        confirmationModal.focus();
    
                        document.querySelector('.confirmation__yes').addEventListener('click', () => {
                            deletes.closest('.main__comments').remove();
                            document.querySelector('.confirmation').style.display = 'none';
                        })
    
                        document.querySelector('.confirmation__no').addEventListener('click', () => {
                            document.querySelector('.confirmation').style.display = 'none';
                        })
                    })

                } else {
                    return;
                }
            })

            editBtn.forEach(edit => {

                if (!edit.hasAttribute('data-edit')) {

                    edit.addEventListener('click', (e) => {
                        edit.setAttribute('data-edit', 'true');

                        const commentContainer = e.target.closest('.main__comments');
                        const commentContent = commentContainer.querySelector('.main__comment').textContent.trim();
                        const commentImage = commentContainer.querySelector('.main__picture').getAttribute('src');
                        const commentUsername = commentContainer.querySelector('.main__username').textContent;
                        const commentScore = commentContainer.querySelector('.main__likecount').textContent;
                        const commentData = commentContainer.querySelector('.main__date').textContent;
                        commentContainer.innerHTML = `
                            <div class="desktop__wrapper">
                                <div class="desktop__wrapper__wrapper">
                                    <div class="main__profile">
                                        <img class="main__picture" src="${commentImage}" alt="">
                                        <h6 class="main__username">${commentUsername}</h6>
                                        <h6 class="main__date">${commentData}</h6>
                                    </div>

                                </div>

                                <textarea class="user__input">${commentContent}</textarea>

                                <button class="main__update desktop" style="align-self: end;">Update</button>
                            </div>

    
                            <div class="main__toggle">
                                <div class="main__like">
                                    <button class="main__plus">+</button>
                                    <span class="main__likecount">${commentScore}</span>
                                    <button class="main__minus">-</button>
                                </div>

                                <button class="main__update mobile">Update</button>
                            </div>
    
                        `;
    
                        const userInput = commentContainer.querySelector('.user__input');
                        userInput.focus();
                        userInput.selectionStart = userInput.selectionEnd = userInput.value.length; 

                        document.querySelectorAll('.main__update').forEach( update => {
                            update.addEventListener('click', () => {
                                const updatedContent = userInput.value;
                                commentContainer.innerHTML = `
                                    <div class="desktop__wrapper">
                                        <div class="desktop__wrapper__wrapper">
                                            <div class="main__profile">
                                                <img class="main__picture" src="${commentImage}" alt="">
                                                <h6 class="main__username">${commentUsername}</h6>
                                                <span class="main__indicator">you</span>
                                                <h6 class="main__date">${commentData}</h6>
                                            </div>
    
                                            <div class="desktop" style="display: flex; gap: 0.7rem;">
                                                <button class="main__delete">Delete</button>
                                                <button class="main__edit">Edit</button>
                                            </div>
                                        </div>
    
                                        <p class="main__comment">
                                            ${updatedContent}
                                        </p>
                                    </div>
        
                                        <div class="main__toggle">
                                            <div class="main__like">
                                                <button class="main__plus">+</button>
                                                <span class="main__likecount">${commentScore}</span>
                                                <button class="main__minus">-</button>
                                            </div>
                                            <div style="display: flex; gap: 0.7rem;">
                                                <button class="main__delete">Delete</button>
                                                <button class="main__edit">Edit</button>
                                            </div>
                                        </div>
                                `;
                                edit.removeAttribute('data-edit');
                                applyListeners(data);
                                applyListenersTwo(data);
    
                            })
                        })
                    })
                } else {
                    return;
                }


            })
        } 


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
                    console.log(replyInput);
                    console.log(parentDiv.parentElement);
                    console.log(parentDiv.parentElement.parentElement)
                    console.log(parentDiv);
                    console.log(parentDiv.nextElementSibling);


                    parentDiv.insertAdjacentElement('afterend', replyInput);
                    console.log('dumaan siya');
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
                                <a href="#" class="main__link">@${username}</a> ${userInput}
                            </p>

                            <div class="main__toggle">
                                <div class="main__like">
                                    <button class="main__plus">+</button>
                                    <span class="main__likecount">0</span>
                                    <button class="main__minus">-</button>
                                </div>
                                <div style="display: flex; gap: 0.7rem;">
                                    <button class="main__delete">Delete</button>
                                    <button class="main__edit">Edit</button>
                                </div>
                            </div>
                        `;

                        console.log(replyInput);

                        replyInput.className = 'main__comments main__replies';

    
                        applyListeners(data);
                        applyListenersTwo(data);
                        
                    })
                })
            } else {

                return;
            }
        })
    }

    function applyListenersTwo(data) {
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

    function loadUserComment(data, reply, replyContainer) {

            console.log("Magkaparehas sila")

            replyContainer.innerHTML = `
                <div class="desktop__wrapper">
                    <div class="desktop__wrapper__wrapper">
                        <div class="main__profile">
                            <img class="main__picture" src="${reply.user.image.webp}" alt="">
                            <h6 class="main__username">${reply.user.username}</h6>
                            <span class="main__indicator">you</span>
                            <h6 class="main__date">${reply.createdAt}</h6>
                        </div>

                        <div class="desktop" style="display: flex; gap: 0.7rem;">
                            <button class="main__delete">Delete</button>
                            <button class="main__edit">Edit</button>
                        </div>
                    </div>

                    <p class="main__comment">
                        @${reply.replyingTo} ${reply.content}
                    </p>

                </div>


                <div class="main__toggle">
                    <div class="main__like">
                        <button class="main__plus">+</button>
                        <span class="main__likecount">${reply.score}</span>
                        <button class="main__minus">-</button>
                    </div>
                    <div class="mobile" style="display: flex; gap: 0.7rem;">
                        <button class="main__delete">Delete</button>
                        <button class="main__edit">Edit</button>
                    </div>
                </div>
            `

            mainContainer.appendChild(replyContainer);
    }

    function sortCommentsAndReplies() {
        const mainContainer = document.querySelector('.main');

        console.log(mainContainer);

        const commentElements = Array.from(mainContainer.querySelectorAll('.main__comments:not(.main__replies)'));

        console.log(commentElements);

        commentElements.sort((a,b) => {
            const scoreA = parseInt(a.querySelector('.main__likecount').textContent);
            const scoreB = parseInt(b.querySelector('.main__likecount').textContent);
            return scoreB - scoreA;
        });

        mainContainer.innerHTML = '';

        commentElements.forEach(comment => {
            mainContainer.appendChild(comment);

            const replyElements = Array.from(comment.parentNode.querySelectorAll('.main__replies'));
            replyElements.sort((a, b) => {
                const dateA = new Date(a.querySelector('.main__date').textContent);
                const dateB = new Date(b.querySelector('.main__date').textContent);
                return dateA - dateB;
            });

            replyElements.forEach(reply => mainContainer.appendChild(reply));
        });
    }
})