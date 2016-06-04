(function(){
    const DM = require('./documents.js').DocumentManager;
    let {Document} = require('./documents.js');
    class Menu{
        static getItemAt(index){
            return new Document(Menu.documents[index]);
        }
        static hide(){
            Menu.object.animate({'left':'-30%'},300);
            Menu.editor.object.parent().animate({'left':'0'},300);            
            Menu.editor.body.parent().animate({'width':'100vw'},300);
        }
        static show(){
            Menu.object.animate({'left':'0'},300);
            Menu.editor.object.parent().animate({'left':'25%'},300);
        }

        static refresh(){
            Menu.documentList.html("");
            Menu.documents = DM.getDocumentList();
            let content = "";
            for (var i in Menu.documents) {
                content = content + `<div class='document-list-item' pos='${i}'>${Menu.documents[i]}</div>`;
            }
            Menu.documentList.html(content);
            $(".document-list-item").on('click',function(){
                var doc = new Document(Menu.documents[$(this).attr('pos')]);
                Menu.editor.changeDocument(doc);
            });
            $("nav #close-button").on('click',function(){
                Menu.hide();
            });
        }
    }
    Menu.object = $("nav");
    Menu.documentList = Menu.object.children("#document-list");
    Menu.documents = [];
    Menu.refresh();
    module.exports = Menu;
    return Menu;
})();
