class Modal {
  constructor() {
    /* エレメント取得 */
    this.buttons = document.querySelectorAll('.open-modal');
    this.modal = document.querySelector('.modal');
    this.overlay = document.querySelector('.overlay');
    this.closes = document.querySelectorAll('.js-modal-close');
    this.modalTexts = document.querySelectorAll('.modal-text');
    this.modalImages = document.querySelectorAll('.modal-image');
    this.$next = document.querySelector('.modal-right-button');
    this.$prev = document.querySelector('.modal-left-button');

    this.index = 0;
    this.is_animating = false;

    this.body = document.body;

    /* スライダー用変数 */
    this.left = document.querySelector('.left');
    this.active = document.querySelector('.active');
    this.right = document.querySelector('.right');

    this.modals = document.querySelectorAll('.modal-slide');

    this.setData();
    this.bind();
  }

  bind() {
    this.scrollOff();

    this.closes.forEach(closelist => {
      closelist.addEventListener('click', () => {
        this.closeModal();
      });
    });

    this.buttons.forEach(buttons => {
      buttons.addEventListener('click', e => {
        this.index = Number(e.currentTarget.dataset.value);

        this.setInfo(this.index);
        this.openModal();
      });
    });

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

  /* モーダルを開く */
  openModal() {
    this.overlay.style.display = 'block';
    this.modal.style.display = 'block';

    anime({
      targets: this.modal,
      easing: 'linear',
      scale: [0, 1],
      duration: 200
    });
    anime({
      targets: this.overlay,
      backgroundColor: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)'],
      easing: 'linear',
      duration: 300
    });

    this.body.classList.add('no-scroll');
  }

  /* モーダルを閉じる */
  closeModal() {
    anime({
      targets: this.modal,
      scale: 0,
      easing: 'linear',
      duration: 200
    });
    anime({
      targets: this.overlay,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      easing: 'linear',
      duration: 300,
      complete: () => {
        this.overlay.style.display = 'none';
        this.modal.style.display = 'none';
        this.body.classList.remove('no-scroll');
        this.resetClass();
        this.resetStyle();
        this.updateElements();
      }
    });
  }

  /* スクロール禁止 */
  scrollOff() {
    this.modal.addEventListener('touchmove', e => e.preventDefault());
    this.overlay.addEventListener('touchmove', e => e.preventDefault());
  }

  /* データセットで値を設定する */
  setData() {
    this.buttons.forEach((currentValue, index) => {
      currentValue.dataset.value = index;
    });
  }

  /* クリックした箇所のモーダルの情報を入れる処理 */
  setInfo(index) {
    if (index === this.buttons.length - 1) {
      this.modalTexts[2].textContent = this.buttons[0].dataset.text;
      this.modalImages[2].innerHTML = `<img src="./images/${
        this.buttons[0].dataset.image
      }.jpg">`;
    } else {
      this.modalTexts[2].textContent = this.buttons[index + 1].dataset.text;
      this.modalImages[2].innerHTML = `<img src="./images/${
        this.buttons[index + 1].dataset.image
      }.jpg">`;
    }

    if (index === 0) {
      this.modalTexts[0].textContent = this.buttons[
        this.buttons.length - 1
      ].dataset.text;
      this.modalImages[0].innerHTML = `<img src="./images/${
        this.buttons[this.buttons.length - 1].dataset.image
      }.jpg">`;
    } else {
      this.modalTexts[0].textContent = this.buttons[index - 1].dataset.text;
      this.modalImages[0].innerHTML = `<img src="./images/${
        this.buttons[index - 1].dataset.image
      }.jpg">`;
    }
    this.modalImages[1].innerHTML = `<img src="./images/${
      this.buttons[index].dataset.image
    }.jpg">`;
    this.modalTexts[1].textContent = this.buttons[index].dataset.text;

    this.setIndex(index);
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

  /* カルーセルのindex処理 */
  setIndex(index) {
    this.right.dataset.value =
      index === this.buttons.length - 1 ? 0 : index + 1;

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

const modal = new Modal();
