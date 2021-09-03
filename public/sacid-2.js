
function onMessageArrived(r_message) {

    // 聽全部的訊息
    var rcmsg = JSON.parse(r_message.payloadString);
    console.log(rcmsg);

    for (var key in rcmsg) {
        var id = key;
        var value = rcmsg[key];
        if (document.getElementById(id) != null) {
            if (id.includes('n')) {
                if (value == 0) {
                    document.getElementById(`${id}timer`).style.animationPlayState = "paused"
                    document.getElementById(id).innerHTML = value

                } else {
                    document.getElementById(`${id}timer`).style.animationPlayState = "running"

                }

            }
            document.getElementById(id).innerHTML = value
        }
    }
}


Number.prototype.comma_formatter = function () {
    return this.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

let chartData = function () {
    return {
        date: 'today',
        options: [
            {
                label: 'Today',
                value: 'today',
            },
            {
                label: 'Last 7 Days',
                value: '7days',
            },
            {
                label: 'Last 30 Days',
                value: '30days',
            },
            {
                label: 'Last 6 Months',
                value: '6months',
            },
            {
                label: 'This Year',
                value: 'year',
            },
        ],
        showDropdown: false,
        selectedOption: 0,
        selectOption: function (index) {
            this.selectedOption = index;
            this.date = this.options[index].value;
            this.renderChart();
        },
        data: null,
        fetch: function () {
            fetch('https://cdn.jsdelivr.net/gh/swindon/fake-api@master/tailwindAlpineJsChartJsEx1.json')
                .then(res => res.json())
                .then(res => {
                    this.data = res.dates;
                    this.renderChart();
                })
        },
        renderChart: function () {
            let c = false;

            Chart.helpers.each(Chart.instances, function (instance) {
                if (instance.chart.canvas.id == 'chart') {
                    c = instance;
                }
            });

            if (c) {
                c.destroy();
            }

            let ctx = document.getElementById('chart').getContext('2d');

            let chart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: this.data[this.date].data.labels,
                    datasets: [
                        {
                            label: "Income",
                            backgroundColor: "rgba(102, 126, 234, 0.25)",
                            borderColor: "rgba(102, 126, 234, 1)",
                            pointBackgroundColor: "rgba(102, 126, 234, 1)",
                            data: this.data[this.date].data.income,
                        },
                        {
                            label: "Expenses",
                            backgroundColor: "rgba(237, 100, 166, 0.25)",
                            borderColor: "rgba(237, 100, 166, 1)",
                            pointBackgroundColor: "rgba(237, 100, 166, 1)",
                            data: this.data[this.date].data.expenses,
                        },
                    ],
                },
                layout: {
                    padding: {
                        right: 10
                    }
                },
                options: {
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                callback: function (value, index, array) {
                                    return value > 1000 ? ((value < 1000000) ? value / 1000 + 'K' : value / 1000000 + 'M') : value;
                                }
                            }
                        }]
                    }
                }
            });
        }
    }
}
















//  $('nav a').on('click', function(e) {                 
//        e.preventDefault();  // 阻止链接跳转
//        var url = this.href;  // 保存点击的地址

//        $('nav a.current').removeClass('current');    
//        $(this).addClass('current');                       

//        $('#container').remove();                          
//        $('#content').load(url + ' #container').fadeIn('slow'); // 加载新内容,url地址与该地址下的选择器之间要有空格,表示该url下的#container
//     });

// $('nav a').on('click', function() { 
//     $('content').load(this.href)
// }


// function send_message(id) {

//     if (connected_flag == 0) {
//         out_msg = "Not Connected so can't send"
//         console.log(out_msg);
//         return false;
//     }
//     var msg = `{"${id}":` + changeState(id) + "}";
//     console.log(msg);
//     message = new Paho.MQTT.Message(msg);
//     message.destinationName = stopic + "Conf";//in arduino
//     mqtt.send(message);
//     return false;
// }



// function changeState(id) {

//     if (id.includes('fc')) {

//         if (document.getElementById(id).getAttribute('class') == "snow") {
//             var fc_result = confirm(`確定要關閉冷氣?`);
//             if (fc_result) {
//                 document.getElementById(id).style.animationPlayState = "paused";
//                 document.getElementById(id).style.color = "gray";
//                 return 0;
//             } else {
//                 return 1;
//             }
//         } else {
//             document.getElementById(id).style.animationPlayState = "running";
//             document.getElementById(id).style.color = "#61DAFB"; //因為會延遲而設置(障眼用)
//             return 1;
//         }

//     } else if (id.includes('wc')) {
//         if (document.getElementById(id).innerHTML == "on") {
//             var wc_result = confirm(`確定要關閉冰水閥?`);
//             if (wc_result) {
//                 document.getElementById(id).innerHTML = "off"
//                 return 0;
//             } else {
//                 return 1;
//             }

//         } else {
//             document.getElementById(id).innerHTML = "on"
//             return 1;
//         }
//     }
// }

