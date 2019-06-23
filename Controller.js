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
        this.carousel.leftBtn.addEventListener('click', this.CarouselClickHandler.bind(this));
        this.carousel.rightBtn.addEventListener('click', this.CarouselClickHandler.bind(this));
        this.navigation.navbar.forEach(
            (navItem,idx)=>{
                // idx를 navItemClickHandler에 넘겨줄 수 있는 방법이 없을까?
                navItem.addEventListener('click',(e)=>
                    this.navItemClickHandler(e,idx)
                )
            }
        )
    }
    init() {
        this.currentIndex = this.makeRandomIndex();
        this.carousel.drawCardPosition(this.currentIndex);
        this.navigation.drawCurrentNavItem(this.currentIndex); 
        this.registerEvents();
    }
    CarouselClickHandler(event) {
        const selectedDirection = event.target.id;
        event.preventDefault();
        this.moveIndex(selectedDirection);
        this.carousel.drawCardPosition(this.currentIndex);
        this.navigation.drawCurrentNavItem(this.currentIndex,this.previousIndex); 
    }
    navItemClickHandler(e,idx){
        this.previousIndex = this.currentIndex;
        this.currentIndex = idx;
        // console.log('이전에 눌린 인덱스: ',this.previousIndex,'지금 눌린 인덱스:',this.currentIndex);
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
// ol태그로 잡는것보다 querySelecterAll로 nodeList를 잡는게 더 좋은 방법인듯! 
const cardList = document.querySelector(".carousel__contents > ol");
const navbar = document.querySelectorAll(".carousel__title > ol > li");

const carousel = new Carousel({ leftBtn, rightBtn, cardList });
const navigation = new Navigation({ navbar });
const amazonController = new Controller({ carousel, navigation });

amazonController.init();