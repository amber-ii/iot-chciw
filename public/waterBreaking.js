function onMessageArrived(r_message) {
    // 聽全部的訊息
    var rcMsg = JSON.parse(r_message.payloadString);
    console.log(rcMsg);
    for (var key in rcMsg) {
        var waterId = key;
        var waterValue = rcMsg[key];
        if (document.getElementById(waterId) != null) {
            if (waterValue == 0 || waterValue == '' || waterValue == undefined || waterValue == null) {
                // if (waterValue ==1) {
                document.getElementById(waterId).style.display = 'none';
                document.getElementById('Press_error').style.display = 'inline-block';
            } if (waterValue == 1) {
                document.getElementById(waterId).style.display = 'flex';
                document.getElementById('Press_error').style.display = 'none';
            }
        }
    }
}
