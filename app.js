import { appendPostToContainer } from './postUtils.js';

window.addEventListener('load', () => {
  // This is a check to see if there's a username stored
  let username = localStorage.getItem('username');
  if (!username) {
    // Prompt for one if a username isn't found
    username = window.prompt('What is your name?');
    localStorage.setItem('username', username);
  }

  const containerEl = document.querySelector('#newsfeed');

  // This makes things appear 
  for (let index = bacefook.newsfeed.length - 1; index >= 0; index--) {
    const post = bacefook.newsfeed[index];
    appendPostToContainer(post, containerEl);
  }
  
});

document.addEventListener('DOMContentLoaded', function () {
  const toggleFormButton = document.getElementById('toggleFormButton');
  const postFormContainer = document.getElementById('postFormContainer');

  toggleFormButton.addEventListener('click', function () {
      if (postFormContainer.style.display === 'none') {
          postFormContainer.style.display = 'block';
      } else {
          postFormContainer.style.display = 'none';
      }
  });

  const postForm = document.getElementById('postForm');
  postForm.addEventListener('submit', function (event) {
      event.preventDefault(); // デフォルトの送信を防止


      const postText = document.getElementById('postText').value;
      const timestamp = new Date();

      // ここで投稿処理を実行する関数を呼び出すなどの処理を追加する

      // feelingを取得
      const selectedRadio = document.querySelector('input');
      console.log(selectedRadio);
      const selectedValue = "";
      if (selectedRadio) {
          selectedValue = selectedRadio.value;
      };
      console.log(selectedValue);
      const post = bacefook.newsfeed[bacefook.newsfeed.length - 1];
      post.friend = localStorage.getItem('username');
      post.text = postText;
      post.feeling = selectedValue;
      post.image = "images/image.png";
      post.timestamp = timestamp;

      const containerEl = document.querySelector('#newsfeed');
      appendPostToContainer(post, containerEl);

      // 投稿後にフォームを非表示にする
      postFormContainer.style.display = 'none';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const usernameDisplay = document.getElementById('usernameDisplay');

  // ローカルストレージからユーザー名を取得
  const storedUsername = localStorage.getItem('username');

  // ユーザー名がローカルストレージに保存されている場合、表示する
  if (storedUsername) {
      usernameDisplay.innerText = `user: ${storedUsername}`;
  }
});
