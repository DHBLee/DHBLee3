
let currentSlide = 0;
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.menu, .close');
    const mobileNav = document.querySelector('.mobile_nav');

    const arrows = document.querySelectorAll('.one, .two');
    const sectionOne = document.querySelector('.section1');

    const slidesData = [
        {
            title: "Discover innovative ways to decorate",
            subtitle: "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.",
            mobileImage: "./images/mobile-image-hero-1.jpg",
            desktopImage: "./images/desktop-image-hero-1.jpg",
    
        },
        {
            title: "We are available all across the globe",
            subtitle: "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
            mobileImage: "./images/mobile-image-hero-2.jpg",
            desktopImage: "./images/desktop-image-hero-2.jpg",
    
        },
        {
            title: "Manufactured with the best materials",
            subtitle: "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.",
            mobileImage: "./images/mobile-image-hero-3.jpg",
            desktopImage: "./images/desktop-image-hero-3.jpg",
        },
    ]
    console.log(slidesData[slidesData.length - 3]);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleNav(mobileNav);
        })
    
    })

    arrows.forEach(arrow => {
        console.log('yehey');
        arrow.addEventListener('click', () => {
            toggleHero(arrow, sectionOne, slidesData);
        })
    })

    updateSectionContent(currentSlide, sectionOne, slidesData);
})

function toggleNav(mobileNav) {
    mobileNav.classList.toggle('active');
}

function toggleHero(arrow, sectionOne, slidesData) {
    console.log('it works')
    if (arrow.getAttribute('data-arrow') === 'left') {
        console.log('left');
        currentSlide = (currentSlide === 0) ? slidesData.length - 1 : currentSlide - 1;
        console.log(currentSlide);
    } else {
        console.log('right');
        console.log(slidesData.length - 1);
        currentSlide = (currentSlide === slidesData.length - 1) ? 0 : currentSlide + 1;
        console.log(currentSlide);
    }
    updateSectionContent(currentSlide, sectionOne, slidesData);
}

function updateSectionContent(currentIndex, sectionOne, slidesData) {

    sectionOne.classList.add('fade');
    const header = document.querySelector('.header');
    header.classList.add('fade');

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const imageUrl = isDesktop ? slidesData[currentIndex].desktopImage : slidesData[currentIndex].mobileImage;

    setTimeout(() => {
        console.log('blah');
        header.style.background = `url(${imageUrl}) no-repeat center center/cover`;
        sectionOne.innerHTML = `
            <h1 class="section1__title">${slidesData[currentIndex].title}</h1>
            <p class="section__subtitle">
                ${slidesData[currentIndex].subtitle}
            </p>
            <a class="section1__link">SHOP NOW</a>
    

        `;

        sectionOne.classList.remove('fade');
        header.classList.remove('fade');
        setTimeout(() => sectionOne.classList.add('show'), 10);
    }, 500)

}