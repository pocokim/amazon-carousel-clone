class Carousel {
  constructor({ leftBtn, rightBtn, numberOfCard }) {
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.numberOfCard = numberOfCard;
    this.currentIndex = 0;
    this.selectedDirection = undefined;
  }

  makeRotateNumb(number) {
    return number % this.numberOfCard;
  }

  addStyleToItem(i) {    
    // const myChildNumb = this.currentIndex + i > this.numberOfCard ? this.currentIndex + i- this.numberOfCard  : this.currentIndex + i 
    const convertedIndex =
      this.currentIndex + this.makeRotateNumb(i + (this.numberOfCard - 1));
    const nthChildNumb = this.makeRotateNumb(convertedIndex) + 1;
    let currentItemStyle = document.querySelector(
      `.item:nth-child(${nthChildNumb})`
    ).style;

    currentItemStyle.transform = `translateX(${-150 + i * 100}%)`;
    currentItemStyle.transition = "all .2s linear";
    currentItemStyle.opacity = i === 1 ? "1" : "0";
  }

  moveCurrentIndex(direction) {
    let index =
      direction === "left" ? this.currentIndex - 1 : this.currentIndex + 1;
    if (index < 0) index += this.numberOfCard;
    this.currentIndex = this.makeRotateNumb(index);
  }

  drawCardPosition() {
    for (let i = 0; i < this.numberOfCard; i++) {
      this.addStyleToItem(i);
    }
  }
  makeRandomIndex() {
    return Math.floor(Math.random() * (this.numberOfCard - 1));
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

const numberOfCard = document.querySelectorAll(".contents__item").length;
const carousel = new Carousel({ leftBtn, rightBtn, numberOfCard });
carousel.init();
