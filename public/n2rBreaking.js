function onMessageArrived(r_message) {
    var rcMsg = JSON.parse(r_message.payloadString)
    // console.log(rcMsg)
    for (var key in rcMsg) {
        var Id = key
        var value = rcMsg[key]
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