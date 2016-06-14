(function(){
    const DM = require('./documents.js').DocumentManager;
    let {Document} = require('./documents.js');
    class Menu{
        static getItemAt(index){
            return new Document(Menu.documents[index]);
        }
        static hide(){
            console.log("HIDE");
            Menu.object.animate({'left':'-30%'},300);
            Menu.editor.object.parent().animate({'left':'0'},300);
            Menu.editor.body.animate({'width':'90vw', 'max-width':'90vw'},300);
            Menu.editor.title.animate({'width':'90vw', 'max-width':'90vw'},300);
        }
        static show(){
            console.log("SHOW");
            Menu.object.animate({'left':'0'},300);
            Menu.editor.object.parent().animate({'left':'25%'},300);
            Menu.editor.body.animate({'width':'70vw','max-width':'70vw'},300);
            Menu.editor.title.animate({'width':'70vw','max-width':'70vw'},300);
            if(DM.getDocumentListCount != Menu.fileCount){
                Menu.refresh();
            }
        }

        static init(){
            if(Menu.started)
                return;
            $(".document-list-item").on('click',function(){
                var doc = new Document(Menu.documents[$(this).attr('pos')]);
                Menu.editor.changeDocument(doc);
            });
            $("nav #close-button").on('click',function(){
                Menu.hide();
            });
            $("#open-drawer").on('click',function(){
                Menu.show();
            });
            $("#new-button").on('click',function(){
                let doc = new Document("","");
                Menu.editor.changeDocument(doc);
            });
            Menu.started = true;
        }

        static refresh(){
            console.log("refreshing");
            Menu.documentList.html("");
            Menu.documents = DM.getDocumentList();
            Menu.fileCount = Menu.documents.length;
            let content = "";
            for (var i in Menu.documents) {
                content = content + `<div class='document-list-item' pos='${i}'>${Menu.documents[i]}</div>`;
            }
            Menu.documentList.html(content);
        }
    }
    Menu.started = Menu.started || false;
    Menu.fileCount = 0;
    Menu.object = $("nav");
    Menu.documentList = Menu.object.children("#document-list");
    Menu.documents = [];
    Menu.refresh();
    Menu.init();
    module.exports = Menu;
    return Menu;
})();
