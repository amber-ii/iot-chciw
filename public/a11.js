function onMessageArrived(r_message) {

    // 聽全部的訊息
    var rcMsg = JSON.parse(r_message.payloadString);
    console.log(rcMsg);

    for (var key in rcMsg) {
        var id = key;
        var value = rcMsg[key];
        if (document.getElementById(id) != null) {
            document.getElementById(id).innerHTML = value;
        }
    }
}




setTimeout(() => {
    $(document).ready(function () {
        $('.demo').fadeOut();
    });
}, 3500);