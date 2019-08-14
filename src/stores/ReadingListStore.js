import { decorate, action, observable, toJS } from 'mobx';

class ReadingListStore {
  toRead = []
  completed = []
  dim = false

  setDim(bool) {
    const elms = document.querySelectorAll('.expanded');
    if ( elms.length === 0 ) {
      this.dim = false;
    } else {

      this.dim = bool;
    }
  }

  setCompleted(story) {
    this.completed = [...story];
  }

  getCompleted() {
    return toJS(this.completed);
  }

  removeStoryFromList(data) {
    const item = this.toRead.find((x) => x.postId === data.postId)
    this.toRead.remove(item);
    this.completed.push(item)
  }

  addToRead(story) {
    this.toRead = [...story];
  }

  getToRead() {
    return toJS(this.toRead);
  }
}

decorate(ReadingListStore, {
  completed: observable,
  setCompleted: action,
  dim: observable,
  setDim: action,
  toRead: observable,
  addToRead: action,
  removeStoryFromList: action
});
export default new ReadingListStore();