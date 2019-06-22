class Carousel {
  constructor({ leftBtn, rightBtn, cardList }) {
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.cardList = cardList;
    this.currentIndex = 0;
    this.selectedDirection = undefined;
  }

  makeRotateNumb(number) {
    return number % this.cardList.childElementCount;
  }

  addStyleToItem(i) {    
    const convertedIndex = this.currentIndex + this.makeRotateNumb(i + (this.cardList.childElementCount - 1));
    let currentItem = this.cardList.children[this.makeRotateNumb(convertedIndex)]
    currentItem.style.transform = `translateX(${-150 + i * 100}%)`;
    currentItem.style.transition = "all .2s linear";
    currentItem.style.opacity = i === 1 ? "1" : "0";
  }

  moveCurrentIndex(direction) {
    let index =
      direction === "left" ? this.currentIndex - 1 : this.currentIndex + 1;
    if (index < 0) index += this.cardList.childElementCount;
    this.currentIndex = this.makeRotateNumb(index);
  }

  drawCardPosition() {
    for (let i = 0; i < this.cardList.childElementCount; i++) {
      this.addStyleToItem(i);
    }
  }
  makeRandomIndex() {
    return Math.floor(Math.random() * (this.cardList.childElementCount - 1));
  }

  onClickHandler(event) {
    this.selectedDirection = event.target.id;
    event.preventDefault();
    this.moveCurrentIndex(this.selectedDirection);
    this.drawCardPosition();
  }

  registerEvents() {
    this.leftBtn.addEventListener("click", this.onClickHandler.bind(this));
    this.rightBtn.addEventListener("click", this.onClickHandler.bind(this));
  }

  init() {
    this.currentIndex = this.makeRandomIndex();
    this.drawCardPosition();
    this.registerEvents();
  }
}

const leftBtn = document.querySelector(".contents__button_left");
const rightBtn = document.querySelector(".contents__button_right");

const cardList = document.querySelector(".carousel__contents > ol");
const carousel = new Carousel({ leftBtn, rightBtn, cardList });
carousel.init();
