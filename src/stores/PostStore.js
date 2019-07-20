import { observable, decorate, action, toJS } from 'mobx';

class PostStore {
  selectedPosts = new Map();

  setSelectedPosts(post) {

    if (this.selectedPosts.has(post.postId)) {
      this.selectedPosts.delete(post.postId);
    } else {
      this.selectedPosts.set(post.postId, post);
    }
  }

  getSelectedPosts() { 
    const obj = [];
    const _ = toJS(this.selectedPosts);
    
    for ( let k in _ ) {
      obj.push(_[k]);
    }
    
    return obj;
  }

  clearSelectedPosts() {
    this.selectedPosts.clear();
  }
}

decorate(PostStore, {
  selectedPosts: observable,
  setSelectedPosts: action,
  clearSelectedPosts: action
});
export default new PostStore();