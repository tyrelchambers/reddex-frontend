import { decorate, action, observable, toJS } from 'mobx';

class ReadingListStore {
  readingList = []

  setReadingList(story) {
    this.readingList.push(story);
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
  setReadingList: action
});
export default new ReadingListStore();