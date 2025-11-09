// 祝福语数组
const blessings = [
    "要相信自己奥",
    "记得好好护肤",
    "记得吃水果",
    "别太累啦，偶尔偷懒也好",
    "你超棒的",
    "保持好心情",
    "期待下一次见面",
    "珍惜每一刻",
    "顺顺利利",
    "记得好好护肤",
    "保持好心情",
    "愿所有烦恼都消失",
    "天冷了，多穿衣服",
    "多喝水呦~",
    "别熬夜",
    "我想你了",
    "今天过得开心嘛",
    "下一次见面",
    "金榜题名",
    "每天都要元气满满",
    "早点休息",
    "梦想成真",
    "学会爱自己，才能更好爱别人",
    "要相信自己奥",
    "好好爱自己",
    "天冷了，多穿衣服",
    "今天过得开心嘛"
];

const confirmBtn = document.getElementById('confirmBtn');
const overlay = document.getElementById('overlay');
const blessingsContainer = document.getElementById('blessingsContainer');
const musicIcon = document.getElementById('musicIcon');
const bgMusic = document.getElementById('bgMusic');

let intervalId = null;
let cardCount = 0;
const maxCards = 200; // 最大卡片数量

// 点击确定按钮
confirmBtn.addEventListener('click', function() {
    // 隐藏弹窗
    overlay.classList.add('hidden');
    
    // 显示音乐图标
    musicIcon.style.display = 'flex';
    
    // 播放音乐
    bgMusic.play().then(() => {
        console.log('音乐开始播放');
        musicIcon.classList.add('playing');
    }).catch(e => {
        console.log('音乐播放失败，可能需要用户交互:', e);
        // 如果自动播放失败，音乐图标仍然显示，用户可以手动点击播放
    });
    
    // 开始生成祝福卡片
    startGeneratingBlessings();
});

// 音乐图标点击事件（播放/暂停）
musicIcon.addEventListener('click', function() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicIcon.classList.add('playing');
    } else {
        bgMusic.pause();
        musicIcon.classList.remove('playing');
    }
});

// 开始生成祝福卡片
function startGeneratingBlessings() {
    // 立即生成第一个
    generateBlessingCard();
    
    // 每隔一段时间生成新卡片
    intervalId = setInterval(() => {
        if (cardCount < maxCards) {
            generateBlessingCard();
        } else {
            clearInterval(intervalId);
        }
    }, 300); 
}

// 生成单个祝福卡片
function generateBlessingCard() {
    const card = document.createElement('div');
    card.className = 'blessing-card';
    
    // 随机选择颜色
    const colorClass = `color-${Math.floor(Math.random() * 5) + 1}`;
    card.classList.add(colorClass);
    
    // 随机选择祝福语
    const blessing = blessings[Math.floor(Math.random() * blessings.length)];
    
    // 设置卡片内容
    card.innerHTML = `
        <div class="card-header">
            <span class="card-emoji">💝</span>
            <span>提示</span>
        </div>
        <div class="card-content">${blessing}</div>
    `;
    
    // 随机位置（确保不超出屏幕）
    const maxX = window.innerWidth - 300;
    const maxY = window.innerHeight - 150;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    card.style.left = `${x}px`;
    card.style.top = `${y}px`;
    
    // 添加到容器
    blessingsContainer.appendChild(card);
    cardCount++;
    
    // 添加随机旋转角度
    const rotation = (Math.random() - 0.5) * 10; // -5度到5度之间
    card.style.transform = `rotate(${rotation}deg)`;
}

// 防止页面刷新时音乐停止
window.addEventListener('beforeunload', function() {
    if (intervalId) {
        clearInterval(intervalId);
    }
});

