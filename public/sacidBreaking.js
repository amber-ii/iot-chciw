function onMessageArrived(r_message) {
    // 聽全部的訊息
    var rcmsg = JSON.parse(r_message.payloadString)
    // console.log(rcmsg)
    for (var key in rcmsg) {
        var Id = key
        var value = rcmsg[key]
        if (document.getElementById(Id)) {
            if (value == 0) {
                document.getElementById(Id).style.display = 'flex'
                document.getElementById(`${Id}ok`).style.display = 'none'
            }
            if (value == 1) {
                document.getElementById(Id).style.display = 'none'
                document.getElementById(`${Id}ok`).style.display = 'flex'
            }
        }
    }
}