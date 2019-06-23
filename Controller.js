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
        // 왼쪽 버튼, 오른쪽 버튼이 클릭되었을때 onClickHandler 가 캐러샐 클래스의 여러 함수를 실행하도록 한다. 
        // onClickHandler가 현재 index를 바꾸고, this.carousel.drawCardPosition 함수를 실행하여 index에
        // 맞는 상태를 그리도록 한다. 또한 navigation에도 drawCurrentPosition 함수를 두어 index에 맞는 
        // 상태를 그리도록 하자. 
        this.carousel.leftBtn.addEventListener('click', this.onClickHandler.bind(this));
        this.carousel.rightBtn.addEventListener('click', this.onClickHandler.bind(this));
    }
    init() {
        this.currentIndex = this.makeRandomIndex();
        this.carousel.drawCardPosition(this.currentIndex);
        this.navigation.drawCurrentNavItem(this.currentIndex,this.previousIndex); 

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
        // console.log("이전의 인덱스: " ,this.previousIndex, '현재 인덱스: ',this.currentIndex);
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