(function(){
    class Toast{
        static show(str){
            $("#toast-msg").fadeOut(500,function(){$(this).html(str).css({"opacity":"0.6"});})
            .fadeIn(500).delay(1000).fadeOut(500,function(){$(this)
                .html("Autosave On").css({"opacity":"0.2"})}).fadeIn(500);
        }
    }
    module.exports = Toast;
    return Toast;
})();
