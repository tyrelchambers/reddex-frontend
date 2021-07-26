export const structureEndpoint = ({ category, subreddit }) => {
  let endpoint = "";

  if (category !== "hot") {
    endpoint = `${subreddit}/${category.category}.json?limit=100`;
  }

  if (category.timeframe !== "day") {
    endpoint = `${subreddit}/${category.category}/.json?t=${category.timeframe}`;
  }

  const link = `https://www.reddit.com/r/${endpoint}`;
  return link;
};
