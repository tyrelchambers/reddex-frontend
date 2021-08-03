import { action, decorate, observable } from "mobx";

class ModalStore {
  isOpen = false;
  render = "";
  clearPostsOnExit = false;
  isSidebarOpen = true;

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

  setIsSidebarOpen(bool) {
    this.isSidebarOpen = bool;
  }
}

decorate(ModalStore, {
  isOpen: observable,
  setIsOpen: action,
  render: observable,
  setRender: action,
  clearPostsOnExit: observable,
  setClearPostsOnExit: action,
  isSidebarOpen: observable,
  setIsSidebarOpen: action,
});

export default new ModalStore();
