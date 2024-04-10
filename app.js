import { appendPostToContainer } from './postUtils.js';

window.addEventListener('load', () => {
  let username = localStorage.getItem('username');
  if (!username) {
    username = window.prompt('What is your name?');
    localStorage.setItem('username', username);
  }

  const containerEl = document.querySelector('#newsfeed');

  // ローカルストレージから保存された投稿データを取得
  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  posts.forEach(post => {
    appendPostToContainer(post, containerEl);
  });
  
});

document.addEventListener('DOMContentLoaded', function () {
  const containerEl = document.querySelector('#newsfeed');
  const popupContainer = document.getElementById('popupPostForm');
  const overlay = document.getElementById('overlay');
  const postForm = document.getElementById('postForm'); 

  postForm.addEventListener('submit', function (event) {
      event.preventDefault(); // デフォルトの送信を防止

      const postText = document.getElementById('postText').value;
      const timestamp = new Date();

      // feelingを取得
      const selectedRadio = document.querySelector('input[name="feering"]:checked'); 
      let selectedValue = "";
      if (selectedRadio) {
          selectedValue = selectedRadio.value;
      };

      // 画像ファイルを取得
      const postImageInput = document.getElementById('postImage');
      let postImage = ""; // 画像データを格納する変数

      // 走った距離を取得
      const distance = document.getElementById('distance').value;

      // 走った時間を取得
      const runTime = document.getElementById('time').value;
      
      // 目的地を取得
      const destination = document.getElementById('destination').value;

      if (postImageInput.files.length > 0) {
          const postImageFile = postImageInput.files[0]; // 1つ目のファイルを取得

          // FileReader を使用して画像ファイルを読み込む
          const reader = new FileReader();
          reader.onload = function (e) {
              // 読み込んだ画像ファイルの URL を postImage に設定
              postImage = e.target.result;

              // ローカルストレージに投稿データを保存
              savePostToLocalStorage(postText, selectedValue, postImage, timestamp, distance, runTime, destination);

              // 投稿処理を実行
              submitPost(postText, selectedValue, postImage, timestamp, distance, runTime, destination, containerEl); 
          };
          // 画像ファイルを読み込む
          reader.readAsDataURL(postImageFile);
      } else {
          // 画像ファイルが選択されていない場合はデフォルトの画像ファイルを使用して投稿処理を実行
          savePostToLocalStorage(postText, selectedValue, postImage, timestamp, distance, runTime, destination);

          // 投稿処理を実行
          submitPost(postText, selectedValue, postImage, timestamp, distance, runTime, destination, containerEl); 

      }
  });
});

function savePostToLocalStorage(postText, selectedValue, postImage, timestamp, distance, time, destination) {
  const postData = {
    friend: localStorage.getItem('username'),
    text: postText,
    feeling: selectedValue,
    image: postImage,
    timestamp: timestamp.toISOString(), // タイムスタンプを ISO 8601 形式に変換して保存
    distance: distance,
    time: time,
    destination: destination
  };

  // ローカルストレージにデータを追加保存
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(postData);
  localStorage.setItem('posts', JSON.stringify(posts));
}

function submitPost(postText, selectedValue, postImage, timestamp, distance, time, destination, containerEl) { 
  const post = { 
    friend: localStorage.getItem('username'),
    text: postText,
    feeling: selectedValue,
    image: postImage,
    timestamp: timestamp.toISOString(),
    distance: distance,
    time: time,
    destination: destination
  };

  // 投稿処理を実行
  appendPostToContainer(post, containerEl); 

  // 投稿後にフォームを非表示にする
  const popupContainer = document.getElementById('popupPostForm');
  const overlay = document.getElementById('overlay');
  popupContainer.style.display = 'none';
  overlay.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  const usernameDisplay = document.getElementById('usernameDisplay');

  // ローカルストレージからユーザー名を取得
  const storedUsername = localStorage.getItem('username');

  // ユーザー名がローカルストレージに保存されている場合、表示する
  if (storedUsername) {
      usernameDisplay.innerText = `${storedUsername}`;
  }
});

const createViewButton = document.getElementById('createView');
const overlay = document.getElementById('overlay');
const popupForm = document.getElementById('popupPostForm');
const closePopupButton = document.getElementById('closePopupButton');

createViewButton.addEventListener('click', () => {
  overlay.style.display = 'block';
  popupForm.style.display = 'block';
});

closePopupButton.addEventListener('click', () => {
  overlay.style.display = 'none';
  popupForm.style.display = 'none';
});
