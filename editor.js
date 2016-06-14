class Editor{
    constructor(obj){
        this.object = obj;
        this.body = obj.children("p");
        this.title = obj.children("h3");
        let Document = require('./documents.js').Document;
        this.document = new Document("Draft","");
    }

    getTitle(){
        return this.title.html();
    }
    setTitle(str){
        this.title.html(str);
        this.document.setTitle(str);
    }

    getText(){
        return this.body.html();
    }
    setText(str){
        this.body.html(str);
        this.document.setBody(str);
    }

    updateDocument(){
        this.document.setTitle(this.title.html());
        this.document.setBody(this.body.html());
    }

    changeDocument(doc){
        this.document = doc;
        this.body.html(doc.getBody());
        this.title.html(doc.getTitle());
    }
}

(function(){
let prevText = "";
let prevTitle = "";
let editor = new Editor($("main"));
const DM = require('./documents.js').DocumentManager;
const Menu = require('./menu.js');
Menu.editor = editor;

let saveChanges = () => {
    if(editor.getText() != prevText){
        Menu.hide();
        prevText = editor.getText();
        let title = "Draft";
        if(editor.getTitle() !== null && editor.getTitle() !== "" && prevTitle !== editor.getTitle()){
            prevTitle = editor.getTitle();
            title = prevTitle;
        }
        editor.setTitle(editor.getTitle());
        editor.updateDocument();
    }
}

$("#save-button").click(function(){
    editor.updateDocument();    
});

window.setInterval(saveChanges,200);

})();

/*$(".document-list-item").on('click',()=>{
    var fs = require('fs');
    fs.writeFileSync("test","hello world!");
});*/
