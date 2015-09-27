define(function(require){
    "use strict";

    var _ = require('log');
    var log = _.log;
    
    (function(){
        $(".signup-form").submit(function(e){
            e.preventDefault();
            var sInfo = {
                name: $("#name").val(),
                password: $("#password").val(),
                email: $("#email").val()
            };
            
            $.ajax({
                type: "get",
                dataType: "json",
                url: ROOT_URL +"public/js/signup",
                data: sInfo,
                success: function(msg){  
                    alert("注册成功！");
                    window.location.href = ROOT_URL + "index.html";
                },
                error: function(){
                    alert("ajax失败");
                }
            });        
        });
    })();
});
