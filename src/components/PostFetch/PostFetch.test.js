import PostFetch, { saveSubredditToLocalStorage, deletePostsCollection, saveToDatabase, getPostsFromDatabase } from './PostFetch';
import Enzyme, { shallow, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import Dexie from 'dexie';
import indexedDB from 'fake-indexeddb';

configure({ adapter: new Adapter() });
Dexie.dependencies.indexedDB = indexedDB;

const mockPosts = [
  {
    data: {
      author: "wjyapp",
      created: 1560634039,
      flair: null,
      id: 90755,
      num_comments: 0,
      selftext: ` ↵↵Cassie↵↵Dave Smith and I became friends in high school. We both had parents with money and were good students. When we ended up in the same medical school at a big ten school, it was only natural that we got an apartment with two bedrooms off campus. The classes came much easier for Dave than they did for me. He developed the habit of seeking female company on weekends. ↵↵On Saturday night, Dave went out to cruise the local bars. With his rugged good looks and prospects of becoming an MD, he was often successful. I was still awake when he came home with a hot looking blonde. Steve introduced her, “This is Cassie, she’s from Haleyville.”↵↵Cassie added, “I dropped off my daughter for college. As a mom, I don’t get many chances for fun in ultra-conservative Haleyville, so I stayed over.”↵↵After a social drink, the couple retired to Dave’s bedroom. The sounds coming from his bedroom were too distracting, and I could no longer concentrate on my studies. Exhausted from a long week, I went to bed. ↵↵The next morning, I awoke to the sounds of cooking coming from our kitchen. Putting a robe over my pajamas, I got up to see what was going on.↵↵Cassie was busy cooking a beautiful brunch. She said, "Good morning, sleepy head. I went to a local convenience store and got some items for our brunch. My specialty is liver and onions, here try it.”↵↵She gave me a sample on a fork. It was the best liver and onions I ever had!↵↵She then said, “I’m afraid your friend Dave is still sleeping. We had a late night. Let’s not wake him, there will be lots of leftovers.”↵↵We sat down to a lovely meal and talked. Cassie said that she had an open marriage, and she and her husband never had their flings close to home. Since her daughter Cassandra was in college, she had more time for herself.↵↵As we talked, I had a second helping of liver and onions along with eggs, bacon, and cinnamon rolls that Cassie had made from scratch. A centerpiece of flowers created a beautiful scene as she poured us a strong cup of coffee, followed by a mimosa.↵↵From her conversation, it was clear that she was interested in me, and soon I told her about growing up in a wealthy suburb the names of everyone in my family and my opinions of them. Flattered by her interest in me, I rattled on and on.↵↵Finally, it was time for Cassie to go back to Haleyville. She had driven Dave back from the bar the night before, so her car was parked outside on the street. ↵↵I followed Cassie to the door, she turned and gave me a hug and kiss. She then said, “You are even more attractive than Dave, Next time I'm in town, I want to look you up. We can spend quality time together." ↵↵I gave her my cell number, and she left, taking the leftover liver and onions for her husband. She warned me once again to let Dave sleep. I stood outside and waved goodbye to her.↵↵Cheerfully, I went back to my studies. An attractive woman was interested in me! Time flew by, and all at once, it was early evening. I decided to get Dave up so he could have leftover brunch for dinner. ↵↵When I opened Dave’s bedroom door there was a shocking scene. Dave’s hands were tied to the brass headboard. A clear plastic bag was over his head, partly sucked into Dave’s mouth from his efforts for the last breath. Running over to him, I tore a hole in the plastic bag to provide an airway, checked for a pulse in his neck, but there was no pulse! His body was already cold! Horrified, I decided to begin CPR.  I threw the covers off of his body. The sheet was soaked in blood. Throwing it aside, I saw his cut open stomach, and his liver had been removed.`,
      title: "Liver and Onions",
      ups: 1,
      url: `https://www.reddit.com/r/nosleep/comments/c0x9y6/liver_and_onions/`
    },
  },
  {
    data: {
      author: "wjyapp",
      created: 1560634039,
      flair: null,
      id: 90755,
      num_comments: 0,
      selftext: ` ↵↵Cassie↵↵Dave Smith and I became friends in high school. We both had parents with money and were good students. When we ended up in the same medical school at a big ten school, it was only natural that we got an apartment with two bedrooms off campus. The classes came much easier for Dave than they did for me. He developed the habit of seeking female company on weekends. ↵↵On Saturday night, Dave went out to cruise the local bars. With his rugged good looks and prospects of becoming an MD, he was often successful. I was still awake when he came home with a hot looking blonde. Steve introduced her, “This is Cassie, she’s from Haleyville.”↵↵Cassie added, “I dropped off my daughter for college. As a mom, I don’t get many chances for fun in ultra-conservative Haleyville, so I stayed over.”↵↵After a social drink, the couple retired to Dave’s bedroom. The sounds coming from his bedroom were too distracting, and I could no longer concentrate on my studies. Exhausted from a long week, I went to bed. ↵↵The next morning, I awoke to the sounds of cooking coming from our kitchen. Putting a robe over my pajamas, I got up to see what was going on.↵↵Cassie was busy cooking a beautiful brunch. She said, "Good morning, sleepy head. I went to a local convenience store and got some items for our brunch. My specialty is liver and onions, here try it.”↵↵She gave me a sample on a fork. It was the best liver and onions I ever had!↵↵She then said, “I’m afraid your friend Dave is still sleeping. We had a late night. Let’s not wake him, there will be lots of leftovers.”↵↵We sat down to a lovely meal and talked. Cassie said that she had an open marriage, and she and her husband never had their flings close to home. Since her daughter Cassandra was in college, she had more time for herself.↵↵As we talked, I had a second helping of liver and onions along with eggs, bacon, and cinnamon rolls that Cassie had made from scratch. A centerpiece of flowers created a beautiful scene as she poured us a strong cup of coffee, followed by a mimosa.↵↵From her conversation, it was clear that she was interested in me, and soon I told her about growing up in a wealthy suburb the names of everyone in my family and my opinions of them. Flattered by her interest in me, I rattled on and on.↵↵Finally, it was time for Cassie to go back to Haleyville. She had driven Dave back from the bar the night before, so her car was parked outside on the street. ↵↵I followed Cassie to the door, she turned and gave me a hug and kiss. She then said, “You are even more attractive than Dave, Next time I'm in town, I want to look you up. We can spend quality time together." ↵↵I gave her my cell number, and she left, taking the leftover liver and onions for her husband. She warned me once again to let Dave sleep. I stood outside and waved goodbye to her.↵↵Cheerfully, I went back to my studies. An attractive woman was interested in me! Time flew by, and all at once, it was early evening. I decided to get Dave up so he could have leftover brunch for dinner. ↵↵When I opened Dave’s bedroom door there was a shocking scene. Dave’s hands were tied to the brass headboard. A clear plastic bag was over his head, partly sucked into Dave’s mouth from his efforts for the last breath. Running over to him, I tore a hole in the plastic bag to provide an airway, checked for a pulse in his neck, but there was no pulse! His body was already cold! Horrified, I decided to begin CPR.  I threw the covers off of his body. The sheet was soaked in blood. Throwing it aside, I saw his cut open stomach, and his liver had been removed.`,
      title: "Liver and Onions",
      ups: 1,
      url: `https://www.reddit.com/r/nosleep/comments/c0x9y6/liver_and_onions/`
    },
  }
];

const mockPostsArray = [];


describe("<PostFetch />", () => {

  it("Subreddit saves to localstorage", () => {
    saveSubredditToLocalStorage("nosleep");
    expect(window.localStorage.getItem("subreddit")).toBe("nosleep");
  });
  
  it("Saves posts to database", async () => {
    const save = await saveToDatabase(mockPosts);
    expect(save).toBeTruthy();
  });


  
})