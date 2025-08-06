// 记忆力训练APP - 网页版
class MemoryTrainingApp {
    constructor() {
        this.currentUser = null;
        this.currentMode = 'young';
        this.currentGame = null;
        this.gameStats = {
            totalScore: 0,
            totalGames: 0,
            streak: 0,
            averageScore: 0,
            bestScore: 0,
            totalTime: 0
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserData();
        this.showLoading();
        
        // 模拟加载时间
        setTimeout(() => {
            this.hideLoading();
            this.checkAuth();
        }, 2000);
    }

    setupEventListeners() {
        // 登录表单
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // 注册表单
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // 模式选择
        document.querySelectorAll('.mode-button').forEach(button => {
            button.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                this.currentMode = e.target.dataset.mode;
            });
        });
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }

    checkAuth() {
        const user = localStorage.getItem('memoryTrainingUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.showMainApp();
        } else {
            this.showLogin();
        }
    }

    showLogin() {
        this.hideAllPages();
        document.getElementById('login-page').classList.remove('hidden');
    }

    showRegister() {
        this.hideAllPages();
        document.getElementById('register-page').classList.remove('hidden');
    }

    showMainApp() {
        this.hideAllPages();
        document.getElementById('main-app').classList.remove('hidden');
        this.showHome();
        this.updateUserInfo();
    }

    showHome() {
        this.hideContentPages();
        document.getElementById('home-page').classList.remove('hidden');
        this.updateStats();
    }

    showGames() {
        this.hideContentPages();
        document.getElementById('games-page').classList.remove('hidden');
        this.loadGames();
    }

    showGame(gameType) {
        this.hideContentPages();
        document.getElementById('game-page').classList.remove('hidden');
        this.startGame(gameType);
    }

    showStats() {
        this.hideContentPages();
        document.getElementById('stats-page').classList.remove('hidden');
        this.loadStats();
    }

    showProfile() {
        this.hideContentPages();
        document.getElementById('profile-page').classList.remove('hidden');
        this.loadProfile();
    }

    hideAllPages() {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });
    }

    hideContentPages() {
        document.querySelectorAll('.content-page').forEach(page => {
            page.classList.add('hidden');
        });
    }

    async handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            this.showMessage('请填写邮箱和密码', 'error');
            return;
        }

        this.setLoading('login-form', true);

        try {
            // 模拟登录API调用
            await this.simulateApiCall();
            
            // 创建用户数据
            this.currentUser = {
                id: '1',
                name: email.split('@')[0],
                email: email,
                age: 25,
                level: '初级',
                joinDate: new Date().toISOString().split('T')[0],
                totalTrainingDays: 0,
                preferredMode: this.currentMode
            };

            // 保存用户数据
            localStorage.setItem('memoryTrainingUser', JSON.stringify(this.currentUser));
            
            this.showMainApp();
            this.showMessage('登录成功！', 'success');
        } catch (error) {
            this.showMessage('登录失败，请重试', 'error');
        } finally {
            this.setLoading('login-form', false);
        }
    }

    async handleRegister() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const age = document.getElementById('register-age').value;

        if (!name || !email || !password || !confirmPassword || !age) {
            this.showMessage('请填写所有必填字段', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showMessage('两次输入的密码不一致', 'error');
            return;
        }

        if (password.length < 6) {
            this.showMessage('密码长度至少6位', 'error');
            return;
        }

        this.setLoading('register-form', true);

        try {
            // 模拟注册API调用
            await this.simulateApiCall();
            
            // 创建用户数据
            this.currentUser = {
                id: '1',
                name: name,
                email: email,
                age: parseInt(age),
                level: '初级',
                joinDate: new Date().toISOString().split('T')[0],
                totalTrainingDays: 0,
                preferredMode: this.currentMode
            };

            // 保存用户数据
            localStorage.setItem('memoryTrainingUser', JSON.stringify(this.currentUser));
            
            this.showMainApp();
            this.showMessage('注册成功！', 'success');
        } catch (error) {
            this.showMessage('注册失败，请重试', 'error');
        } finally {
            this.setLoading('register-form', false);
        }
    }

    logout() {
        localStorage.removeItem('memoryTrainingUser');
        this.currentUser = null;
        this.showLogin();
        this.showMessage('已退出登录', 'info');
    }

    selectMode(mode) {
        this.currentMode = mode;
        this.showGames();
    }

    loadGames() {
        const gamesGrid = document.getElementById('games-grid');
        const modeTitle = document.getElementById('mode-title');
        
        modeTitle.textContent = this.currentMode === 'elder' ? '老年人模式 - 游戏选择' : '年轻人模式 - 游戏选择';
        
        const games = this.currentMode === 'elder' ? this.getElderGames() : this.getYoungGames();
        
        gamesGrid.innerHTML = games.map(game => `
            <div class="game-card" onclick="app.showGame('${game.id}')">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <span class="difficulty ${game.difficulty}">${this.getDifficultyText(game.difficulty)}</span>
            </div>
        `).join('');
    }

    getElderGames() {
        return [
            {
                id: 'number-memory',
                title: '数字记忆',
                description: '记住数字序列，从简单开始',
                difficulty: 'easy'
            },
            {
                id: 'image-matching',
                title: '图片配对',
                description: '找到相同的图片',
                difficulty: 'easy'
            },
            {
                id: 'word-recall',
                title: '词语回忆',
                description: '记住词语列表',
                difficulty: 'medium'
            },
            {
                id: 'color-memory',
                title: '颜色记忆',
                description: '记住颜色序列',
                difficulty: 'easy'
            }
        ];
    }

    getYoungGames() {
        return [
            {
                id: 'sequence-memory',
                title: '序列记忆',
                description: '记住复杂序列',
                difficulty: 'hard'
            },
            {
                id: 'pattern-recognition',
                title: '模式识别',
                description: '识别隐藏模式',
                difficulty: 'hard'
            },
            {
                id: 'multi-task',
                title: '多任务记忆',
                description: '同时处理多个任务',
                difficulty: 'hard'
            },
            {
                id: 'speed-memory',
                title: '快速记忆',
                description: '在限定时间内记忆',
                difficulty: 'medium'
            },
            {
                id: 'logic-memory',
                title: '逻辑记忆',
                description: '基于逻辑的记忆游戏',
                difficulty: 'hard'
            },
            {
                id: 'spatial-memory',
                title: '空间记忆',
                description: '记住空间位置',
                difficulty: 'medium'
            }
        ];
    }

    getDifficultyText(difficulty) {
        const texts = {
            easy: '简单',
            medium: '中等',
            hard: '困难'
        };
        return texts[difficulty] || '未知';
    }

    startGame(gameType) {
        this.currentGame = gameType;
        const gameTitle = document.getElementById('game-title');
        const gameArea = document.getElementById('game-area');
        
        const games = [...this.getElderGames(), ...this.getYoungGames()];
        const game = games.find(g => g.id === gameType);
        
        gameTitle.textContent = game.title;
        
        // 根据游戏类型显示不同的游戏界面
        switch (gameType) {
            case 'number-memory':
                this.startNumberMemoryGame(gameArea);
                break;
            case 'image-matching':
                this.startImageMatchingGame(gameArea);
                break;
            case 'word-recall':
                this.startWordRecallGame(gameArea);
                break;
            default:
                this.startDefaultGame(gameArea);
        }
    }

    startNumberMemoryGame(gameArea) {
        let sequence = [];
        let userInput = [];
        let level = 1;
        let score = 0;
        let gameState = 'showing'; // showing, input, result

        const generateSequence = () => {
            sequence = [];
            const length = this.currentMode === 'elder' ? 3 + level : 4 + level;
            for (let i = 0; i < length; i++) {
                sequence.push(Math.floor(Math.random() * 10));
            }
        };

        const showSequence = () => {
            gameArea.innerHTML = `
                <div class="game-instruction">
                    <h3>记住这个数字序列</h3>
                    <div class="sequence-display">
                        <span class="sequence-number">${sequence.join(' ')}</span>
                    </div>
                    <p>序列将在3秒后消失</p>
                </div>
            `;

            setTimeout(() => {
                showInput();
            }, 3000);
        };

        const showInput = () => {
            gameState = 'input';
            gameArea.innerHTML = `
                <div class="game-input">
                    <h3>请输入刚才的数字序列</h3>
                    <div class="number-pad">
                        ${[0,1,2,3,4,5,6,7,8,9].map(num => `
                            <button class="number-button" onclick="app.addNumber(${num})">${num}</button>
                        `).join('')}
                    </div>
                    <div class="input-display">
                        <span id="user-input">${userInput.join(' ')}</span>
                    </div>
                    <div class="input-controls">
                        <button onclick="app.clearInput()">清除</button>
                        <button onclick="app.submitAnswer()">提交</button>
                    </div>
                </div>
            `;
        };

        const checkAnswer = () => {
            const correct = userInput.join('') === sequence.join('');
            if (correct) {
                score += level * 10;
                level++;
                this.showMessage(`正确！得分：${score}，等级：${level}`, 'success');
                setTimeout(() => {
                    userInput = [];
                    generateSequence();
                    showSequence();
                }, 2000);
            } else {
                this.showMessage(`错误！正确答案：${sequence.join(' ')}`, 'error');
                setTimeout(() => {
                    this.endGame(score);
                }, 3000);
            }
        };

        // 开始游戏
        generateSequence();
        showSequence();

        // 添加全局方法
        window.app = window.app || {};
        window.app.addNumber = (num) => {
            if (gameState === 'input') {
                userInput.push(num);
                document.getElementById('user-input').textContent = userInput.join(' ');
            }
        };

        window.app.clearInput = () => {
            userInput = [];
            document.getElementById('user-input').textContent = '';
        };

        window.app.submitAnswer = () => {
            if (userInput.length > 0) {
                checkAnswer();
            }
        };
    }

    startImageMatchingGame(gameArea) {
        gameArea.innerHTML = `
            <div class="game-instruction">
                <h3>图片配对游戏</h3>
                <p>找到相同的图片</p>
                <div class="game-grid">
                    ${this.generateImageGrid()}
                </div>
            </div>
        `;
    }

    startWordRecallGame(gameArea) {
        const words = ['苹果', '香蕉', '橙子', '葡萄', '草莓', '蓝莓'];
        const selectedWords = words.slice(0, this.currentMode === 'elder' ? 3 : 4);
        
        gameArea.innerHTML = `
            <div class="game-instruction">
                <h3>记住这些词语</h3>
                <div class="word-list">
                    ${selectedWords.map(word => `<div class="word-item">${word}</div>`).join('')}
                </div>
                <p>3秒后词语将消失</p>
            </div>
        `;
    }

    startDefaultGame(gameArea) {
        gameArea.innerHTML = `
            <div class="game-instruction">
                <h3>游戏开发中</h3>
                <p>这个游戏正在开发中，敬请期待！</p>
                <button onclick="app.showGames()">返回游戏列表</button>
            </div>
        `;
    }

    generateImageGrid() {
        // 简单的图片网格生成
        return Array(16).fill(0).map((_, i) => `
            <div class="grid-item" onclick="app.flipCard(${i})">
                <div class="card-back">?</div>
            </div>
        `).join('');
    }
}