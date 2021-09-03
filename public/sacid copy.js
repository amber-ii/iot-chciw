function onMessageArrived(r_message) {

    // 聽全部的訊息
    var rcmsg = JSON.parse(r_message.payloadString);
    // console.log(rcmsg);

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
        date: '7days',
        options: [

            {
                label: 'Last 7 Days',
                value: '7days',
            },
            {
                label: 'Last 30 Days',
                value: '30days',
            }
            // {
            //     label: 'Last 6 Months',
            //     value: '6months',
            // },
            // {
            //     label: 'This Year',
            //     value: 'year',
            // },
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
            fetch('http://web.chciw.com.tw:8080/sacid/sacidJson')
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
                    labels: this.data[this.date].data.label,
                    datasets: [
                        {
                            label: "A9每日產能-進6/7號坦克",
                            borderColor: "rgba(102, 126, 234, 1)",
                            pointBackgroundColor: "rgba(102, 126, 234, 1)",
                            data: this.data[this.date].data.A9Diff,
                        },
                        {
                            label: "A10每日產能-進6/7號坦克",
                            borderColor: "rgba(237, 100, 166, 1)",
                            pointBackgroundColor: "rgba(237, 100, 166, 1)",
                            data: this.data[this.date].data.A10Diff1,
                        },
                        {
                            label: "A9A10每日產能-進5/9號坦克",
                            borderColor: "rgba(221,160,221, 1)",
                            pointBackgroundColor: "rgba(221,160,221, 1)",
                            data: this.data[this.date].data.A10Diff4,
                        },
                        {
                            label: "A9+A10總量(進5679號坦克加總)",
                            borderColor: "rgba(147, 112, 219, 1)",
                            pointBackgroundColor: "rgba(147, 112, 219, 1)",
                            data: this.data[this.date].data.total,
                        },
                        {
                            label: "配酸出口流量計",
                            borderColor: "rgba(127, 255, 212, 1)",
                            pointBackgroundColor: "rgba(127, 255, 212, 1)",
                            data: this.data[this.date].data.A10Diff2,
                        },
                        {
                            label: "配酸回流流量計",
                            borderColor: "rgba(218,165,32, 1)",
                            pointBackgroundColor: "rgba(218,165,32, 1)",
                            data: this.data[this.date].data.A10Diff3,
                        },
                        {
                            label: "配酸使用量(配酸回流-配酸出口)",
                            borderColor: "rgba(50,205,50, 1)",
                            pointBackgroundColor: "rgba(50,205,50, 1)",
                            data: this.data[this.date].data.diff32,
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



var t2 = document.getElementById('table2');
$("#search").click(function () {
    $.ajax({
        type: "POST",   //提交的方法
        url: "/sacid", //提交的地址  
        data: $('#form1').serialize(),// 序列化表单值  
        async: false,
        beforeSend: function () {
            t2.innerHTML = "";
        },
        success: function (data) {  //成功
            // let strData = JSON.stringify(data);
            var renderString = "";
            for (let index = 0; index < data.length; index++) {
                renderString =
                    ' <tr class="bg-gray-800 text-md 2xl:text-xl">'
                    + '<th class="p-3 pl-5 2xl:px-7 text-center">'
                    + data[index].Date
                    + '</th>'
                    + '<th class="p-3 px-3 2xl:px-5 text-center">'
                    + data[index].A9Diff
                    + '</th>'
                    + ' <th class="p-3 px-3 2xl:px-5 text-center">'
                    + data[index].A10Diff1
                    + '</th>'
                    + ' <th class="p-3 px-3 2xl:px-5 text-center">'
                    + data[index].A10Diff4
                    + '</th>'
                    + ' <th class="p-3 px-3 2xl:px-5 text-center">'
                    + data[index].total
                    + '</th>'
                    + ' <th class="p-3 px-3 2xl:px-5 text-center">'
                    + data[index].A10Diff2
                    + '</th>'
                    + ' <th class="p-3 px-3 2xl:px-5 text-center">'
                    + data[index].A10Diff3
                    + '</th>'
                    + ' <th class="p-3 px-3 2xl:px-5 text-center">'
                    + data[index].diff32
                    + '</th>'
                    + '</tr>';
                $('#table2').nextAll().remove();
                t2.insertAdjacentHTML('beforeEnd', renderString);
            }
            var table2excel = new Table2Excel();
            table2excel.export(document.querySelector("#headerTable"));
        }, error: function (request) {  //失败的话
            alert("Connection error");
        },
    });
})

// 下載報表
document.getElementById('btnExport').addEventListener('click', function () {
    var table2excel = new Table2Excel();
    table2excel.export(document.querySelector("#headerTable"));
  
})



// function fnExcelReport(event) {
//     var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
//     var textRange; var j = 0;
//     tab = document.getElementById('headerTable'); // id of table

//     for (j = 0; j < tab.rows.length; j++) {
//         tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
//         //tab_text=tab_text+"</tr>";
//     }

//     tab_text = tab_text + "</table>";
//     tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
//     tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
//     tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

//     var ua = window.navigator.userAgent;
//     var msie = ua.indexOf("MSIE ");

//     if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
//     {
//         txtArea1.document.open("txt/html", "replace");
//         txtArea1.document.write(tab_text);
//         txtArea1.document.close();
//         txtArea1.focus();
//         download = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");

//     }
//     else 
//         //other browser not tested on IE 11
//         download = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text))

//         return (download);

// }

