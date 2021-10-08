function onMessageArrived(r_message) {

    // 聽全部的訊息
    var rcMsg = JSON.parse(r_message.payloadString);
    console.log(rcMsg);

    for (var key in rcMsg) {
        var vpcId = key;
        var vpcValue = rcMsg[key];
        if (document.getElementById(vpcId) != null) {
            document.getElementById(vpcId).innerHTML = vpcValue;
        }
    }
}

var arr = new Array();
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.includes('vpc')) {
        arr.push(key + ' -> ' + '<span class="text-white pr-4 text-xl">' + localStorage.getItem(key) + '</span>' + '<br>');
    }
    if (arr.length > 5) {
        arr.sort();
        localStorage.removeItem(arr[0].substring(0, arr[0].indexOf(' -> ')));
        arr.shift();
    }
}

document.getElementById('modTable').innerHTML =
arr.sort().map(item => item.toString().replace('GMT+0800 (台北標準時間)', '').replace('vpc', '')).join(' ');



function modSV() {

    if (connected_flag == 0) {    //eslint-disable-line
        let out_msg = '斷線中無法修改';
        console.log(out_msg);
        alert(out_msg);
        return false;
    }

    var SV_result = confirm('確定要修改SV?');
    if (SV_result) {
        let value = document.getElementById('modSV').value;
        var msg = `{"sv":` + value + '}';    //eslint-disable-line
        console.log(msg);
        window.localStorage.setItem('vpc' + new Date(), value);
        let message = new Paho.MQTT.Message(msg);  //eslint-disable-line
        message.destinationName = 'A10VPCconf';
        mqtt.send(message); //eslint-disable-line
        location.reload();
        document.getElementById('modSV').value = ''; //清空輸入框
    } else {
        document.getElementById('modSV').value = ''; //清空輸入框
        return;
    }
    return false;

}



setTimeout(() => {
    $(document).ready(function () {
        $('.demo').fadeOut();
    });
}, 3500);