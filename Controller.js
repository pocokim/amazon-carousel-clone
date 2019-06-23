import Carousel from './Carousel.js';
import Navigation from './Naviagtion.js';

class Controller {
    constructor({ carousel, navigation }) {
        this.carousel = carousel;
        this.navigation = navigation;
        this.currentIndex = 0;
        this.previousIndex = undefined;
    }
    registerEvents() {
        this.carousel.leftBtn.addEventListener('click', this.onClickHandler.bind(this));
        this.carousel.rightBtn.addEventListener('click', this.onClickHandler.bind(this));
    }
    init() {
        this.currentIndex = this.makeRandomIndex();
        this.carousel.drawCardPosition(this.currentIndex);
        this.navigation.drawCurrentNavItem(this.currentIndex); 
        this.registerEvents();
    }
    onClickHandler(event) {
        const selectedDirection = event.target.id;
        event.preventDefault();
        this.moveIndex(selectedDirection);
        this.carousel.drawCardPosition(this.currentIndex);
        this.navigation.drawCurrentNavItem(this.currentIndex,this.previousIndex); 
    }
    moveIndex(direction) {
        this.previousIndex = this.currentIndex;
        let index =
            direction === "left" ? this.currentIndex - 1 : this.currentIndex + 1;
        if (index < 0) index += this.carousel.cardList.childElementCount;
        this.currentIndex = this.modCardLength(index);
        // console.log("controller에서 체크하는 현재화면의 인덱스: " ,this.currentIndex, '이전화면의 인덱스: ',this.previousIndex);
    }
    modCardLength(number) {
        return number % this.carousel.cardList.childElementCount;
    }
    makeRandomIndex() {
        return Math.floor(Math.random() * (this.carousel.cardList.childElementCount - 1));
    }
}

const leftBtn = document.querySelector(".contents__button_left");
const rightBtn = document.querySelector(".contents__button_right");
const cardList = document.querySelector(".carousel__contents > ol");
const navbar = document.querySelector(".carousel__title > ol");

const carousel = new Carousel({ leftBtn, rightBtn, cardList });
const navigation = new Navigation({ navbar });
const amazonController = new Controller({ carousel, navigation });

amazonController.init();