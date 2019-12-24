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

  getPreview() {
    return this.preview;
  }

  setPreview(config) {
    this.preview = {...config}
  }
}

decorate(SiteStore, {
  preview: observable,
  setPreview: action
})

export default new SiteStore();