/**
 * Created by harlen-angkemac on 2017/7/10.
 */
window.pokerDragon = (function($){
    var pub = {
        confirm: function (message, ok, cancel) {
            var msg = '<div class="alert alert-danger m-b-0"><h4><i class="fa fa-info-circle"></i> angke-伊普西龙温馨提示你:</h4><p>' + message +'</p></div></div>';
            BootstrapDialog.confirm({
                title: '操作提示',
                btnCancelLabel: '取消',
                btnOKLabel: '确定',
                message: msg,
                btnOKClass: 'btn btn-sm btn-danger',
                btnCancelClass: 'btn btn-sm btn-white',
                type: BootstrapDialog.TYPE_DEFAULT,
                callback: function(result){
                    if (result) {
                        !ok || ok();
                    } else {
                        !cancel || cancel();
                    }
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
        gitterMsg: function(title, message, image) {
            $.gritter.add({
                title: title,
                text: message,
                image: "https://assets-cdn.github.com/images/modules/site/integrators/travis-ci.png",
                sticky: false,
                time: ""
            });
            return true;
        },
        alertSuccess: function (message, url) {
            var html;
            html = '<div class="modal fade" id="pd-modal-alert-success">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
                '<h4 class="modal-title">提示信息</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<div class="alert alert-info m-b-0">' +
                '<h4><i class="fa fa-info-circle"></i>操作成功</h4>' +
                '<p>'+ message +'</p>' +
                '</div>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal"> 留在当前页 </a>' +
                '<a href="javascript:;" class="btn btn-sm btn-danger" data-dismiss="modal" onclick="javascript:window.location.href=\''+ url +'\'"> 跳转 </a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            $('#pd-modal-alert-success').remove();
            $('body').append(html);
            $('#pd-modal-alert-success').modal();
            return;

        },
        alertDanger: function (message) {
            var html;
            html = '<div class="modal fade" id="pd-modal-alert-danger">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
                '<h4 class="modal-title">提示信息</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<div class="alert alert-danger m-b-0">' +
                '<h4><i class="fa fa-info-circle"></i>操作失败</h4>' +
                '<p>'+ message +'</p>' +
                '</div>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<a href="/service/index" class="btn btn-sm btn-danger" data-dismiss="modal"> 确定 </a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            $('#pd-modal-alert-danger').remove();
            $('body').append(html);
            $('#pd-modal-alert-danger').modal();
            return;
        },
        confirmModal: function (){
            var msg = arguments[0] ? arguments[0] : '你确认要执行此操作!';
            var header = arguments[1] ? arguments[1] : '重要提示';
            var action = arguments[2] ? arguments[2] : '确定';
            var close = arguments[3] ? arguments[3] : '取消';
            var url = arguments[4] ? arguments[4] : '';
            if(url !== ''){
                return '<div class="modal fade" id="pd-confirm-modal-alert">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
                    '<h4 class="modal-title">'+header +'</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<div class="alert alert-danger m-b-0">' +
                    '<h4><i class="fa fa-info-circle"></i>'+header+'</h4>' +
                    '<p>'+ msg +'</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">'+ close +'</a>' +
                    '<a href="javascript:;" onclick="pokerDragon.confirmAjax($(this))" class="btn btn-sm btn-danger ajax-confirm" data-url="'+ url +'" data-dismiss="modal">'+ action + '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }else{
                return '<div class="modal fade" id="pd-confirm-modal-alert">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
                    '<h4 class="modal-title">'+header +'</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<div class="alert alert-danger m-b-0">' +
                    '<h4><i class="fa fa-info-circle"></i>'+header+'</h4>' +
                    '<p>'+ msg +'</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">'+ close +'</a>' +
                    '<a href="javascript:;" class="btn btn-sm btn-danger" data-dismiss="modal">'+ action + '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }


        },
        /**
         * 生成一个ajax的对话确认框
         * @param that
         */
        confirmAjax: function(that){
            $.ajax({
                url: that.data('url'),
                type: 'get',
                dataType: 'json',
                success: function(json){
                    if(json.code == 1) {
                        //禁用button
                        that.attr("disabled", true);
                        pub.alertSuccess(json.message, json.url);
                        pub.gitterMsg('操作成功', json.message);
                    } else if(json.code == 0) {
                        pub.alertDanger(json.message);
                        pub.gitterMsg('操作失败', json.message);
                    }
                },
                error: function(xhr) { //上传失败
                    pub.alertDanger('网络错误,请稍后重试');
                }
            });
        },
        /**
         * ajax请求获取一个modal框
         * @param that
         */
        ajaxModal: function(that){
            $("#ajax-modal-content").html('');
            $.ajax({
                url: that.data('url'),
                type: 'get',
                dataType: 'html',
                headers:{
                    "X_PJAX": true
                },
                success: function(html){
                    $("#ajax-modal-content").append(html);
                },
                error: function(xhr) { //上传失败

                },
            });
        },
        init: function(){
            initSweetAlert();
            initConfirm();
            initFormWidget();
            initAAjaxWidget();
        }
    };
    function initConfirm(){
        window.yii.confirm = pub.confirm;
    }
    function initSweetAlert(){

    }
    function initAAjaxWidget(){
        $(".a-ajax").click(function(){

        });
    }
    /**
     * 表单ajax提交
     */
    function initFormWidget()
    {
        $(".ajax-post").on('click', function(){
            var data, ajaxCallUrl, postUrl, target;
            var that = $(this);
            target = that.data('form-id');
            var d = $('#'+target);

            postUrl = $(this).attr('post-url');

            //按钮上的url优先
            ajaxCallUrl = postUrl ? postUrl : d.attr('action');

            $.ajax({
                url: ajaxCallUrl,
                type: 'post',
                dataType: 'json',
                data: d.serialize(),
                success: function(json) {
                    if(json.code == 1) {
                        //禁用button
                        that.attr("disabled", true);
                        pub.alertSuccess(json.message, json.url);
                        pub.gitterMsg('操作成功', json.message);
                    } else if(json.code == 0) {
                        pub.alertDanger(json.message);
                        pub.gitterMsg('操作失败', json.message);
                    }
                    // setTimeout(function() {
                    //     $('.close').click();
                    // }, 3e3);
                },
                error: function(xhr) { //上传失败
                    pub.alertDanger('网络错误,请稍后重试');
                }
            });
        });
    }
    return pub;
})(window.jQuery);

window.jQuery(function () {
    window.pokerDragon.initModule(window.pokerDragon);
});