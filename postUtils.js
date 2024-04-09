export function appendPostToContainer(post, containerEl) {
    const friendEl = document.createElement('div');
    friendEl.className = 'friend';
    friendEl.innerText = post.friend;
  
    const postEl = document.createElement('div');
    postEl.innerText = post.text;
    postEl.append(friendEl);
  
    const timeEl = document.createElement('div');
    timeEl.className = 'timeStamp';
    const now = moment();
    const postTime = moment(post.timestamp);
    const elapsedTimeMinutes = now.diff(postTime, 'minutes');
    timeEl.innerText = `投稿してから${elapsedTimeMinutes}分経過しました`;
    postEl.append(timeEl);
  
    const feelingEl = document.createElement('div');
    feelingEl.className = 'feeling';
    feelingEl.innerText = post.feeling;
    postEl.append(feelingEl);
  
    const imageEl = document.createElement('img');
    imageEl.className = 'postImage';
    imageEl.src = post.image;
    postEl.append(imageEl);
    imageEl.width = 100;
    imageEl.height = 100;
  
    containerEl.after(postEl);
  }