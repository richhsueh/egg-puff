// 測驗問題數據
const quizData = {
    questions: [
        {
            question: "你在假日通常會做什麼？",
            options: [
                { text: "看電影或追劇", value: "A" },
                { text: "出門旅行或戶外活動", value: "B" },
                { text: "在家休息、閱讀或冥想", value: "C" }
            ]
        },
        {
            question: "選擇一種顏色：",
            options: [
                { text: "橙色", value: "A" },
                { text: "綠色", value: "B" },
                { text: "藍色", value: "C" }
            ]
        },
        {
            question: "遇到困難時，你會怎麼辦？",
            options: [
                { text: "尋求他人幫助", value: "A" },
                { text: "自己努力解決", value: "B" },
                { text: "先放鬆一下再面對", value: "C" }
            ]
        },
        {
            question: "你喜歡什麼樣的音樂？",
            options: [
                { text: "流行歌曲", value: "A" },
                { text: "輕音樂或古典", value: "B" },
                { text: "電子或搖滾", value: "C" }
            ]
        }
    ],
    results: {
        A: {
            type: "熱情開朗的你",
            description: "你是個熱情且喜歡與人交流的人，善於帶動氣氛，總能為周圍的人帶來溫暖與歡樂！",
            recommendation: {
                flavor: "巧克力口味AIA雞蛋糕",
                reason: "甜蜜的滋味正如你的個性一樣溫暖動人。"
            }
        },
        B: {
            type: "獨特沉穩的你",
            description: "你是個冷靜且注重內在的人，有獨特的思考方式，總是能在平凡中發現不平凡！",
            recommendation: {
                flavor: "起司口味AIA雞蛋糕",
                reason: "層次豐富的口感正如你深邃的內在一樣令人回味。"
            }
        },
        C: {
            type: "純真細膩的你",
            description: "你是個真誠而純粹的人，懂得欣賞生活中的小細節，能在簡單中體會幸福！",
            recommendation: {
                flavor: "原味AIA雞蛋糕（含葡萄乾）",
                reason: "純粹的美好中帶著驚喜，就像你一樣令人感到溫暖。"
            }
        }
    }
};

let currentQuestion = 0;
let answers = [];

// 開始測驗
function startQuiz() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    currentQuestion = 0;
    answers = [];
    showQuestion();
    updateProgress();
}

// 顯示問題
function showQuestion() {
    const questionData = quizData.questions[currentQuestion];
    document.getElementById('question').textContent = questionData.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.onclick = () => selectAnswer(option.value);
        optionsContainer.appendChild(button);
    });
}

// 選擇答案
function selectAnswer(answer) {
    answers.push(answer);
    
    if (currentQuestion < quizData.questions.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgress();
    } else {
        showResult();
    }
}

// 修改顯示結果函數
function showResult() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    const counts = answers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
    }, {});
    
    const result = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    const resultData = quizData.results[result];
    
    const resultContent = document.getElementById('result-content');
    resultContent.innerHTML = `
        <div class="result-card">
            <div class="result-type fade-in">
                <h3>${resultData.type}</h3>
            </div>
            
            <div class="result-details slide-in">
                <div class="personality-section">
                    <h4><i class="fas fa-user"></i> 性格特質</h4>
                    <p>${resultData.description}</p>
                </div>
                
                <div class="recommendation-section">
                    <h4><i class="fas fa-cookie"></i> 專屬推薦</h4>
                    <p class="recommendation-flavor">推薦你品嚐：${resultData.recommendation.flavor}</p>
                    <p class="recommendation-reason">${resultData.recommendation.reason}</p>
                </div>
            </div>
        </div>
    `;
}

// 新開始測驗
function restartQuiz() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('welcome-screen').classList.remove('hidden');
}

// 添加進度更新函數
function updateProgress() {
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('total-questions').textContent = quizData.questions.length;
}

// 社交媒體分享功能
function shareToFB() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(getShareText());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
}

function shareToLine() {
    const text = encodeURIComponent(getShareText());
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank');
}

function shareToTwitter() {
    const text = encodeURIComponent(getShareText());
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
}

// 修改分享文字函數
function getShareText() {
    const resultType = document.querySelector('.result-type h3').textContent;
    const personalityDesc = document.querySelector('.personality-section p').textContent;
    const recommendationFlavor = document.querySelector('.recommendation-flavor').textContent;
    const recommendationReason = document.querySelector('.recommendation-reason').textContent;
    return `【AIA雞蛋糕性格測驗】\n我是${resultType}\n${personalityDesc}\n${recommendationFlavor}\n${recommendationReason}\n來測測看你是哪種類型！`;
}
 