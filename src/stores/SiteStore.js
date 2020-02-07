import { decorate, observable, action } from "mobx";
import React from 'react';
import { getAxios } from "../api";
import { toast } from "react-toastify";
import { deleteDomainAlias } from "../api/put";
import { addDomainAlias } from "../api/post";

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

  setInitial(data) {
    this.config = {...this.config, ...data}
  }
  setConfig(data) {
    this.setChanges(true)
    this.config = {...this.config, ...data}
  }

  setChanges(state) {
    this.changes = state;
  } 

  setPreview(data) {
    this.preview = {...this.preview, ...data}
  }

  submit = async (pondRef) => {
    const data = {...this.config} 
    if ( !data.subdomain ) {
      return toast.error("Subdomain can't be empty");
    }
    data.subdomain = data.subdomain.trim().replace(/\W/g, "-").toLowerCase();
    
    if ( data.introduction > 1000 ) {
      return toast.error("Introduction is too long")
    }

    let banner_url = data.banner_url || "";

    if ( pondRef.current && pondRef.current.getFiles().length > 0 ) {
      banner_url = await this.processFiles(pondRef)
    }

    if (!banner_url) {
      banner_url = "https://images.unsplash.com/photo-1524721696987-b9527df9e512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80"
    }

    const payload = {
      ...data,
      banner_url
    }

    if ( data.subdomain !== this.preview.subdomain ) {
      await deleteDomainAlias(this.preview.subdomain)
      await addDomainAlias(data.subdomain);
    }

    this.setChanges(false)
    
    await getAxios({
      url: '/site/update',
      method: 'post',
      data: payload
    })
    .then(res => toast.success("Changes saved"));
  }

  processFiles = async (pondRef) => {
    const banner = await pondRef.current.processFiles().then(files => {
      return files[0].serverId;
    });
    return banner;
  }

  deleteSiteHandler = async (uuid) => {
    const toDelete = window.confirm("Are you sure you want to delete?");
    
    if (toDelete) {
      await deleteDomainAlias(SiteStore.config.subdomain)
      
      getAxios({
        url: '/site/delete',
        method: 'delete',
        params: {
          uuid
        }
      })
      
      window.location.reload();
    }
  }

  deleteImageHandler = async (e) => {
    e.preventDefault();
    const payload = {
      ...this.config,
      banner_url: ""
    }
    if ( !this.config.banner_url.match(/unsplash/gi) ) {
      await getAxios({
        url: '/upload/revert',
        method: 'delete',
        params: {
          url: this.config.banner_url
        }
      })
      this.setConfig({banner_url: ""})
    } else {
      this.setConfig({banner_url: ""})
    }
    await getAxios({
      url: '/site/update',
      method: 'post',
      data: payload
    })
    .then(res => toast.success("Changes saved"));

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