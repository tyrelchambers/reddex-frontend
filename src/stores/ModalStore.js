import { action,decorate, observable } from 'mobx';

class ModalStore {
  isOpen = false;
  render = '';

  setIsOpen(status) {
    this.isOpen = status;
  }

  setRender(comp) {
    this.render = comp;
  }

  getIsOpen() {
    return this.isOpen;
  }
}

decorate(ModalStore, {
  isOpen: observable,
  setIsOpen: action,
  render: observable,
  setRender: action
});

export default new ModalStore();