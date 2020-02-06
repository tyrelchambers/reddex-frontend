import { decorate, action, observable } from "mobx";
import {getAxios} from '../api/index'

class FormStore {
  state = {
    author: {
      value: "",
      label: "Author",
      required: true,
      enabled: true
    },
    title: {
      value: "",
      label: "Title",
      required: true,
      enabled: true
    },
    body: "",
    tags: {
      required: true,
      enabled: true,
      label: "Tags"
    },
    sent_to_others: {
      required: true,
      enabled: true,
      label: "Sent To Others"
    },
    email: {
      value: "",
      required: true,
      enabled: true,
      label: "Email"
    }
  }

  changes = false;

  setState(data) {
    this.setChanges(true);
    this.state= {...this.state, ...data}
  }

  setChanges(state) {
    this.changes = state;
  } 

  submit(website) {
    const payload = {
      ...this.state,
      website
    };

    getAxios({
      url:'/submissionForm/save',
      method: 'post',
      data: payload
    })
    
  }

}

decorate(FormStore, {
  setState: action,
  state: observable
})

export default new FormStore();