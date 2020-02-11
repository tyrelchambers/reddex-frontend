import { action,decorate, observable } from 'mobx';

class ModalStore {
  isOpen = false;
  content;

  setIsOpen(status) {
    this.isOpen = status;
  }
  
  setContent(data) {
    this.content = data;
  }

  getIsOpen() {
    return this.isOpen;
  }
}

decorate(ModalStore, {
  isOpen: observable,
  setIsOpen: action,
  content: observable,
  setContent: action
});

export default new ModalStore();