import { observable, action, decorate, toJS } from 'mobx';

class InboxStore {
  messages = []
  selectedMessage = {}
  
  setMessages(data) {
    this.messages = data.data;
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
  setSelectedMessage: action
});

export default new InboxStore();