import anime from 'animejs';
import events from 'events';

export default class Modal extends events {
  constructor($buttons) {
    super();

    /* エレメント取得 */
    this.buttons = $buttons;
    this.modal = document.querySelector('.modal');
    this.overlay = document.querySelector('.overlay');
    this.closes = document.querySelectorAll('.js-modal-close');

    this.index = 0;
    this.is_animating = false;

    this.body = document.body;

    this.setData();
    this.bind();
  }

  bind() {
    this.scrollOff();

    this.buttons.forEach(buttons => {
      buttons.addEventListener('click', e => {
        this.index = Number(e.currentTarget.dataset.value);

        this.emit('setInfo', this.index, this.buttons);
        this.openModal();
      });
    });

    this.closes.forEach(closelist => {
      closelist.addEventListener('click', () => {
        this.closeModal();
      });
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
        this.emit('resetClass');
        this.emit('resetStyle');
        this.emit('updateElements');
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
}
