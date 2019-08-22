import { observable, action, decorate, toJS } from 'mobx';

class InboxStore {
  messages = []
  selectedMessage = {}
  latestAfter = ""

  setMessages(data) {
    this.messages = data.data;
    this.latestAfter = data.after;
  }

  getMessages() {
    return toJS(this.messages);
  }



  setSelectedMessage(data) {
    this.selectedMessage = data;
  }

  getSelectedMessage() {
    return toJS(this.selectedMessage);
  }
}

decorate(InboxStore, {
  messages: observable,
  setMessages: action,
  selectedMessage: observable,
  setSelectedMessage: action,
  latestAfter: observable
});

export default new InboxStore();