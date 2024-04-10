export function appendPostToContainer(post, containerEl) {
    const cardEl = document.createElement('div');
    cardEl.className = 'postCard';

    const imageEl = document.createElement('img');
    imageEl.className = 'postImage';
    imageEl.src = post.image;
    //postEl.append(imageEl);
    imageEl.width = 100;
    imageEl.height = 100;
    cardEl.append(imageEl);
    
    const friendEl = document.createElement('div');
    friendEl.className = 'friend';
    friendEl.innerText = post.friend;
    cardEl.append(friendEl);
  
    const postEl = document.createElement('div');
    postEl.innerText = post.text;
    cardEl.append(postEl);
  
    const timeEl = document.createElement('div');
    timeEl.className = 'timeStamp';
    const now = moment().local();;
    const postTime = moment(post.timestamp);
    timeEl.innerText = postTime.local().format("YYYY年MM月DD日");
    cardEl.append(timeEl);
    
    const deffTimeEl = document.createElement('div');
    deffTimeEl.className = 'timeStamp';
    const now_deff = moment();
    const postTime_deff = moment(post.timestamp);
    const elapsedTimeMinutes = now_deff.diff(postTime_deff, 'minutes');
    deffTimeEl.innerText = `投稿してから${elapsedTimeMinutes}分経過しました`;
    cardEl.append(deffTimeEl);
  
    const feelingEl = document.createElement('div');
    feelingEl.className = 'feeling';
    feelingEl.innerText = post.feeling;
    cardEl.append(feelingEl);
  


    const distanceEl = document.createElement('div');
    const distanceOutput = `走った距離 : ${post.distance} km`;
    distanceEl.className = 'distance';
    distanceEl.innerText = distanceOutput;
    cardEl.append(distanceEl);

    const runTimeEl = document.createElement('div');
    const runTimeOutput = `走った時間 : ${post.time} km`;
    runTimeEl.className = 'runTime';
    runTimeEl.innerText = runTimeOutput;
    cardEl.append(runTimeEl);

    const destinationEl = document.createElement('div');
    const destinationOutput = `目的地 : ${post.destination}`;
    destinationEl.className = 'destination';
    destinationEl.innerText = destinationOutput;
    cardEl.append(destinationEl);
  
    containerEl.after(cardEl);
  }
