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
    
    // 响应式计算卡片尺寸和位置
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // 根据屏幕宽度动态计算卡片最大宽度
    let cardMaxWidth = 280;
    let cardMaxHeight = 150;
    
    if (screenWidth <= 360) {
        cardMaxWidth = 150;
        cardMaxHeight = 120;
    } else if (screenWidth <= 480) {
        cardMaxWidth = 180;
        cardMaxHeight = 130;
    } else if (screenWidth <= 768) {
        cardMaxWidth = 220;
        cardMaxHeight = 140;
    }
    
    // 随机位置（确保不超出屏幕，考虑移动端边距）
    const padding = screenWidth <= 480 ? 5 : 10;
    const maxX = screenWidth - cardMaxWidth - padding;
    const maxY = screenHeight - cardMaxHeight - padding;
    
    // 确保范围是正数
    const safeMaxX = Math.max(padding, maxX);
    const safeMaxY = Math.max(padding, maxY);
    
    const x = Math.random() * (safeMaxX - padding) + padding;
    const y = Math.random() * (safeMaxY - padding) + padding;
    
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

// 处理窗口大小变化（主要用于移动端横竖屏切换）
let resizeTimer;
window.addEventListener('resize', function() {
    // 防抖处理，避免频繁触发
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // 可以在这里添加重新布局的逻辑
        // 目前卡片会自动适应新的屏幕尺寸
        console.log('屏幕尺寸已改变');
    }, 250);
});

// 防止移动端双击放大
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// 优化移动端滚动体验
document.addEventListener('touchmove', function(event) {
    // 允许音乐图标的触摸交互
    if (event.target.closest('.music-icon') || event.target.closest('.btn-confirm')) {
        return;
    }
}, { passive: true });

