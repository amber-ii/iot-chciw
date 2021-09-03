function onMessageArrived(r_message) {

    // 聽全部的訊息
    var rcmsg = JSON.parse(r_message.payloadString);
    console.log(rcmsg);

    for (var key in rcmsg) {
        var waterId = key;
        var waterValue = rcmsg[key];
        if (document.getElementById(waterId) != null) {
            document.getElementById(waterId).innerHTML = waterValue;
            
            if (document.getElementById('Sw1').innerHTML == 1) {
                // document.getElementById('motor1').style.color = 'black'
                document.getElementById('motor1').setAttribute('class', 'motor-run');
            }
            if (document.getElementById('Sw2').innerHTML == 1) {
                document.getElementById('motor2').setAttribute('class', 'motor-run');

            }
           
        }
    }
}



function send_message(airId) {

    if (connected_flag == 0) {
        out_msg = "Not Connected so can't send"
        console.log(out_msg);
        return false;
    }
    var msg = `{"${airId}":` + changeState(airId) + "}";
    console.log(msg);
    message = new Paho.MQTT.Message(msg);
    message.destinationName = subTopic + "Conf";//in arduino
    mqtt.send(message);
    return false;
}



function changeState(airId) {

    if (airId.includes('fc')) {

        if (document.getElementById(airId).getAttribute('class') == "snow") {
            var fc_result = confirm(`確定要關閉冷氣?`);
            if (fc_result) {
                document.getElementById(airId).style.animationPlayState = "paused";
                document.getElementById(airId).style.color = "gray";
                return 0;
            } else {
                return 1;
            }
        } else {
            document.getElementById(airId).style.animationPlayState = "running";
            document.getElementById(airId).style.color = "#61DAFB"; //因為會延遲而設置(障眼用)
            return 1;
        }

    } else if (airId.includes('wc')) {
        if (document.getElementById(airId).innerHTML == "on") {
            var wc_result = confirm(`確定要關閉冰水閥?`);
            if (wc_result) {
                document.getElementById(airId).innerHTML = "off"
                return 0;
            } else {
                return 1;
            }

        } else {
            document.getElementById(airId).innerHTML = "on"
            return 1;
        }
    }
}






setTimeout(() => {
    $(document).ready(function () {
        $('.demo').fadeOut();
    });
}, 3500)