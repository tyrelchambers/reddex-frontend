import { decorate, observable, action } from "mobx";

class SiteStore {
  preview = {
    subdomain: "",
    title: "",
    twitter: "",
    facebook: "",
    instagram: "",
    patreon: "",
    youtube: "",
    podcast: "",
    introduction: "",
    bannerURL: "",
    accent: "#000000",
    theme: "light"
  }

  changes = false;

  getPreview() {
    return this.preview;
  }

  setPreview(config) {
    this.preview = {...config}
  }

  setChanges(state) {
    this.changes = state;
  } 
}

decorate(SiteStore, {
  preview: observable,
  setPreview: action,
  changes: observable
})

export default new SiteStore();