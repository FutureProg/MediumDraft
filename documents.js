(function(){
    let fs = require('fs');

    class Document{

        constructor(title, body){
            this.title = title;
            if(body == null){
                this.body = fs.readFileSync(`./drafts/${title}`,'utf8');
            }else{
                this.body = body;
            }
        }
        getTitle(){
            return this.title;
        }
        getBody(){
            return this.body;
        }
        setTitle(str){
            if(str.trim() == this.title)return;
            try{
                fs.renameSync(`./drafts/${this.title}`,`./drafts/${str}`);
            }catch(e){}
            this.title = str;
            //fs.writeFileSync(`./drafts/${str}`,this.body);            
        }
        setBody(str){
            if(str.trim() == this.body)return;
            this.body = str;
            try{
                fs.writeFileSync(`./drafts/${this.title}`,this.body);
            }catch(e){}
        }
    }

    class DocumentManager{
        static getDocumentList(){
            return fs.readdirSync("./drafts");
        }

        static getDocumentCount(){
            return getDocumentList().length;
        }
        static getFile(filename){
            return fs.readFileSync(`./drafts/${filename}`,'utf8');
        }

        static saveFile(filename,contents){
            fs.writeFileSync(`./drafts/${filename}`,contents);
        }

    }
    module.exports = {DocumentManager, Document};
    return {DocumentManager,Document};
}).call(this);
