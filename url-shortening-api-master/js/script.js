document.addEventListener('DOMContentLoaded', function() {
    const mobileNav = document.querySelector('.mobile_nav');
    const section2Container = document.querySelector('.section2');

    document.querySelector('.menu').addEventListener('click', () => {
        console.log('yehey');
        mobileNav.style.display = (mobileNav.style.display === 'grid') ? 'none' : 'grid';
    })

    document.querySelector('.section2__shortenbtn').addEventListener('click', function(event) {
        event.preventDefault();

        const urlValue = document.querySelector('#url').value;

        if(urlValue) {
            document.querySelector('#error').style.display = "none";
            document.querySelector('#url').classList.remove('error_input');

            const randomValue = generateRandomString(6);

            const resultContainer = document.createElement('div');
            resultContainer.className = 'result';
    
            resultContainer.innerHTML = `
                    <span>${urlValue}</span>
    
                    <div class="result2">
                        <span class="short_url">https://reLink/${randomValue}</span>
                        <button class="section2__shortenbtn copy">Copy</button>
                    </div>
            `;
    
            section2Container.insertAdjacentElement('afterend', resultContainer);

            applyListener();
        } else {
            document.querySelector('#error').style.display = "inline-block";
            document.querySelector('#url').classList.add('error_input');
        }


    });


    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }

    function applyListener() {
        document.querySelectorAll('.copy').forEach(copy => {
            if (copy.hasAttribute('data-coppy')) {
                return;
            } else {
                copy.addEventListener('click', () => {
                    console.log('yeho');
                    copy.setAttribute('data-copy', 'true');
                    copy.textContent = 'Copied';
                    copy.style.backgroundColor = 'black';
                })
                

            }
        })
    }

})