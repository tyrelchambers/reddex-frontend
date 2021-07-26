export const formatPostsFromReddit = async (posts) => {
  const results = [];
  for (let index = 0; index < posts.length; index++) {
    const element = posts[index];
    results.push({
      author: element.data.author,
      title: element.data.title,
      self_text: element.data.selftext,
      ups: element.data.ups,
      url: element.data.url,
      num_comments: element.data.num_comments,
      created: element.data.created_utc,
      link_flair_text: element.data.link_flair_text,
      post_id: element.data.id,
      subreddit: element.data.subreddit,
      upvote_ratio: element.data.upvote_ratio,
    });
  }
  return results;
};
