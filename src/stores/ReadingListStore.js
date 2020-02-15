import { decorate, action, observable, toJS } from 'mobx';

class ReadingListStore {
  toRead = []
  completed = []


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
    this.toRead = [...this.toRead, ...story];
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
  toRead: observable,
  addToRead: action,
  removeStoryFromList: action
});
export default new ReadingListStore();