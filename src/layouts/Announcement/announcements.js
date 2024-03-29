import React from "react";

export default {
  basic: {
    title: "Getting Started",
    body: "Enter the subreddit you want to search, in the subreddit field. Then click 'Get Posts'",
  },
  productHunt: {
    title: "We're on the internet!",
    body: (
      <a
        href="https://www.producthunt.com/posts/reddex?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-reddex"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=181398&theme=light"
          alt="Reddex - A Toolkit for Youtube Reddit Narrators | Product Hunt Embed"
          style={{ width: "250px", height: "54px" }}
          width="250px"
          height="54px"
        />
      </a>
    ),
  },
  patreon: {
    title: "Finding Reddex helpful?",
    body: `Support Reddex via our Patreon!`,
  },
  websitePromo: {
    title: "Need a Website?",
    body: "Create an account and get a website to show off your recent Youtube videos, and a story submission form.",
  },
};
