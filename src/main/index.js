/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`
let isMax = true;
const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron');
let win;
var appIcon = null;
ipcMain.on('window-close', function() {
    win.close();
})

ipcMain.on('window-min', function() {
    if (win.isMinimized()) {
        return;
    }
    win.minimize();
})

ipcMain.on('window-max', function() {
    if (!!isMax) {
        isMax = false;
        win.maximize()
    } else {
        isMax = true;
        win.unmaximize()
    }

})
ipcMain.on('open_devtools', function() {
    win.webContents.openDevTools();
})

ipcMain.on('window-header-dbclick', function() {
    if (win.isMaximized()) {
        win.unmaximize()
    }
})

function createWindow() {
    // 创建浏览器窗口
    win = new BrowserWindow({
        title: '网易云音乐',
        width: 1020,
        height: 660,
        minHeight: 660,
        minWidth: 1020,
        webPreferences: { //可以在Electron的Web Workers里使用Node.js的特性。要用的话，
            //需把webPreferences中的nodeIntegrationInWorker选项设置为true
            nodeIntegrationInWorker: true
        },
        frame: false, // 创建无边框窗口
        show: false,
        resizable: true,
        backgroundColor: '#66CD00',
        hasShadow: true,
        transparent: true,
        icon: __static + '/images/icon/icon.png'

    })

    win.loadURL(winURL);
    // 然后加载应用的 index.html。
    // win.loadFile('app/index.html')
    // 打开开发者工具
    win.webContents.openDevTools()

    // Tray
    appIcon = new Tray(__static + '/images/icon/icon.png');
    const contextMenu = Menu.buildFromTemplate([{
            label: '播放/暂停',
            type: 'normal',
            click: function(menuitem, window) {
                win.webContents.send('playorpause');
            }
        },
        {
            label: '上一首',
            type: 'normal',
            click: function(menuitem, window) {
                win.webContents.send('previous');
            }
        },
        {
            label: '下一首',
            type: 'normal',
            click: function(menuitem, window) {
                win.webContents.send('next');
            }
        },
        {
            label: '隐藏/显示',
            type: 'normal',
            click: function(menuitem, window) {
                if (win.isVisible()) {
                    win.hide();
                } else {
                    win.show();
                }
            }
        },
        {
            label: '退出',
            type: 'normal',
            click: function(menuitem, window) {
                app.quit();
            }
        },
    ]);

    appIcon.setToolTip('CloudMusic');
    appIcon.setContextMenu(contextMenu);

    win.once('ready-to-show', () => {
            win.show();
        })
        //当窗口全部关闭时退出
    app.on('window-all-closed', () => {
        // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
        // 否则绝大部分应用及其菜单栏会保持激活。
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        // 在macOS上，当单击dock图标并且没有其他窗口打开时，
        // 通常在应用程序中重新创建一个窗口。
        if (win === null) {
            createWindow()
        }
    })

}

app.on('ready', createWindow)