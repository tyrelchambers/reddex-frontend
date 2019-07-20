import { observable, decorate, action, toJS } from 'mobx';

class PostStore {
  selectedPosts = [];

  setSelectedPosts(post) {
    const dupe = this.selectedPosts.find((el) => {
      return el.postId === post.postId ? this.selectedPosts.remove(el) : false
    });

    if ( !dupe ) {
      this.selectedPosts.push(post)
    }
  }

  getSelectedPosts() { 
    return toJS(this.selectedPosts);
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