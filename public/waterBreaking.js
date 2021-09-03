function onMessageArrived(r_message) {
    // 聽全部的訊息
    var rcmsg = JSON.parse(r_message.payloadString);
    console.log(rcmsg);
    for (var key in rcmsg) {
        var waterId = key;
        var waterValue = rcmsg[key];
        if (document.getElementById(waterId) != null) {
            if (waterValue == 0 || waterValue == "") {
                // if (waterValue ==1) {
                document.getElementById(waterId).style.display = "none";
                document.getElementById('Press_error').style.display = "inline-block";
            }
        }
    }
}
