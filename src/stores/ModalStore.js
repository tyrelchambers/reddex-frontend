import { action,decorate, observable } from 'mobx';

class ModalStore {
  isOpen = false;
  render = '';
  clearPostsOnExit = false;

  setIsOpen(status) {
    this.isOpen = status;
  }

  setRender(comp) {
    this.render = comp;
  }

  getIsOpen() {
    return this.isOpen;
  }

  setClearPostsOnExit(bool) {
    this.clearPostsOnExit = bool;
  }
}

decorate(ModalStore, {
  isOpen: observable,
  setIsOpen: action,
  render: observable,
  setRender: action,
  clearPostsOnExit: observable,
  setClearPostsOnExit: action
});

export default new ModalStore();