var electron = require('electron');
const {app,globalShortcut} = electron;
const {BrowserWindow} = electron;
const fs = require('fs');

let window;

function createWindow(){
    window = new BrowserWindow({
        'width':800,
        'height':600,
        'min-width':800,
        'min-height':600,
        'center':true
    });
    window.loadURL(`file://${__dirname}/main.html`);
    //window.webContents.openDevTools();
    window.on('closed',()=>{
        window = null;
        app.quit();
    });
}

app.on('ready',()=>{
    try{
        fs.accessSync('./drafts')
    }catch(e){
        fs.mkdirSync('./drafts');
    }
    createWindow();    
});
app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});
app.on('activate',()=>{
    if(win == null){
        createWindow();
    }
});
app.on('will-quit',()=>{
    globalShortcut.unregisterAll();
});
