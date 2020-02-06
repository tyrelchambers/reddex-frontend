import { decorate, observable, action } from "mobx";

class SiteStore {
  config = {
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
    submission_title: "",
    rules: ""
  }

  preview = {
    subdomain: ""
  }

  changes = false;

  setConfig(data) {
    this.setChanges(true);
    this.config = {...this.config, ...data}
  }

  setChanges(state) {
    this.changes = state;
  } 

  setPreview(data) {
    this.preview = {...this.preview, ...data}
  }
}

decorate(SiteStore, {
  config: observable,
  setConfig: action,
  preview: observable,
  setPreview: action,
  changes: observable
})

export default new SiteStore();