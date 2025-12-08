/* ========================================
   Phone Controller
   处理手机交互逻辑
   ======================================== */

// App配置
const APP_CONFIG = {
    player: {
        title: 'プレイヤー',
        icon: 'player'
    },
    messages: {
        title: 'メッセージ',
        icon: 'messages'
    },
    diary: {
        title: '日記',
        icon: 'diary'
    },
    memo: {
        title: 'メモ',
        icon: 'memo'
    },
    browser: {
        title: 'ブラウザ',
        icon: 'browser'
    },
    calendar: {
        title: 'カレンダー',
        icon: 'calendar'
    }
};

export class PhoneController {
    constructor() {
        this.currentApp = null;
        this.homeScreen = null;
        this.appView = null;
        this.appContent = null;
        this.appTitle = null;
        this.backBtn = null;
    }

    init() {
        // 获取DOM元素
        this.homeScreen = document.getElementById('home-screen');
        this.appView = document.getElementById('app-view');
        this.appContent = document.getElementById('app-content');
        this.appTitle = document.getElementById('app-title');
        this.backBtn = document.getElementById('back-btn');

        // 绑定事件
        this.bindEvents();
    }

    bindEvents() {
        // App图标点击
        const appIcons = document.querySelectorAll('.app-icon');
        appIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                const appId = icon.dataset.app;
                if (appId) {
                    this.openApp(appId);
                }
            });
        });

        // 返回按钮
        this.backBtn.addEventListener('click', () => {
            this.closeApp();
        });

        // 键盘支持 - Escape返回
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentApp) {
                this.closeApp();
            }
        });
    }

    openApp(appId) {
        if (!APP_CONFIG[appId]) return;

        this.currentApp = appId;
        const config = APP_CONFIG[appId];

        // 更新标题
        this.appTitle.textContent = config.title;

        // 加载App内容
        this.loadAppContent(appId);

        // 显示App视图
        this.homeScreen.classList.remove('active');
        this.appView.classList.add('active');
    }

    closeApp() {
        this.currentApp = null;

        // 隐藏App视图
        this.appView.classList.remove('active');
        this.homeScreen.classList.add('active');

        // 延迟清空内容
        setTimeout(() => {
            this.appContent.innerHTML = '';
        }, 350);
    }

    loadAppContent(appId) {
        // 根据App ID加载对应内容
        const content = this.getAppPlaceholder(appId);
        this.appContent.innerHTML = content;

        // 触发App特定的初始化
        this.initAppModule(appId);
    }

    getAppPlaceholder(appId) {
        const config = APP_CONFIG[appId];
        const placeholders = {
            player: `
                <div class="app-placeholder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                    <p>音声プレイヤー<br>準備中...</p>
                </div>
            `,
            messages: `
                <div class="app-placeholder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    </svg>
                    <p>メッセージ<br>準備中...</p>
                </div>
            `,
            diary: `
                <div class="app-placeholder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                    </svg>
                    <p>日記<br>準備中...</p>
                </div>
            `,
            memo: `
                <div class="app-placeholder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    <p>メモ<br>準備中...</p>
                </div>
            `,
            browser: `
                <div class="app-placeholder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <p>ブラウザ<br>準備中...</p>
                </div>
            `,
            calendar: `
                <div class="app-placeholder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                    </svg>
                    <p>カレンダー<br>準備中...</p>
                </div>
            `
        };

        return placeholders[appId] || '<div class="app-placeholder"><p>Unknown App</p></div>';
    }

    initAppModule(appId) {
        // 未来每个App会有自己的模块
        // 这里预留初始化入口
        switch(appId) {
            case 'player':
                // import('./apps/player.js').then(module => module.init());
                break;
            case 'messages':
                // import('./apps/messages.js').then(module => module.init());
                break;
            // ... 其他App
        }
    }
}
