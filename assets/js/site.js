/**
 * Created by harlen-angkemac on 2017/7/6.
 */

$(document).ready(function() {
    App.init();
    $('body').on('hidden.bs.modal', '.modal', function () {
        $(this).removeData('bs.modal');
    });
});

