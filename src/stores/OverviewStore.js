import { decorate, observable, action } from "mobx";

class OverviewStore {
  expanded = false
  
  youtube = {
    label: "Youtube Stats",
    enabled: true,
    key: 'youtube'
  }

  views = {
    label: "Website Views",
    enabled: true,
    key: "views"
  }

  submittedStories = {
    label: "Submitted Stories",
    enabled: true,
    key: 'submittedStories'
  }

  readingListCount = {
    label: "Reading List Count",
    enabled: true,
    key: "readingListCount"
  }

  setModule(module, bool) {
    console.log(this[module])
    this[module].enabled = bool;
  }

  getModules() {
    return [this.youtube, this.views, this.submittedStories, this.readingListCount]
  }
}

decorate(OverviewStore, {
  expanded: observable,
  youtube: observable,
  views: observable,
  submittedStories: observable,
  readingListCount: observable,
  setModule: action
})
export default new OverviewStore();