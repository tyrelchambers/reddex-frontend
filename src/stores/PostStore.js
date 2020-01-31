import { observable, decorate, action, toJS } from 'mobx';

class PostStore {
  selectedPosts = [];
  collectionCount = 0;

  setSelectedPosts(post) {
    const dupe = this.selectedPosts.find((el) => {
      return el.post_id === post.post_id ? this.selectedPosts.remove(el) : false
    });

    if ( !dupe ) {
      this.selectedPosts.push(post)
    }
  }

  setCollectionCount(count) {
    this.collectionCount = count;
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
  clearSelectedPosts: action,
  collectionCount: observable,
  setCollectionCount: action
});
export default new PostStore();