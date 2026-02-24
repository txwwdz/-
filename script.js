// 初始应用数据
const INITIAL_APPS = [
    { id: 'phone', name: '电话', icon: 'fa-phone', color: '#4cd964', type: 'dock', category: '通讯', initials: 'dh' },
    { id: 'message', name: '短信', icon: 'fa-comment', color: '#4cd964', type: 'dock', category: '通讯', initials: 'dx' },
    { id: 'wechat', name: '微信', icon: 'fa-comments', color: '#07c160', type: 'dock', text: 'WeChat', category: '通讯', initials: 'wx' },
    { id: 'browser', name: '浏览器', icon: 'fa-compass', color: '#007aff', type: 'dock', category: '工具', initials: 'llq' },
    { id: 'qq', name: 'QQ', icon: 'fa-qq', color: '#12b7f5', type: 'brand', category: '通讯', initials: 'qq' },
    { id: 'worldbook', name: '世界书', icon: 'fa-book-atlas', color: '#ffab91', category: '阅读', initials: 'sjs' },
    { id: 'role', name: '角色', icon: 'fa-user-group', color: '#ff9800', category: '娱乐', initials: 'js' },
    { id: 'forum', name: '论坛', icon: 'fa-users', color: '#ce93d8', category: '社交', initials: 'lt' },
    { id: 'settings', name: '设置', icon: 'fa-gear', color: '#8e8e93', category: '系统', initials: 'sz' },
    { id: 'photos', name: '相册', icon: 'fa-images', color: 'linear-gradient(to bottom right, #ff9a9e, #fecfef)', category: '媒体', initials: 'xc' },
    { id: 'theme', name: '主题', icon: 'fa-paint-roller', color: '#00bcd4', category: '系统', initials: 'zt' },
    { id: 'fitness', name: '健身', icon: 'fa-heart-pulse', color: '#ff2d55', category: '健康', initials: 'js' },
    { id: 'wallet', name: '钱包', icon: 'fa-wallet', color: '#34aadc', category: '金融', initials: 'qb' },
    { 
        id: 'x',
        name: 'X', 
        color: '#000000', 
        svgPath: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
        viewBox: '0 0 24 24',
        category: '社交', initials: 'x'
    },
    { id: 'music', name: '音乐', icon: 'fa-music', color: '#ff3b30', category: '媒体', initials: 'yy' },
    { id: 'magic', name: '魔法', icon: 'fa-wand-magic-sparkles', color: '#673ab7', category: '娱乐', initials: 'mf' },
    { id: 'calendar', name: '日历', icon: 'fa-calendar-day', color: '#ffffff', textColor: '#000', category: '工具', initials: 'rl' },
    { id: 'clock', name: '时钟', icon: 'fa-clock', color: '#000000', category: '工具', initials: 'sz' },
    { id: 'notes', name: '备忘录', icon: 'fa-note-sticky', color: '#ffcc00', category: '工具', initials: 'bwl' },
    { id: 'mail', name: '邮箱', icon: 'fa-envelope', color: '#007aff', category: '通讯', initials: 'yx' },
    { id: 'shopping', name: '购物', icon: 'fa-bag-shopping', color: '#ff9500', category: '生活', initials: 'gw' },
    { id: 'food', name: '外卖', icon: 'fa-burger', color: '#ffcc00', category: '生活', initials: 'wm' },
    { 
        id: 'store',
        name: '应用商店', 
        color: '#ff3b30', 
        customHtml: '<div style="font-size: 10px; line-height: 1.2; text-align: center; font-weight: bold; white-space: nowrap; transform: scale(0.9); color: white;">♡ᯠ_   _ᯄ ੭ﾞ</div>',
        category: '系统', initials: 'yysd'
    },
    { id: 'weather', name: '天气', icon: 'fa-cloud-sun', color: '#5ac8fa', category: '工具', initials: 'tq' },
    { id: 'calculator', name: '计算机', icon: 'fa-calculator', color: '#333333', category: '工具', initials: 'jsj' },
    { id: 'game', name: '游戏', icon: 'fa-gamepad', color: '#ff3b30', category: '游戏', initials: 'yx' }
];

let apps = JSON.parse(JSON.stringify(INITIAL_APPS));
let deletedApps = [];
let isEditMode = false;
let longPressTimer;
let currentPage = 0;
let colsPerPage = 4;
let rowsPerPage = 6;
let itemsPerPageFirst = 16;
let itemsPerPageOther = 24;

// 拖拽相关变量
let draggedAppId = null;
let draggedElement = null;
let isDragging = false;
let dragStartX, dragStartY;
let screenRect = null;
let lastPageSwitchTime = 0;
let touchStartTime = 0;
let touchStartX = 0;
let touchStartY = 0;

// 音乐播放器状态
let musicState = {
    isPlaying: false,
    currentTrackIndex: 0,
    progress: 0,
    playMode: 'loop', // loop, random, single
    customName: '音乐日记☆ 𖦤·˖✶',
    customArtist: 'ᖰ⑅˶•▿•˶⑅ᖳ',
    customCover: 'https://via.placeholder.com/150',
    playlist: [
        { name: '七里香', artist: '周杰伦', cover: 'https://p2.music.126.net/8y99_8YvX_8YvX_8YvX_8YvX==/109951165647004069.jpg', source: '网易云', isVip: false },
        { name: '晴天', artist: '周杰伦', cover: 'https://p1.music.126.net/9l_g_v_v_v_v_v_v_v_v_v==/109951165647004069.jpg', source: 'QQ音乐', isVip: true }
    ]
};

// 设置状态
let settings = {
    hideStatusBarInApp: false
};

// 数据持久化
function saveData() {
    localStorage.setItem('phone_apps', JSON.stringify(apps));
    localStorage.setItem('phone_deleted_apps', JSON.stringify(deletedApps));
    localStorage.setItem('phone_settings', JSON.stringify(settings));
    localStorage.setItem('phone_music', JSON.stringify(musicState));
}

function loadData() {
    const savedApps = localStorage.getItem('phone_apps');
    const savedDeleted = localStorage.getItem('phone_deleted_apps');
    const savedSettings = localStorage.getItem('phone_settings');
    const savedMusic = localStorage.getItem('phone_music');
    if (savedApps) apps = JSON.parse(savedApps);
    if (savedDeleted) deletedApps = JSON.parse(savedDeleted);
    if (savedSettings) settings = JSON.parse(savedSettings);
    if (savedMusic) musicState = JSON.parse(savedMusic);
}

// 初始化函数
function init() {
    loadData();
    updateLayoutConfig();
    initAppsLayout();
    renderApps();
    updateTime();
    initBattery();
    initGestures();
    initGlobalEvents();
    initHistoryState();
    initMusicPlayer();
    
    window.addEventListener('resize', () => {
        updateLayoutConfig();
        renderApps();
    });
    
    window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };
    
    setInterval(updateTime, 1000);
}

function updateLayoutConfig() {
    const width = window.innerWidth;
    if (document.body.classList.contains('fullscreen-mode') && width >= 768) {
        colsPerPage = 8; rowsPerPage = 6; itemsPerPageFirst = 48; itemsPerPageOther = 48;
    } else {
        colsPerPage = 4; rowsPerPage = 6; itemsPerPageFirst = 16; itemsPerPageOther = 24;
    }
}

function isSlotOccupied(page, slot, excludeAppId = null) {
    return apps.some(app => {
        if (app.id === excludeAppId) return false;
        if (app.type === 'dock') return false;
        if (app.page !== page) return false;
        return app.slot === slot;
    });
}

function findNextEmptySlot(startPage = 0, startSlot = 0) {
    let page = startPage; let slot = startSlot;
    while (true) {
        if (!isSlotOccupied(page, slot)) return { page, slot };
        slot++;
        const capacity = page === 0 ? itemsPerPageFirst : itemsPerPageOther;
        if (slot >= capacity) { slot = 0; page++; }
    }
}

function initAppsLayout() {
    apps.forEach(app => {
        if (app.type === 'dock') { app.page = -1; app.slot = -1; }
        else if (app.page === undefined) {
            const emptyPos = findNextEmptySlot(0, 0);
            app.page = emptyPos.page; app.slot = emptyPos.slot;
        }
    });
}

function renderApps() {
    const dockGrid = document.getElementById('dock-grid');
    const wrapper = document.getElementById('desktop-wrapper');
    const pagination = document.getElementById('pagination');
    dockGrid.innerHTML = ''; wrapper.innerHTML = ''; pagination.innerHTML = '';
    const dockApps = apps.filter(app => app.type === 'dock');
    dockApps.forEach(app => dockGrid.appendChild(createAppElement(app)));
    const desktopApps = apps.filter(app => app.type !== 'dock');
    let maxPage = 0; desktopApps.forEach(app => { if (app.page > maxPage) maxPage = app.page; });
    if (currentPage > maxPage) currentPage = maxPage;
    if (currentPage < 0) currentPage = 0;
    for (let i = 0; i <= maxPage; i++) createPage(i, wrapper, pagination);
    updateTime(); updatePageScroll();
}

function createPage(pageIndex, wrapper, pagination) {
    const page = document.createElement('div');
    page.className = 'page'; page.id = `page-${pageIndex}`;
    const grid = document.createElement('div');
    grid.className = 'app-grid';
    if (pageIndex === 0) grid.classList.add('first-page');
    grid.id = `grid-page-${pageIndex}`;
    if (pageIndex === 0) {
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'widget-container';
        widgetContainer.innerHTML = `<div class="time-widget"><div id="widget-time">12:00</div><div id="widget-date">2月23日 星期日</div></div>`;
        page.appendChild(widgetContainer);
    }
    const capacity = pageIndex === 0 ? itemsPerPageFirst : itemsPerPageOther;
    for (let i = 0; i < capacity; i++) {
        const app = apps.find(a => a.page === pageIndex && a.slot === i && a.type !== 'dock');
        if (app) grid.appendChild(createAppElement(app));
        else {
            const placeholder = document.createElement('div');
            placeholder.className = 'app-item placeholder';
            grid.appendChild(placeholder);
        }
    }
    page.appendChild(grid); wrapper.appendChild(page);
    const dot = document.createElement('div');
    dot.className = `dot ${pageIndex === currentPage ? 'active' : ''}`;
    dot.dataset.index = pageIndex;
    dot.addEventListener('click', () => { if (!isEditMode) { currentPage = pageIndex; updatePageScroll(); } });
    pagination.appendChild(dot);
}

function createAppElement(app) {
    const div = document.createElement('div');
    div.className = `app-item ${isEditMode ? 'shaking' : ''}`;
    div.dataset.id = app.id;
    const iconDiv = document.createElement('div');
    iconDiv.className = 'app-icon';
    if (app.color && app.color.includes('gradient')) iconDiv.style.background = app.color;
    else iconDiv.style.backgroundColor = app.color || '#ccc';
    
    if (app.name === '日历') {
        const now = new Date();
        iconDiv.innerHTML = `<div class="calendar-icon"><div class="calendar-weekday">${['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()]}</div><div class="calendar-date">${now.getDate()}</div></div>`;
        iconDiv.style.backgroundColor = 'white';
    } else if (app.name === '时钟') {
        iconDiv.innerHTML = `<div class="clock-icon"><div class="clock-face"><div class="clock-circle"><div class="clock-hand hour-hand"></div><div class="clock-hand minute-hand"></div><div class="clock-hand second-hand"></div><div class="clock-center"></div></div></div></div>`;
        iconDiv.style.backgroundColor = 'white';
    } else if (app.id === 'qq') {
        iconDiv.innerHTML = `<i class="fab fa-qq" style="color:white; font-size:32px;"></i>`;
        iconDiv.style.backgroundColor = '#12b7f5';
    } else if (app.svgPath) {
        iconDiv.innerHTML = `<svg viewBox="${app.viewBox || '0 0 24 24'}" style="width: 30px; height: 30px; fill: white;"><path d="${app.svgPath}"></path></svg>`;
    } else if (app.customHtml) {
        iconDiv.innerHTML = app.customHtml;
    } else {
        const i = document.createElement('i');
        i.className = `${app.type === 'brand' ? 'fab' : 'fas'} ${app.icon}`;
        if (app.textColor) i.style.color = app.textColor;
        iconDiv.appendChild(i);
    }
    const nameSpan = document.createElement('span');
    nameSpan.className = 'app-name'; nameSpan.textContent = app.name;
    div.appendChild(iconDiv); div.appendChild(nameSpan);
    bindAppEvents(div, app);
    return div;
}

function bindAppEvents(element, app) {
    const startHandler = (e) => {
        const touch = e.touches ? e.touches[0] : e;
        touchStartTime = Date.now(); touchStartX = touch.clientX; touchStartY = touch.clientY;
        if (isEditMode) handleDragStart(e, app, element);
        else longPressTimer = setTimeout(() => { enterEditMode(); handleDragStart(e, app, element); }, 800);
    };
    const endHandler = (e) => {
        clearTimeout(longPressTimer);
        if (!isEditMode && !isDragging) {
            const touch = e.changedTouches ? e.changedTouches[0] : e;
            const dx = Math.abs(touch.clientX - touchStartX);
            const dy = Math.abs(touch.clientY - touchStartY);
            if (dx < 10 && dy < 10 && (Date.now() - touchStartTime) < 500) {
                if (app.id === 'settings') openSettings();
                else if (app.id === 'store') openAppStore();
                else if (app.id === 'calculator') openCalculator();
                else openApp(app);
            }
        }
    };
    element.addEventListener('mousedown', startHandler);
    element.addEventListener('touchstart', startHandler, { passive: false });
    element.addEventListener('mouseup', endHandler);
    element.addEventListener('touchend', endHandler);
}

function enterEditMode() {
    if (isEditMode) return; isEditMode = true;
    document.querySelectorAll('.app-item').forEach(el => el.classList.add('shaking'));
    if (navigator.vibrate) navigator.vibrate(50);
    if (window.location.hash !== '#edit') history.pushState({ editMode: true }, '', '#edit');
}

function exitEditMode() {
    if (!isEditMode) return; isEditMode = false;
    document.querySelectorAll('.app-item').forEach(el => el.classList.remove('shaking'));
    document.getElementById('delete-zone').classList.remove('visible');
}

function initGlobalEvents() {
    const powerBtn = document.querySelector('.power');
    if (powerBtn) powerBtn.addEventListener('click', (e) => { if (isEditMode) { e.stopPropagation(); exitEditMode(); } });
    const notch = document.getElementById('notch');
    const islandPanel = document.getElementById('island-panel');
    if (notch && islandPanel) {
        notch.addEventListener('click', (e) => { e.stopPropagation(); islandPanel.classList.toggle('hidden'); });
        document.addEventListener('click', (e) => {
            if (!islandPanel.classList.contains('hidden') && !e.target.closest('.island-panel') && !e.target.closest('.notch')) {
                islandPanel.classList.add('hidden');
            }
        });
    }
    document.getElementById('btn-cancel-delete').addEventListener('click', () => document.getElementById('confirm-modal').classList.add('hidden'));
    document.getElementById('btn-confirm-delete').addEventListener('click', confirmDelete);
}

function initHistoryState() {
    window.addEventListener('popstate', (event) => {
        if (isEditMode) { exitEditMode(); return; }
        const appWindow = document.getElementById('app-window');
        const appStore = document.getElementById('app-store-modal');
        const musicList = document.getElementById('music-list-modal');
        const statusBar = document.getElementById('global-status-bar');
        statusBar.classList.remove('hidden-in-app');
        if (musicList.classList.contains('active')) { musicList.classList.add('hidden'); musicList.classList.remove('active'); }
        else if (appStore.classList.contains('active')) { appStore.classList.add('hidden'); appStore.classList.remove('active'); }
        else if (appWindow.classList.contains('active')) {
            appWindow.classList.remove('active');
            if (appWindow.classList.contains('calculator-mode')) setTimeout(() => appWindow.classList.remove('calculator-mode'), 300);
        }
    });
}

function openApp(app) {
    const appWindow = document.getElementById('app-window');
    const title = document.getElementById('app-window-title');
    const content = document.getElementById('app-window-content');
    const statusBar = document.getElementById('global-status-bar');
    title.textContent = app.name;
    content.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; height:100%; font-size:24px; color:#ccc;">${app.name} 运行中...</div>`;
    statusBar.classList.remove('hidden-in-app');
    if (settings.hideStatusBarInApp) statusBar.classList.add('hidden-in-app');
    appWindow.classList.add('active');
    history.pushState({ appId: app.id }, '', `#${app.id}`);
}

function openCalculator() {
    const appWindow = document.getElementById('app-window');
    const title = document.getElementById('app-window-title');
    const content = document.getElementById('app-window-content');
    const statusBar = document.getElementById('global-status-bar');
    title.textContent = '计算机';
    content.innerHTML = `<div class="calculator"><div class="calc-display" id="calc-display">0</div><div class="calc-buttons">
        <button class="calc-btn gray" data-action="clear">AC</button><button class="calc-btn gray" data-action="sign">+/-</button><button class="calc-btn gray" data-action="percent">%</button><button class="calc-btn orange" data-action="operator" data-op="/">÷</button>
        <button class="calc-btn dark" data-num="7">7</button><button class="calc-btn dark" data-num="8">8</button><button class="calc-btn dark" data-num="9">9</button><button class="calc-btn orange" data-action="operator" data-op="*">×</button>
        <button class="calc-btn dark" data-num="4">4</button><button class="calc-btn dark" data-num="5">5</button><button class="calc-btn dark" data-num="6">6</button><button class="calc-btn orange" data-action="operator" data-op="-">-</button>
        <button class="calc-btn dark" data-num="1">1</button><button class="calc-btn dark" data-num="2">2</button><button class="calc-btn dark" data-num="3">3</button><button class="calc-btn orange" data-action="operator" data-op="+">+</button>
        <button class="calc-btn dark zero" data-num="0">0</button><button class="calc-btn dark" data-action="decimal">.</button><button class="calc-btn orange" data-action="calculate">=</button>
    </div></div>`;
    statusBar.classList.remove('hidden-in-app');
    if (settings.hideStatusBarInApp) statusBar.classList.add('hidden-in-app');
    appWindow.classList.add('active'); appWindow.classList.add('calculator-mode');
    history.pushState({ appId: 'calculator' }, '', '#calculator');
    let currentInput = '0'; let previousInput = null; let operator = null; let shouldResetScreen = false;
    const display = document.getElementById('calc-display');
    const updateDisplay = () => { display.textContent = currentInput; };
    content.querySelectorAll('.calc-btn').forEach(btn => {
        btn.onclick = () => {
            if (btn.dataset.num) {
                if (currentInput === '0' || shouldResetScreen) { currentInput = btn.dataset.num; shouldResetScreen = false; }
                else currentInput += btn.dataset.num;
            } else if (btn.dataset.action === 'clear') { currentInput = '0'; previousInput = null; operator = null; }
            else if (btn.dataset.action === 'calculate') {
                if (operator && previousInput) {
                    currentInput = String(eval(`${previousInput}${operator}${currentInput}`));
                    operator = null; shouldResetScreen = true;
                }
            } else if (btn.dataset.action === 'operator') { operator = btn.dataset.op; previousInput = currentInput; shouldResetScreen = true; }
            updateDisplay();
        };
    });
}

function openSettings() {
    const appWindow = document.getElementById('app-window');
    const title = document.getElementById('app-window-title');
    const content = document.getElementById('app-window-content');
    title.textContent = '设置';
    content.innerHTML = `<div class="setting-item"><span class="setting-label">全屏模式</span><label class="switch"><input type="checkbox" id="toggle-fullscreen"><span class="slider"></span></label></div>
        <div class="setting-item"><span class="setting-label">应用内隐藏状态栏</span><label class="switch"><input type="checkbox" id="toggle-status-bar" ${settings.hideStatusBarInApp ? 'checked' : ''}><span class="slider"></span></label></div>
        <div class="setting-item" style="margin-top:20px;"><button id="btn-reset-all" style="width:100%; padding:12px; background:#ff3b30; color:white; border:none; border-radius:10px; font-size:16px;">删除所有数据</button></div>`;
    appWindow.classList.add('active');
    document.getElementById('toggle-fullscreen').checked = document.body.classList.contains('fullscreen-mode');
    document.getElementById('toggle-fullscreen').onchange = (e) => {
        if (e.target.checked) document.body.classList.add('fullscreen-mode');
        else document.body.classList.remove('fullscreen-mode');
        updateLayoutConfig(); renderApps();
    };
    document.getElementById('toggle-status-bar').onchange = (e) => { settings.hideStatusBarInApp = e.target.checked; saveData(); };
    document.getElementById('btn-reset-all').onclick = () => {
        if (confirm('系统提示：你确定要删除所有数据吗？这将清空所有自定义设置和应用位置。')) {
            localStorage.clear(); location.reload();
        }
    };
    history.pushState({ appId: 'settings' }, '', '#settings');
}

function openAppStore() {
    const modal = document.getElementById('app-store-modal');
    const list = document.getElementById('deleted-apps-list');
    const tip = document.getElementById('no-deleted-apps');
    list.innerHTML = '';
    if (deletedApps.length === 0) tip.style.display = 'block';
    else {
        tip.style.display = 'none';
        deletedApps.forEach(app => {
            const item = document.createElement('div');
            item.className = 'store-app-item';
            item.innerHTML = `<span>${app.name}</span><button class="modal-btn confirm" style="padding:5px 10px;">恢复</button>`;
            item.querySelector('button').onclick = () => {
                deletedApps = deletedApps.filter(a => a.id !== app.id);
                apps.push(app); const pos = findNextEmptySlot(0, 0); app.page = pos.page; app.slot = pos.slot;
                renderApps(); saveData(); openAppStore();
            };
            list.appendChild(item);
        });
    }
    modal.classList.remove('hidden'); modal.classList.add('active');
    history.pushState({ appId: 'store' }, '', '#store');
}

function handleDragStart(e, app, element) {
    if (!isEditMode) return; if (e.cancelable) e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    dragStartX = touch.clientX; dragStartY = touch.clientY;
    draggedAppId = app.id; screenRect = document.getElementById('screen').getBoundingClientRect();
    draggedElement = element.cloneNode(true);
    draggedElement.classList.add('dragging-clone'); draggedElement.classList.remove('shaking');
    draggedElement.style.left = `${touch.clientX - 35}px`; draggedElement.style.top = `${touch.clientY - 40}px`;
    document.body.appendChild(draggedElement);
    setTimeout(() => { if (isDragging) element.style.opacity = '0'; }, 50);
    isDragging = true;
    const moveEvent = e.type === 'touchstart' ? 'touchmove' : 'mousemove';
    const endEvent = e.type === 'touchstart' ? 'touchend' : 'mouseup';
    const onMove = (ev) => handleDragMove(ev);
    const onEnd = (ev) => { handleDragEnd(ev); document.removeEventListener(moveEvent, onMove); document.removeEventListener(endEvent, onEnd); };
    document.addEventListener(moveEvent, onMove, { passive: false });
    document.addEventListener(endEvent, onEnd);
}

function handleDragMove(e) {
    if (!isDragging || !draggedElement) return; if (e.cancelable) e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    const dx = touch.clientX - dragStartX; const dy = touch.clientY - dragStartY;
    draggedElement.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.1)`;
    const deleteZone = document.getElementById('delete-zone');
    const relativeY = touch.clientY - screenRect.top;
    if (relativeY < 100 && relativeY > 0) { deleteZone.classList.add('visible'); deleteZone.classList.toggle('active', relativeY < 80); }
    else deleteZone.classList.remove('visible', 'active');
    
    const clientX = touch.clientX; const screenWidth = window.innerWidth;
    if (Date.now() - lastPageSwitchTime > 1000) {
        if (clientX < 40 && currentPage > 0) { currentPage--; updatePageScroll(); lastPageSwitchTime = Date.now(); }
        else if (clientX > screenWidth - 40) {
            const desktopApps = apps.filter(a => a.type !== 'dock');
            let maxPage = 0; desktopApps.forEach(a => { if(a.page > maxPage) maxPage = a.page; });
            if (currentPage < maxPage) { currentPage++; updatePageScroll(); lastPageSwitchTime = Date.now(); }
            else if (currentPage === maxPage && desktopApps.filter(a=>a.page===maxPage).length >= (maxPage===0?itemsPerPageFirst:itemsPerPageOther)) {
                currentPage++; updatePageScroll(); lastPageSwitchTime = Date.now();
            }
        }
    }
}

function handleDragEnd(e) {
    if (!isDragging) return; isDragging = false;
    document.querySelectorAll('.app-item').forEach(el => el.style.opacity = '1');
    const deleteZone = document.getElementById('delete-zone');
    const isDelete = deleteZone.classList.contains('active');
    if (draggedElement) draggedElement.remove();
    deleteZone.classList.remove('visible', 'active');
    if (isDelete) document.getElementById('confirm-modal').classList.remove('hidden');
    else {
        const touch = e.changedTouches ? e.changedTouches[0] : e;
        const app = apps.find(a => a.id === draggedAppId);
        if (app) {
            const dockRect = document.getElementById('dock-grid').getBoundingClientRect();
            if (touch.clientY >= dockRect.top) {
                if (app.type !== 'dock' && apps.filter(a => a.type === 'dock').length < 5) {
                    app.type = 'dock'; app.page = -1; app.slot = -1;
                }
            } else {
                const grid = document.getElementById(`grid-page-${currentPage}`);
                if (grid) {
                    const rect = grid.getBoundingClientRect();
                    const col = Math.floor((touch.clientX - rect.left) / (rect.width / colsPerPage));
                    const row = Math.floor((touch.clientY - rect.top) / (rect.height / rowsPerPage));
                    if (col >= 0 && col < colsPerPage && row >= 0 && row < rowsPerPage) {
                        app.type = undefined; app.page = currentPage; app.slot = row * colsPerPage + col;
                    } else {
                        // 兜底：如果拖拽到无效区域，放回原位或找最近空位
                        const pos = findNextEmptySlot(currentPage, 0);
                        app.page = pos.page; app.slot = pos.slot;
                    }
                }
            }
        }
        renderApps(); saveData();
    }
}

function confirmDelete() {
    const app = apps.find(a => a.id === draggedAppId);
    if (app) {
        apps = apps.filter(a => a.id !== app.id); deletedApps.push(app);
        document.getElementById('confirm-modal').classList.add('hidden');
        renderApps(); saveData();
    }
}

function updatePageScroll() {
    document.getElementById('desktop-wrapper').style.transform = `translateX(-${currentPage * 100}%)`;
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentPage));
}

function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0'); const m = String(now.getMinutes()).padStart(2, '0');
    const st = document.getElementById('status-time'); if (st) st.textContent = `${h}:${m}`;
    const wt = document.getElementById('widget-time'); if (wt) wt.textContent = `${h}:${m}`;
    const wd = document.getElementById('widget-date'); if (wd) wd.textContent = `${now.getMonth()+1}月${now.getDate()}日 ${['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][now.getDay()]}`;
    const hh = document.querySelector('.hour-hand'), mh = document.querySelector('.minute-hand'), sh = document.querySelector('.second-hand');
    if (hh) hh.style.transform = `rotate(${(now.getHours()%12)*30 + now.getMinutes()*0.5}deg)`;
    if (mh) mh.style.transform = `rotate(${now.getMinutes()*6}deg)`;
    if (sh) sh.style.transform = `rotate(${now.getSeconds()*6}deg)`;
}

async function initBattery() {
    try {
        const b = await navigator.getBattery();
        const up = () => {
            const l = Math.round(b.level * 100);
            document.getElementById('battery-level').textContent = `${l}%`;
            document.getElementById('battery-fill').style.width = `${l}%`;
        };
        up(); b.onlevelchange = up;
    } catch(e) {}
}

function initGestures() {
    const w = document.getElementById('desktop-wrapper'); let sx = 0;
    w.ontouchstart = (e) => { if(!isEditMode) sx = e.touches[0].clientX; };
    w.ontouchend = (e) => {
        if(isEditMode) return;
        const dx = sx - e.changedTouches[0].clientX;
        if(Math.abs(dx) > 50) {
            if(dx > 0 && currentPage < apps.filter(a=>a.type!=='dock').reduce((m,a)=>Math.max(m,a.page),0)) currentPage++;
            else if(dx < 0 && currentPage > 0) currentPage--;
            updatePageScroll();
        }
    };
}

// 音乐播放器逻辑深度定制
function initMusicPlayer() {
    const playBtn = document.getElementById('music-play-pause');
    const modeBtn = document.getElementById('music-mode-btn');
    const progress = document.getElementById('music-progress');
    const islandPanel = document.getElementById('island-panel');
    const musicName = document.getElementById('island-music-name');
    const musicArtist = document.getElementById('island-music-artist');
    const waveText = document.getElementById('music-wave-text');
    const musicCover = document.getElementById('music-cover');
    const vinylWrapper = document.getElementById('vinyl-wrapper');
    const listBtn = document.getElementById('music-list-btn');
    const listModal = document.getElementById('music-list-modal');
    const listContent = document.getElementById('music-list-content');
    const searchInput = document.getElementById('music-search-input');
    const searchBtn = document.getElementById('music-search-btn');
    const uploadModal = document.getElementById('upload-modal');
    const previewImg = document.getElementById('cover-preview-img');

    const updateUI = () => {
        musicName.textContent = musicState.customName;
        musicArtist.textContent = musicState.customArtist;
        musicCover.src = musicState.customCover;
        playBtn.className = musicState.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        islandPanel.classList.toggle('playing', musicState.isPlaying);
        const modes = { loop: 'fa-retweet', random: 'fa-random', single: 'fa-redo-alt' };
        modeBtn.className = `fas ${modes[musicState.playMode]}`;
    };

    playBtn.onclick = (e) => { e.stopPropagation(); musicState.isPlaying = !musicState.isPlaying; updateUI(); saveData(); };
    modeBtn.onclick = (e) => {
        e.stopPropagation();
        const modes = ['loop', 'random', 'single'];
        musicState.playMode = modes[(modes.indexOf(musicState.playMode) + 1) % 3];
        updateUI(); saveData();
    };

    // 自定义封面编辑
    vinylWrapper.onclick = (e) => { e.stopPropagation(); if (!musicState.isPlaying) { previewImg.src = musicState.customCover; uploadModal.classList.remove('hidden'); } };
    document.getElementById('btn-cancel-upload').onclick = () => uploadModal.classList.add('hidden');
    document.getElementById('btn-confirm-upload').onclick = () => {
        const url = document.getElementById('cover-url-input').value;
        if (url) musicState.customCover = url;
        else musicState.customCover = previewImg.src;
        updateUI(); saveData(); uploadModal.classList.add('hidden');
    };
    document.getElementById('btn-local-upload').onclick = () => document.getElementById('local-file-input').click();
    document.getElementById('local-file-input').onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => { previewImg.src = ev.target.result; };
            reader.readAsDataURL(file);
        }
    };

    // 音乐列表与搜索
    listBtn.onclick = (e) => { e.stopPropagation(); renderMusicList(); listModal.classList.remove('hidden'); listModal.classList.add('active'); history.pushState({musicList:true}, '', '#music-list'); };
    document.getElementById('btn-close-music-list').onclick = () => { listModal.classList.add('hidden'); listModal.classList.remove('active'); history.back(); };

    function renderMusicList(results = null) {
        const data = results || musicState.playlist;
        listContent.innerHTML = data.map((m, i) => `
            <div class="music-item">
                <img src="${m.cover}" class="music-item-cover">
                <div class="music-item-info">
                    <div class="music-item-name">${m.name}</div>
                    <div class="music-item-artist-row">
                        ${m.artist} ${m.isVip ? '<span class="vip-badge">VIP</span>' : ''}
                        <i class="source-icon">${m.source || '本地'}</i>
                    </div>
                </div>
                <div class="music-item-actions">
                    <i class="fas fa-plus" onclick="event.stopPropagation(); addToPlaylist(${i})"></i>
                    <i class="fas fa-play" onclick="event.stopPropagation(); playMusic(${i}, ${!!results})"></i>
                </div>
            </div>
        `).join('');
    }

    window.playMusic = (index, isSearch) => {
        const song = isSearch ? lastSearchResults[index] : musicState.playlist[index];
        if (song.isVip) {
            if (confirm(`此音乐为VIP音乐，是否要登录相应音乐软件账号？`)) {
                alert('模拟登录成功！'); song.isVip = false;
            } else return;
        }
        musicState.customName = song.name;
        musicState.customArtist = song.artist;
        musicState.customCover = song.cover;
        musicState.isPlaying = true;
        updateUI(); saveData();
    };

    let lastSearchResults = [];
    searchBtn.onclick = async () => {
        const key = searchInput.value.trim();
        if (!key) return;
        listContent.innerHTML = '<div style="text-align:center; padding:20px;">搜索中...</div>';
        try {
            const res = await fetch(`https://music.cyrilstudio.top/search?keywords=${key}`);
            const data = await res.json();
            lastSearchResults = data.result.songs.map(s => ({
                name: s.name, artist: s.artists[0].name, cover: `https://p2.music.126.net/8y99_8YvX_8YvX_8YvX_8YvX==/109951165647004069.jpg`,
                source: ['网易云', 'QQ音乐', '酷狗'][Math.floor(Math.random()*3)], isVip: Math.random() > 0.7
            }));
            renderMusicList(lastSearchResults);
        } catch(e) { alert('搜索失败'); }
    };

    setInterval(() => { if (musicState.isPlaying) { musicState.progress = (parseFloat(musicState.progress) + 0.2) % 100; progress.value = musicState.progress; } }, 1000);
    updateUI();
}

document.addEventListener('DOMContentLoaded', init);
