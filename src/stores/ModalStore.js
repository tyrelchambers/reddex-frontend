import { action,decorate, observable, toJS } from 'mobx';

class ModalStore {
  isOpen = false;
  content;
  title = "";

  setIsOpen(status) {
    this.isOpen = status;
  }

  setTitle(title) {
    this.title = title;
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
  setContent: action,
  title: observable,
  setTitle: action
});

export default new ModalStore();