import { decorate, action, observable, toJS } from 'mobx';

class ReadingListStore {
  readingList = []
  dim = false

  setDim(bool) {
    const elms = document.querySelectorAll('.reading-list-item-expanded');
    if ( elms.length === 0 ) {
      this.dim = false;
    } else {

      this.dim = bool;
    }
  }

  setReadingList(story) {
    this.readingList = [...story];
    console.log(story)
  }

  getReadingList() {
    return toJS(this.readingList);
  }

  removeStoryFromList(id) {
    search(id, "name", this.readingList);
    //this.readingList.slice()
  }
}

const search = (key, prop, array) => {
  for ( let i = 0; i < array.length; i++ ) {
    for (const k in array[i]) {
      if (array[i].hasOwnProperty(prop)) {
        const element = array[i][key];
        console.log(element)
      }
    }
  }
}

decorate(ReadingListStore, {
  readingList: observable,
  setReadingList: action,
  dim: observable,
  setDim: action
});
export default new ReadingListStore();