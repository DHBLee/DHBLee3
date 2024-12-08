document.addEventListener('DOMContentLoaded', function() {
    const btns = document.querySelectorAll('.menu, .close');
    const mobileNav = document.querySelector('.mobile_nav');

    const faqBtns = document.querySelectorAll('.section4__hover');

    const tabBtns = document.querySelectorAll('.section2__btn');

    const emailInput = document.querySelector('.section5__input');
    const errorMessage = document.querySelector('.section5__error');
    const form = document.querySelector('.section5__form');

    const data = [
        {
            'img': "./images/illustration-features-tab-1.svg",
            'title': "Bookmark in one click",
            'subtitle': "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
        },
        {
            'img': "./images/illustration-features-tab-2.svg",
            'title': "Intelligent search",
            'subtitle': "Our powerful search future will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
        },
        {
            'img': "./images/illustration-features-tab-3.svg",
            'title': "Share your bookmarks",
            'subtitle': "Easily share your bookmarks and collectoins with others. Create a shareable link that you can send at the click of a button.",
        },
    ]

    form.addEventListener('submit', function(event) {
        const email = emailInput.value;
        const isValidEmail = validateEmail(email);

        if (!isValidEmail) {
            emailInput.classList.add('section5__input__error');
            errorMessage.style.display = 'inline-block';
            event.preventDefault();
        } else {
            emailInput.classList.remove('section5__input__error');
            errorMessage.style.display = 'none';
        }
    });

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleNav(btn);
        })
    })

    faqBtns.forEach(faq => {
        faq.addEventListener('click', () => {
            console.log('hello');
            toggleFaq(faq);
        })
    })

    tabBtns.forEach(tab => {
        tab.addEventListener('click', () => {
            console.log('blah');
            toggleTabs(tab);
        })
    })

    function toggleNav() {
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('fixed');
    }

    function toggleFaq(btn) {
        const answer = btn.nextElementSibling;
        console.log(answer);
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    }

    function toggleTabs(tab) {
        if (tab.getAttribute('data-option') === 'simple') {
            document.querySelector('.section2__wrapper2').innerHTML = `
                <div class="wrapper2__img">
                    <img class="section2__img" src="${data[0].img}" alt="">
                </div>
                

                <div class="section2__wrapper2__wrapper">
                    <h2 class="section2__title">${data[0].title}</h2>
                    <p class="section2__subtitle">${data[0].subtitle}</p>
                </div>
            `
        } else if (tab.getAttribute('data-option') === 'speedy') {
            document.querySelector('.section2__wrapper2').innerHTML = `
            <div class="wrapper2__img">
                <img class="section2__img" src="${data[1].img}" alt="">
            </div>
            

            <div class="section2__wrapper2__wrapper">
                <h2 class="section2__title">${data[1].title}</h2>
                <p class="section2__subtitle">${data[1].subtitle}</p>
            </div>
        `
        } else if (tab.getAttribute('data-option') === 'easy') {
            document.querySelector('.section2__wrapper2').innerHTML = `
            <div class="wrapper2__img">
                <img class="section2__img" src="${data[2].img}" alt="">
            </div>
            

            <div class="section2__wrapper2__wrapper">
                <h2 class="section2__title">${data[2].title}</h2>
                <p class="section2__subtitle">${data[2].subtitle}</p>
            </div>
        `
        }
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
})
