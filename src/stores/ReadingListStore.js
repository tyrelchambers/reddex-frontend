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

  transferStoryFromList(data, fromArray, toArray) {
    const item = this[fromArray].find((x) => x.post_id === data.post_id)
    this[fromArray].remove(item);
    this[toArray].push(item)
  }

  addToRead(story) {
    this.toRead = [...story];
  }

  getToRead() {
    return toJS(this.toRead);
  }

  removeStoryFromList(list, item) {
    this[list].filter((x, id) => {
      if (x.post_id === item) {
        this[list].splice(id, 1);
      }
    });
    
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