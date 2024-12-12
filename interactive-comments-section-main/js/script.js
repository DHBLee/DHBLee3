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

        updateCurrentUser(data);

        updateComments(data);

        
        const replyBtn = document.querySelectorAll('.main__reply');
        const plusBtn = document.querySelectorAll('.main__plus');
        const minusBtn = document.querySelectorAll('.main__minus');

        replyBtn.forEach(reply => {
            reply.addEventListener('click', () => {
                console.log('reply');
            })
        })

        plusBtn.forEach(plus => {
            plus.addEventListener('click', () =>{
                console.log('plus');
            })
        })

        minusBtn.forEach(minus => {
            minus.addEventListener('click', () =>{
                console.log('minus');
            })
        })




    })


    function updateCurrentUser(data) {

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


})