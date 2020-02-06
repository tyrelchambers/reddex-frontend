import { decorate, observable, action } from "mobx";

class SiteStore {
  preview = {
    uuid: "",
    subdomain: "",
    title: "",
    twitter: "",
    facebook: "",
    instagram: "",
    patreon: "",
    youtube: "",
    podcast: "",
    introduction: "",
    banner_url: "",
    submission_form: false,
    youtube_id: "",
    youtube_timeline: false,
    twitter_id: "",
    twitter_timeline: false,
    show_credit_link: true,
    accent: "#000000",
    theme: "light",
    headline: "",
    submission_title: ""
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