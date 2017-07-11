/**
 * Created by harlen-angkemac on 2017/7/10.
 */
window.pokerDragon = (function($){
    var pub = {
        confirm: function (message, ok, cancel) {
            swal({
                    title: "确认操作?",
                    text: message,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function(isConfirm){
                    if (isConfirm) {
                        !ok || ok();
                        swal("删除成功!", "成功", "success");
                    } else {
                        !cancel || cancel();

                    }
                });
        },

        initModule: function (module){
            if(module.isActive !== undefined && !module.isActive){
                return ;
            }
            if($.isFunction(module.init)){
                module.init();
            }
            $.each(module, function() {
                if ($.isPlainObject(this)) {
                    pub.initModule(this);
                }
            });
        },

        init: function(){
            initSweetAlert();
            initConfirm();
        }
    };
    function initConfirm(){
        window.yii.confirm = pub.confirm;
    }
    function initSweetAlert(){

    }
    return pub;
})(window.jQuery);

window.jQuery(function () {
    window.pokerDragon.initModule(window.pokerDragon);
});