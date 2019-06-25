# carousel 을 라이브러리 없이 구현해보자 


## 1. 시연 링크 
https://dxvinci.github.io/amazon-carousel-clone/Carousel.html

## 2. 작업의 flow
markup -> carousel.js 구현 -> 의존성분리를 위한 controller.js 구현 ->
controller 를 구현함에 따라 기존의 carousel.js의 메소드중의 index와 관련된 메소드 controller.js로 이동하여 의존성분리 
-> controller.js와 navigator.js 구현

## 3. 구현한 코드의 특징
1. 설계
controller에서 eventlisten을 받아 carouselClickHandler 와 navItemClickHandler 같은 핸들러 함수에서 navigation과 carousel 객체의 메소드를 실행하도록 하였습니다.
Carousel.html이 앱은 아니지만 앱이라고 생각하고 이벤트가 한 방향으로 흐르도록 구현하였습니다. 나름대로 의존성을 분리하려고 노력하여 carousel.js 와 navigation.js는 index에 맞게 그리는 로직만 구현하였습니다.

2. 캐러샐이 동작할때 카드가 변경되는 로직
보여질 카드는 opacity를 1로 보여지지않을 카드는 opacity를 0으로 주어 N개의 카드가 이동합니다. 각 카드의 index별로 translate될 좌표에 맞게 이동합니다.

3. drawCardPositionAsync 함수
카드리스트를 이동시키는게 아니라 각각 카드를 움직이기때문에 index가 3번 바뀌면 drawCardPostion를 3번 실행하여야해서 비동기적으로 실행되어야했습니다. 이것을 처리하기 위해서 함수를 인자로 전달해 보았습니다. 

