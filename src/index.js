const sliderElement = document.getElementById('slider');

const slides = [
    {
        img: './images/slide1.svg',
        text: 'Lorem Ipsum has been the industry\'s standard dummy text ever',
    },
    {
        img: './images/slide2.svg',
        text: 'It has survived not only five centuries',
    },
    {
        img: './images/slide3.svg',
        text: 'Lorem Ipsum is simply dummy text',
    },
    {
        img: './images/slide4.svg',
        text: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
    },
    {
        img: './images/slide5.svg',
        text: 'Lorem Ipsum comes from sections 1.10.32 and 1.10.33',
    },
    {
        img: './images/slide6.svg',
        text: 'It was popularised in the 1960s with the release',
    },
    {
        img: './images/slide7.svg',
        text: 'Lorem Ipsum is simply dummy text',
    },
    {
        img: './images/slide8.svg',
        text: 'De Finibus Bonorum et Malorum',
    },
    {
        img: './images/slide9.svg',
        text: 'Lorem Ipsum has been the industry\'s standard dummy text ever',
    },
    {
        img: './images/slide10.svg',
        text: 'Contrary to popular belief',
    },
]

function Slider(sliderContainer, slides) {
    this.sliderContainer = sliderContainer;
    this.slides = slides;
    this.currentSlide = 0;

    this.goToSlide = function (slideNumber) {
        this.currentSlide = slideNumber;
        this.updateSlideContent();
    }

    this.prevSlide = function () {
        if(this.currentSlide - 1 < 0) {
            this.goToSlide(this.slides.length - 1);
        } else {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    this.nextSlide = function () {
        if(this.currentSlide + 2 > this.slides.length) {
            this.goToSlide(0);
        } else {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    this.onArrowClickHandler = function (event) {
        const arrowType = event.target.getAttribute('aria-label');
        if(arrowType === 'prev') {
           this.prevSlide();
        } else {
           this.nextSlide();
        }
    }.bind(this)

    this.createElement = function (element, classList) {
        const domElement = document.createElement(element);
        domElement.classList.add(classList);

        return domElement;
    }

    this.updateSlideContent = function () {
        const slideImgElement = this.sliderContainer.querySelector('.slider__img');
        const slideTextElement = this.sliderContainer.querySelector('.slider__text');
        slideImgElement.setAttribute('src', slides[this.currentSlide].img);
        slideTextElement.innerText = slides[this.currentSlide].text;
    }

    this.init = function () {
        const elements = [
            { tag: 'div', className: 'slider', parent: () => this.sliderContainer },
            { tag: 'div', className: 'slider__slides', parent: () => this.sliderContainer.querySelector('.slider') },
            { tag: 'div', className: 'slider__item', parent: () => this.sliderContainer.querySelector('.slider__slides') },
            { tag: 'h2', className: 'slider__text', parent: () => this.sliderContainer.querySelector('.slider__item') },
            { tag: 'img', className: 'slider__img', parent: () => this.sliderContainer.querySelector('.slider__item') },
            { tag: 'div', className: 'slider__arrows', parent: () => this.sliderContainer.querySelector('.slider') },
        ];

        const sliderArrowsArray = [
            {
                sliderArrow: {
                    tag: 'button',
                    className: 'slider__arrow',
                },
                sliderArrowImg: {
                    tag: 'img',
                    className: 'slider__icon--prev',
                    src: './images/slider-arrow-prev.svg',
                },
                type: 'prev',
            },
            {
                sliderArrow: {
                    tag: 'button',
                    className: 'slider__arrow',
                },
                sliderArrowImg: {
                    tag: 'img',
                    className: 'slider__icon--next',
                    src: './images/slider-arrow-next.svg',
                },
                type: 'next',
            },
        ]

        elements.forEach(item => {
            const element = this.createElement(item.tag, item.className);
            item.parent().appendChild(element);
        })

        sliderArrowsArray.forEach(item => {
            const sliderArrow = this.createElement(item.sliderArrow.tag, item.sliderArrow.className);
            sliderArrow.classList.add(`slider__arrow--${item.type}`)
            const sliderArrowImg = this.createElement(item.sliderArrowImg.tag, item.sliderArrowImg.className);
            sliderArrow.appendChild(sliderArrowImg);
            this.sliderContainer.querySelector('.slider__arrows').appendChild(sliderArrow);
            sliderArrow.setAttribute('aria-label', item.type);
            sliderArrowImg.setAttribute('src', item.sliderArrowImg.src);
            sliderArrow.addEventListener('click', this.onArrowClickHandler);
        })

        this.updateSlideContent();
    }
}

const mySlider = new Slider(sliderElement, slides);

mySlider.init();
