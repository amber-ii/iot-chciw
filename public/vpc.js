function onMessageArrived(r_message) {
    
    // 聽全部的訊息
    var rcmsg = JSON.parse(r_message.payloadString);
    console.log(rcmsg);

    for (var key in rcmsg) {
        var vpcId = key;
        var vpcValue = rcmsg[key];
        if (document.getElementById(vpcId) != null) {
            document.getElementById(vpcId).innerHTML = vpcValue;
        }
    }
}



function modSV() {

    if (connected_flag == 0) {
        out_msg = "斷線中無法修改"
        console.log(out_msg);
        alert(out_msg);
        return false;
    }

    var SV_result = confirm(`確定要修改SV?`);
    if (SV_result) {
        let value = document.getElementById('modSV').value;
        var msg = `{"sv":` + value + "}";
        console.log(msg);
        message = new Paho.MQTT.Message(msg);
        message.destinationName = "A10VPCconf";
        mqtt.send(message);
        document.getElementById('modSV').value = ""; //清空輸入框
    } else {
        document.getElementById('modSV').value = ""; //清空輸入框
        return;
    }
    return false;

}



setTimeout(() => {
    $(document).ready(function () {
        $('.demo').fadeOut();
    });
}, 3500)