import Modal from './modal';
import Carousel from './carousel';

class Index {
  constructor() {
    const $BUTTONS = document.querySelectorAll('.open-modal');

    this.modal = new Modal($BUTTONS);
    this.carousel = new Carousel($BUTTONS);

    this.bind();
  }

  bind() {
    this.modal.on('setInfo', (index, buttons) => {
      this.carousel.setInfo(index, buttons);
    });

    this.modal.on('resetClass', () => {
      this.carousel.resetClass();
    });

    this.modal.on('updateElements', () => {
      this.carousel.updateElements();
    });
  }
}

new Index();
