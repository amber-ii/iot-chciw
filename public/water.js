function onMessageArrived(r_message) {

    // 聽全部的訊息
    var rcMsg = JSON.parse(r_message.payloadString);
    console.log(rcMsg);

    for (var key in rcMsg) {
        var waterId = key;
        var waterValue = rcMsg[key];
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

var arr = new Array();
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    arr.push('<tr><th class="pl-2 bg-gray-200 text-black font-mono">' + key + ' -> ' + '<span class="text-blue-700 pr-4">' + localStorage.getItem(key) + '</span>' + '</th></tr>');
      
    if (arr.length > 5) {
        arr.sort();
        localStorage.removeItem(arr[0].substring(0, arr[0].indexOf(' -> ')));
        arr.shift();
    }
}
document.getElementById('modTable').innerHTML =
arr.sort().map(item => item.toString().replace('GMT+0800 (台北標準時間)', '')).join(' ');

function modPress() {

    if (connected_flag == 0) { //eslint-disable-line
        let out_msg = 'Not Connected so cannot send';
        console.log(out_msg);
        // alert(out_msg);
        return false;
    }

    var press_result = confirm('確定要修改壓力?');
    if (press_result) {
        let value = document.getElementById('modPress').value;
   
        var msg = `{"sv":` + value + '}'; //eslint-disable-line
        console.log(msg);
        window.localStorage.setItem(new Date(), value);
        let message = new Paho.MQTT.Message(msg); //eslint-disable-line
        message.destinationName = 'WPconf';
        mqtt.send(message); //eslint-disable-line
        location.reload();
        document.getElementById('modPress').value = ''; //清空輸入框
    } else {
        document.getElementById('modPress').value = ''; //清空輸入框
        return;
    }
    return false;

}



setTimeout(() => {
    $(document).ready(function () {
        $('.demo').fadeOut();
    });
}, 3500);