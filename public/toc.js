// MQTT
function onMessageArrived(r_message) {
    var rcMsg = JSON.parse(r_message.payloadString);
    console.log(rcMsg);
    for (var key in rcMsg) {
        var id = key;
        var value = rcMsg[key];
        if (document.getElementById(id) != null) {
            document.getElementById(id).innerHTML = value;
        }
    }
}



// 千分位轉換
// Number.prototype.comma_formatter = function () {
//     return this.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
// }



// 趨勢圖
let chartData = function () {
    return {
        date: 'perMins',
        options: [
            {
                label: 'per Minutes',
                value: 'perMins',
            },
            {
                label: 'Last 24 Hours',
                value: '24hours',
            },
            {
                label: 'Last 7 Days',
                value: '7days',
            },
            {
                label: 'Last 30 Days',
                value: '30days',
            },


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
            fetch('http://web.chciw.com.tw:8080/toc/tocJson')
                .then(res => res.json())
                .then(res => {
                    this.data = res.dates;
                    this.renderChart();
                    this.refresh();
                });
        },

        refresh: function () {
            setInterval(() => {
                fetch('http://web.chciw.com.tw:8080/toc/tocJson')
                    .then(res => res.json())
                    .then(res => {
                        this.data = res.dates;
                        this.renderChart();
                    });
            }, 60000);
        },


        renderChart: function () {
            let c = false;
            Chart.helpers.each(Chart.instances, function (instance) { //eslint-disable-line
                if (instance.chart.canvas.id == 'chart') {
                    c = instance;
                }
            });

            if (c) {
                c.destroy();
            }

            let ctx = document.getElementById('chart').getContext('2d');

            let chart = new Chart(ctx, { //eslint-disable-line
                type: 'line',
                data: {
                    labels: this.data[this.date].data.label,
                    datasets: [
                        {
                            label: 'A25TOC',
                            borderColor: 'rgba( 240,230,140, 1)',
                            pointBackgroundColor: 'rgba( 240,230,140, 1)',
                            data: this.data[this.date].data.A25TOC,
                        },

                    ],
                },
                layout: {
                    padding: {
                        right: 10
                    }
                },
                options: {
                    legend: {
                        display: true,
                        labels: {
                            // 點選的標題大小
                            fontSize: 16,
                        },
                    },

                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                fontSize: 16,
                                callback: function (value, index, array) {
                                    return value > 1000 ? ((value < 1000000) ? value / 1000 + 'K' : value / 1000000 + 'M') : value;
                                }
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                fontSize: 16,

                            }
                        }]
                    }
                }
            });
        }
    };
};



// 計算兩日期差異天數
var DateDiff = function (a, b) { // sDate1 和 sDate2 是 2016-06-18 格式
    var oDate1 = new Date(a);
    var oDate2 = new Date(b);
    var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
    return iDays;
};

// 格式化日期
var formatDate = function (now) {
    var date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    return date;
};



// 依照日期搜尋
$('#search').click(function () {

    var t2 = document.getElementById('table2');
    var today = formatDate(new Date()).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2'); //eslint-disable-line



    $.ajax({
        beforeSend: function () {
            var startDate = dateSearch.startDate.value; //eslint-disable-line
            var endDate = dateSearch.endDate.value; //eslint-disable-line

            if (startDate > endDate) {
                alert('無效日期，起始日不得大於結束日');
                return false;
            }
            if (!startDate || !endDate) {
                alert('請輸入起始&結束日');
                return false;
            }
            if (DateDiff(startDate, endDate) >= 360) {
                alert('搜尋日期區間360天');
                return false;
            }
            if (startDate < '2020-11-11') {
                alert('最早的資料為2020-11-11，請重新搜尋');
                return false;
            } if (endDate > today || startDate > today) {
                alert('日期不得超過今日，請重新搜尋');
                return false;
            }
            // 搜尋click倒數兩秒
            $('.demo').show();
            setTimeout(() => {
                $(document).ready(function () {
                    $('.demo').fadeOut();
                });
            }, 1500);
            t2.innerHTML = '';
        },
        type: 'POST',
        url: '/toc',
        data: $('#form1').serialize(), //序列化表單的值
        async: true,
        success: function (data) {

            var renderString = '';
            for (let index = 0; index < data.length; index++) {
                renderString =
                    ' <tr class="bg-gray-800 text-md 2xl:text-xl">'
                    + '<th class="p-3 text-center">'
                    + data[index].Date
                    + '</th>'
                    + '<th class="p-3  text-center">'
                    + data[index].A25TOC
                    + '</th>'
                    + '</tr>';
                $('#table2').nextAll().remove();
                t2.insertAdjacentHTML('beforeEnd', renderString);
            }

        }, error: function (request) {
            alert('Connection error');
        },
    });
});



// 導出報表
function exportTable() {
    // eslint
    var startDate = form1.startDate.value; // eslint-disable-line
    var endDate = form1.endDate.value; // eslint-disable-line
    var today = new Date();
    var yesterday = new Date((today / 1000 - 86400) * 1000);

    if (!startDate && !endDate) {
        if (today.getHours() > 7) {
            endDate = formatDate(today);
            startDate = formatDate(new Date((today / 1000 - 518400) * 1000));
        } else {
            endDate = formatDate(yesterday);
            startDate = formatDate(new Date((yesterday / 1000 - 518400) * 1000));
        }
    }
    $('#headerTable').table2excel({
        name: 'Excel Document Name',
        filename: `A25水質檢測[${startDate}]-[${endDate}].xls`,
    });
}



// loading畫面倒數三秒消失
setTimeout(() => {
    $(document).ready(function () {
        $('.demo').fadeOut(1000);
    });
}, 3000);





// todo del
// JS寫法，導出報表
// document.getElementById('btnExport').addEventListener('click', function () {
//     var table2excel = new Table2Excel();
//     var ex = table2excel.export(document.querySelector("#headerTable"));
//     ex.table2excel({

//     })
// })
