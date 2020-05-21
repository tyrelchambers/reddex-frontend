import { decorate, action, observable } from "mobx";
import {getAxios} from '../api/index'
import { toast } from "react-toastify";

class FormStore {
  state = {
    OptionsAuthor: {
      value: "",
      label: "Author",
      required: true,
      enabled: true
    },
    OptionsStoryTitle: {
      value: "",
      label: "Title",
      required: true,
      enabled: true
    },
    body: "",
    OptionsTag: {
      value: "",
      required: true,
      enabled: true,
      label: "Tags"
    },
    OptionsSentToOther: {
      value: null,
      required: true,
      enabled: true,
      label: "Sent To Others"
    },
    OptionsEmail: {
      value: "",
      required: true,
      enabled: true,
      label: "Email"
    }
  }

  options_id = ""

  changes = false;

  setInitial(data) {
    this.state = {...this.state, ...data}
  }

  setState(data) {
    this.setChanges(true)
    this.state= {...this.state, ...data}
  }

  setChanges(state) {
    this.changes = state;
  } 

  save(website, options) {
    const payload = {
      ...this.state,
      website,
      options_id: options
    };

    getAxios({
      url:'/submissionForm/save',
      method: 'put',
      data: payload
    })
    
    this.changes = false;
  }

  submit = (website, e) => {
    e.preventDefault();
    let errors = false;

    const editorBody = document.querySelector(".ql-editor").innerHTML;
    const payload = {
      ...this.state,
      body: editorBody,
      website
    };

    [payload.OptionsAuthor, payload.OptionsStoryTitle, payload.OptionsTag, payload.OptionsEmail].forEach(x => {
      if ( x.enabled ) {
        if (x.required && !x.value) {
          toast.error(`${x.label} is required`)
          errors = true
        }
      }
    })

    if (payload.OptionsSentToOther.enabled) {
      if (payload.OptionsSentToOther.required && payload.OptionsSentToOther.value === null) {
        toast.error("Sent to others is required")
        errors = true;
      } 
    }

    if (!payload.body) {
      toast.error("Please include your story")
      errors = true;
    }

    
    if (errors) return;

    getAxios({
      url:'/submissionForm/submit',
      method: 'post',
      data: payload,
      options: {
        withToken: false
      }
    }).then(res => toast.success(res.message))
    
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  setOptionsId(id) {
    this.options_id = id; 
  }

  setAuthor(data) {
    this.state.OptionsAuthor = {...data}
  }

  setEmail(data) {
    this.state.OptionsEmail = {...data}
  }

  setSentToOthers(data) {
    this.state.OptionsSentToOther = {...data}
  }

  setTags(data) {
    this.state.OptionsTag = {...data}
  }

  setStoryTitle(data) {
    this.state.OptionsStoryTitle = {...data}
  }

}

decorate(FormStore, {
  setState: action,
  state: observable,
  changes: observable,
  setChanges: action,
  options_id: observable,
  setOptionsId: action,
  setAuthor: action,
  setEmail: action,
  setSentToOthers: action,
  setTags:action,
  setStoryTitle: action
})

export default new FormStore();