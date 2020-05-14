import { observable, decorate, action, toJS } from 'mobx';

class PostStore {
  selectedPosts = [];
  collectionCount = 0;
  subreddit = ""
  posts = []

  setSubreddit(data) {
    this.subreddit = data;
  }

  setPosts(posts) {
    this.posts = [...posts];
  }
  setSelectedPosts(post) {
    const dupe = this.selectedPosts.find((el) => {
      return el.post_id === post.post_id ? this.selectedPosts.remove(el) : false
    });

    if ( !dupe ) {
      this.selectedPosts.push(post)
    }

    return true;
  }

  setCollectionCount(count) {
    this.collectionCount = count;
  }

  getSelectedPosts() { 
    return toJS(this.selectedPosts);
  }

  clearSelectedPosts() {
    this.selectedPosts = [];
  }
}

decorate(PostStore, {
  selectedPosts: observable,
  setSelectedPosts: action,
  clearSelectedPosts: action,
  collectionCount: observable,
  setCollectionCount: action,
  subreddit: observable,
  setSubreddit: action,
  posts: observable,
  setPosts: action
});
export default new PostStore();