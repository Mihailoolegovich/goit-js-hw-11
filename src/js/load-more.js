export default class loadMore {
  constructor({ selector, hidden = false }) {
    this.refs = {
      button: document.querySelector(selector),
    };

    hidden && this.hide();
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.button.textContent = 'Load More';
  }

  disable() {
    this.refs.button.hover = true;

    this.refs.button.disabled = true;
    this.refs.button.textContent = 'Loading';
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
