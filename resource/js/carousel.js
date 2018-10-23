export default class Carousel {
  constructor($buttons) {
    this.buttons = $buttons;
    /* モーダル内の情報 */
    this.modalTexts = document.querySelectorAll('.modal-text');
    this.modalImages = document.querySelectorAll('.modal-image');

    /* スライダー用変数 */
    this.left = document.querySelector('.left');
    this.active = document.querySelector('.active');
    this.right = document.querySelector('.right');

    this.$next = document.querySelector('.modal-right-button');
    this.$prev = document.querySelector('.modal-left-button');

    this.modals = document.querySelectorAll('.modal-slide');

    this.bind();
  }

  bind() {
    this.$prev.addEventListener('click', e => {
      if (this.isAnimating) {
        return;
      }
      this.prevSlide();
    });

    this.$next.addEventListener('click', e => {
      if (this.isAnimating) {
        return;
      }
      this.nextSlide();
    });
  }

  /* クリックした箇所のモーダルの情報を入れる処理 */
  setInfo(index, buttons) {
    if (index === buttons.length - 1) {
      this.modalTexts[2].textContent = buttons[0].dataset.text;
      this.modalImages[2].innerHTML = `<img src="./images/${
        buttons[0].dataset.image
      }.jpg">`;
    } else {
      this.modalTexts[2].textContent = buttons[index + 1].dataset.text;
      this.modalImages[2].innerHTML = `<img src="./images/${
        buttons[index + 1].dataset.image
      }.jpg">`;
    }

    if (index === 0) {
      this.modalTexts[0].textContent = buttons[buttons.length - 1].dataset.text;
      this.modalImages[0].innerHTML = `<img src="./images/${
        buttons[buttons.length - 1].dataset.image
      }.jpg">`;
    } else {
      this.modalTexts[0].textContent = buttons[index - 1].dataset.text;
      this.modalImages[0].innerHTML = `<img src="./images/${
        buttons[index - 1].dataset.image
      }.jpg">`;
    }
    this.modalImages[1].innerHTML = `<img src="./images/${
      buttons[index].dataset.image
    }.jpg">`;
    this.modalTexts[1].textContent = buttons[index].dataset.text;

    this.setIndex(index, buttons);
  }

  /* カルーセルのindex処理 */
  setIndex(index) {
    this.right.dataset.value = index === this.buttons.length - 1 ? 0 : index + 1;

    this.left.dataset.value = index === 0 ? this.buttons.length - 1 : index - 1;

    this.active.dataset.value = index;
  }

  /* 次へ */
  nextSlide() {
    this.resetStyle();

    this.left.style.transition = '0s';

    this.right.classList.add('active');
    this.right.classList.remove('right');

    this.left.classList.add('right');
    this.left.classList.remove('left');

    this.active.classList.add('left');
    this.active.classList.remove('active');

    this.updateElements();
    this.setIndex(Number(this.active.dataset.value));
    this.setCarouselinfo();
  }

  /* 前へ */
  prevSlide() {
    this.resetStyle();

    this.right.style.transition = '0s';

    this.right.classList.add('left');
    this.right.classList.remove('right');

    this.left.classList.add('active');
    this.left.classList.remove('left');

    this.active.classList.add('right');
    this.active.classList.remove('active');

    this.updateElements();
    this.setIndex(Number(this.active.dataset.value));
    this.setCarouselinfo();
  }

  /* カルーセルを動かした後、モーダルの情報を入れる処理 */
  setCarouselinfo() {
    this.modalTexts.forEach((modalTexts, index) => {
      modalTexts.textContent = this.buttons[
        this.modals[index].dataset.value
      ].dataset.text;
      this.modalImages[index].innerHTML = `<img src="./images/${
        this.buttons[this.modals[index].dataset.value].dataset.image
      }.jpg">`;
    });
  }

  /* エレメントを再取得 */
  updateElements() {
    this.left = document.querySelector('.left');
    this.active = document.querySelector('.active');
    this.right = document.querySelector('.right');
  }

  /* スタイル・クラスのリセット */
  resetStyle() {
    this.left.style.transition = '';
    this.active.style.transition = '';
    this.right.style.transition = '';
  }

  /* クラスをリセット */
  resetClass() {
    this.modals.forEach((currentValue, index) => {
      this.modals[index].classList.remove('left');
      this.modals[index].classList.remove('active');
      this.modals[index].classList.remove('right');
    });

    this.modals[0].classList.add('left');
    this.modals[1].classList.add('active');
    this.modals[2].classList.add('right');
  }
}
