function onMessageArrived(r_message) {

    // 聽全部的訊息
    var rcmsg = JSON.parse(r_message.payloadString);
    // console.log(rcmsg);
    for (var key in rcmsg) {
        var airId = key;
        var airValue = rcmsg[key];

        if (document.getElementById(airId) != null) {

            if ((airId.includes('fc'))) {
                if (airValue == 1) {
                    document.getElementById(airId).setAttribute("class", "snow");
                    document.getElementById(airId).setAttribute("title", "關閉");
                } else {
                    document.getElementById(airId).setAttribute("class", "snow-no");
                    document.getElementById(airId).setAttribute("title", "開啟");
                    document.getElementById(airId).style.color="gray";
                }
            } else if (airId.includes('wc')) {
                if (airValue == 1) {
                    document.getElementById(airId).innerHTML = "on"
                } else if (airValue == 0) {
                    document.getElementById(airId).innerHTML = "off"
                }
            } else if (airId.includes('t')) {
                document.getElementById(airId).innerHTML = airValue + "°";

                // todo redefine fe-airValue
            } else if (airId.includes('fe')) {
                if (airValue > 200) {
                    document.getElementById(airId).innerHTML = airValue;
                    document.getElementById(airId + '-text').innerHTML = " 大";
                    document.getElementById(airId + '-text').setAttribute('class', "fe-lg");
                    document.getElementById(airId.replace('fe', 'fc')).style.animationDuration = "1s"
                    // document.getElementById(airId.replace('fe', 'fc')).setAttribute("class", "snow-lg");
                } else if (airValue > 30) {
                    document.getElementById(airId).innerHTML = airValue;
                    document.getElementById(airId + '-text').innerHTML = " 中";
                    document.getElementById(airId + '-text').setAttribute('class', "fe-md");
                    // document.getElementById(airId.replace('fe', 'fc')).setAttribute("class", "snow-md");
                    document.getElementById(airId.replace('fe', 'fc')).style.animationDuration = "3s"
                }
                else if (airValue > 10) {
                    document.getElementById(airId).innerHTML = airValue;
                    document.getElementById(airId + '-text').innerHTML = " 小";
                    document.getElementById(airId + '-text').setAttribute('class', "fe-sm");
                    // document.getElementById(airId.replace('fe', 'fc')).setAttribute("class", "snow-sm");
                    document.getElementById(airId.replace('fe', 'fc')).style.animationDuration = "8s"

                }
            }
            // we
            else {
                document.getElementById(airId).innerHTML = airValue
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
