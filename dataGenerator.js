import { appendPostToContainer } from './postUtils.js';
/*
  This generates our fake newsfeed information.

  There is no need to touch the code in here until you get to basic requirement #4,
  but please check it out to familiarize yourself beforehand.
  これにより、偽のニュースフィード情報が生成されます。

  基本的な要件 #4 に到達するまで、ここのコードに触れる必要はありません。
  ただし、事前に確認してください。
*/
(() => {

  window.bacefook = {};
  bacefook.newsfeed = [];
  bacefook.friends = {};
  bacefook.friendNames = ['hanako', 'taro', 'yuko', 'jiro', 'hikaru'];
  bacefook.friendNames.forEach(name => { bacefook.friends[name] = []; });

  const getRandomElement = array => {
    // Given an array, returns a random element 配列を指定すると、ランダムな要素を返します。
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const starters = ['totally just', 'just', 'completely', 'waaaaah! i', 'i just', 'a salaryman', 'a salaryman', 'yesterday I', 'a ninja', 'my boss'];
  const verbs = ['ate', 'drank', 'threw up in', 'refactored', 'iterated on', 'thought about', 'threw up on', 'saw', 'walked to', 'got lost in', 'walked into', 'googled', 'drove', 'ran to', 'worked on', 'slept on', 'slept in'];
  const fillers = ['my', 'your', 'his', 'her', 'my favorite', 'a beautiful', 'a delicious', 'that', 'this', 'an interesting', '', 'the best', 'the greatest', 'a delightful'];
  const nouns = ['DIG', 'restaurant', 'omakase', 'hitomedia', 'family mart', 'private jet', 'mama', 'lawsons', 'conbini', 'whisky', 'onigiri', 'car', 'food', 'house', 'toilet', 'tokyo', 'city', 'iphone', 'google', 'unicorn', 'mess', 'pirate ship', 'ninja'];
  const hashtags = ['#DIG', '#techlife', '#toyota', '#tokyo', '#japan', '#interesting', '#til', '#lol', '#tgifriday', '#hashtags', '#japanlife', '#oops', ''];
  const feelings = ['happy', 'smug', 'lovestruck', 'gross', 'scared', 'tired', 'angry', 'frustrated', 'excited', ''];
  const images = ['images/image.png', 'images/image(0).png', 'images/image (1).png', 'images/image (2).png', 'images/image(10).png', 'images/image (3).png', 'images/image (4).png', 'images/image (5).png', 'images/image (6).png', 'images/image (7).png'];

  const generateRandomText = () => {
    return [
      getRandomElement(starters),
      getRandomElement(verbs),
      getRandomElement(fillers),
      getRandomElement(nouns),
      getRandomElement(hashtags)
    ].join(' ');
  };

  const generatePostObj = timeOffset => {

    // if an offset is provided, make the timestamp that much older, otherwise just use the current time
    // オフセットが指定されている場合は、タイムスタンプをその分だけ古いものにし、それ以外の場合は現在の時刻を使用します。
    const timestamp = timeOffset ? new Date(new Date().getTime() - timeOffset) : new Date();

    return {
      friend: getRandomElement(bacefook.friendNames),
      text: generateRandomText(),
      feeling: getRandomElement(feelings),
      image: getRandomElement(images),
      timestamp,
    };
  };

  const addPost = obj => {
    const friend = obj.friend;
    bacefook.friends[friend].push(obj);
    bacefook.newsfeed.push(obj);
  };

  const createPost = timeOffset => {
    const newPost = generatePostObj(timeOffset);
    addPost(newPost);
  };

  for (let i = 0; i < 10; i++) {
    // make the starting posts look like they were posted over the course of the past day
    // 最初の投稿を過去 1 日間に投稿されたように見せる
    const timeOffset = (2 * (10 - i) + Math.random()) * 60 * 60 * 1000; //
    createPost(timeOffset);
  }

  const scheduler = () => {
    createPost(null);
    appendPost(bacefook.newsfeed.length - 1);
    setTimeout(scheduler, (3 + Math.random() * 5) * 1000); // generate a new post every   3 to 8 seconds 3 ～ 8 秒ごとに新しい投稿を生成します
  };

  function appendPost(index) {
    const post = bacefook.newsfeed[index];
    const containerEl = document.querySelector('#newsfeed');
    appendPostToContainer(post, containerEl);
  };

  scheduler();


})();
