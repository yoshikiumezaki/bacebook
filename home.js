const navigateToIndex = document.getElementById("navToIndexButton");
navigateToIndex.addEventListener('click', () => {
    window.location.href = "index.html";
});

document.addEventListener('DOMContentLoaded', function() {
    // ローカルストレージから投稿データを取得
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    // 友達別にデータをグループ化するためのオブジェクトを作成
    const aggregatedData = {};
    
    // 投稿データを走査して友達別にデータを集計
    posts.forEach(post => {
        const friend = post.friend;
        const distance = parseFloat(post.distance); // 距離を数値に変換
        const time = parseFloat(post.time); // 時間を数値に変換
    
        // 友達別にデータを集計
        if (!aggregatedData[friend]) {
            // 初めての友達の場合、初期値を設定
            aggregatedData[friend] = {
                distance: distance,
                time: time
            };
        } else {
            // すでに友達のデータが存在する場合、合計値を更新
            aggregatedData[friend].distance += distance;
            aggregatedData[friend].time += time;
        }
        console.log(aggregatedData);
    });
    
    // 友達別の合計値を表示
    // テーブルにデータを追加
    const tableBody = document.querySelector('#friendData tbody');

    for (const friend in aggregatedData) {
        const totalDistance = aggregatedData[friend].distance;
        const totalTime = aggregatedData[friend].time;

        moveRunner(friend, totalDistance);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${friend}</td>
            <td>${totalDistance}</td>
            <td>${totalTime}</td>
        `;
    
        tableBody.appendChild(row);        
    }
    
});

function moveRunner(target, distance) {
    if (target === 'なおっち') {
        const runnerNao = document.getElementById("runnerNao");
        const runnerNaoStyle = getComputedStyle(runnerNao);

        const currentNaoLeft = parseInt(runnerNaoStyle.left, 10); // デフォルト値は0
        const currentNaoTop = parseInt(runnerNaoStyle.top, 10); // デフォルト値は0

        const moveNaoLeft = currentNaoLeft + distance * 1; // 横移動距離
        const moveNaoTop = currentNaoTop - distance * 0.5; // 縦移動距離

        runnerNao.style.left = `${moveNaoLeft}px`;
        runnerNao.style.top = `${moveNaoTop}px`;
    } else {
        const runnerUme = document.getElementById("runnerUme");
        const runnerUmeStyle = getComputedStyle(runnerUme);

        const currentUmeLeft = parseInt(runnerUmeStyle.left, 10); // デフォルト値は0
        const currentUmeTop = parseInt(runnerUmeStyle.top, 10); // デフォルト値は0

        const moveUmeLeft = currentUmeLeft + distance * 1; // 横移動距離
        const moveUmeTop = currentUmeTop - distance * 0.5; // 縦移動距離

        runnerUme.style.left = `${moveUmeLeft}px`;
        runnerUme.style.top = `${moveUmeTop}px`;
    }
}