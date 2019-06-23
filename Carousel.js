class Carousel {
  constructor({ leftBtn, rightBtn, cardList }) {
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.cardList = cardList;
  }
  makeRotateNumb(number) {
    return number % this.cardList.childElementCount;
}
  
  addStyleToItem(currentIndex,i) {    
    const convertedIndex = currentIndex + this.makeRotateNumb(i + (this.cardList.childElementCount - 1));
    let currentItem = this.cardList.children[this.makeRotateNumb(convertedIndex)]
    currentItem.style.transform = `translateX(${-150 + i * 100}%)`;
    currentItem.style.transition = "all .2s linear";
    currentItem.style.opacity = i === 1 ? "1" : "0";
  }
  drawCardPosition(currentIndex) {
    for (let i = 0; i < this.cardList.childElementCount; i++) {
      this.addStyleToItem(currentIndex,i);
    }
  }

}

export default Carousel;


