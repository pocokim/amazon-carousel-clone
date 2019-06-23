class Navigation {
    constructor({navbar}){
        this.navbar = navbar;
    }
    // defaultParam을 사용한 이유는 의미를 더 명확하게 하기 위하여? 사실 있어도그만, 없어도 그만 
    // 필요없는듯..
    drawCurrentNavItem(currentIndex,previousIndex = undefined){
        // console.log('넘어온 현재의 인덱스:',currentIndex, '넘어온 이전의 인덱스',previousIndex);
        let previousItem = this.navbar.children[previousIndex];
        let currentItem = this.navbar.children[currentIndex];

        if(previousIndex !== undefined) previousItem.classList.toggle('curser');
        currentItem.classList.toggle('curser');
  
    }

}

export default Navigation;