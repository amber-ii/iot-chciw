// MQTT
// eslint-disable-next-line
function onMessageArrived(r_message) {
    var rcMsg = JSON.parse(r_message.payloadString);
    console.log(rcMsg);
    for (var key in rcMsg) {
        var id = key;
        var value = rcMsg[key];
        if (document.getElementById(id) != null) {
            if (id.includes('F')) {
                if (value == 0) {
                    document.getElementById(`${id}timer`).style.animationPlayState = 'paused';
                    document.getElementById(id).innerHTML = value;
                } else {
                    document.getElementById(`${id}timer`).style.animationPlayState = 'running';

                }
            }
            document.getElementById(id).innerHTML = value;
        }
    }
}



// 千分位轉換
Number.prototype.comma_formatter = function () {
    return this.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};



// 趨勢圖
// eslint-disable-next-line
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
            fetch('http://web.chciw.com.tw:8080/n2r/n2rJson') 
                .then(res => res.json())
                .then(res => {
                    this.data = res.dates;
                    this.renderChart();
                });
        },
        renderChart: function () {
            let c = false;
            // eslint-disable-next-line
            Chart.helpers.each(Chart.instances, function (instance) {
                if (instance.chart.canvas.id == 'chart') {
                    c = instance;
                }
            });

            if (c) {
                c.destroy();
            }

            let ctx = document.getElementById('chart').getContext('2d');
            // eslint-disable-next-line
            let chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.data[this.date].data.label,
                    datasets: [
                        {
                            label: 'a3t1',
                            borderColor: 'rgba(102, 126, 234, 1)',
                            pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                            data: this.data[this.date].data.a3t1,
                        },
                        {
                            label: 'a3t2',
                            borderColor: 'rgba(237, 100, 166, 1)',
                            pointBackgroundColor: 'rgba(237, 100, 166, 1)',
                            data: this.data[this.date].data.a3t2,
                        },
                        {
                            label: 'a4t1',
                            borderColor: 'rgba(0,128,0, 1)',
                            pointBackgroundColor: 'rgba(0,128,0, 1)',
                            data: this.data[this.date].data.a4t1,
                        },
                        {
                            label: 'a8t1',
                            borderColor: 'rgba(160, 82, 45, 1)',
                            pointBackgroundColor: 'rgba(160, 82, 45, 1)',
                            data: this.data[this.date].data.a8t1,
                        },
                        {
                            label: 'a16t1',
                            borderColor: 'rgba(147, 112, 219, 1)',
                            pointBackgroundColor: 'rgba(147, 112, 219, 1)',
                            data: this.data[this.date].data.a16t1,
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
                            fontSize: 18,
                        },
                    },

                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                fontSize: 16,
                                // eslint-disable-next-line
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
var DateDiff = function (a, b) {
    var oDate1 = new Date(a);
    var oDate2 = new Date(b);
    var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
    return iDays;
};



// 依照日期搜尋
$('#search').click(function () {
    var t2 = document.getElementById('table2');
    var now = new Date();
    now = new Date((now / 1000 - 86400) * 1000);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    // eslint-disable-next-line
    var today = (year + '-' + month + '-' + date).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2');

    $.ajax({
        beforeSend: function () {
            // eslint-disable-next-line
            var startDate = dateSearch.startDate.value;
            // eslint-disable-next-line
            var endDate = dateSearch.endDate.value;
            console.log(startDate);

            if (startDate > endDate) {
                alert('無效日期，起始日不得大於結束日');
                return false;
            }
            if (startDate == '' || endDate == '') {
                alert('請輸入起始&結束日');
                return false;
            }
            if (DateDiff(startDate, endDate) >= 360) {
                alert('搜尋日期區間360天');
                return false;
            }
            if (startDate < '2021-03-05') {
                alert('最早的資料為2021-03-05，請重新搜尋');
                return false;
            } if (endDate > today || startDate > today) {
                alert('日期不得超過昨日，請重新搜尋');
                return false;
            }

            $('.demo').show();
            setTimeout(() => {
                $(document).ready(function () {
                    $('.demo').fadeOut();
                });
            }, 2000);
            t2.innerHTML = '';
        },
        type: 'POST',
        url: '/n2r',
        data: $('#form1').serialize(),
        async: true,
        success: function (data) {
            var renderString = '';
            for (let index = 0; index < data.length; index++) {
                renderString =
                    ' <tr class="bg-gray-800 text-md 2xl:text-xl">'
                    + '<th class="p-3 text-center">'
                    + data[index].Date
                    + '</th>'
                    + '<th class="p-3 text-center">'
                    + data[index].a3t1
                    + '</th>'
                    + ' <th class="p-3  text-center">'
                    + data[index].a3t2
                    + '</th>'
                    + ' <th class="p-3  text-center">'
                    + data[index].a4t1
                    + '</th>'
                    + ' <th class="p-3  text-center">'
                    + data[index].a8t1
                    + '</th>'
                    + ' <th class="p-3  text-center">'
                    + data[index].a16t1
                    + '</th>'
                    + '</tr>';
                $('#table2').nextAll().remove();
                t2.insertAdjacentHTML('beforeEnd', renderString);
            }
            // eslint-disable-next-line
        }, error: function (request) {
            alert('Connection error');
        },
    });
});



// 導出報表
// eslint-disable-next-line
function exportTable() {
    // eslint-disable-next-line
    var startDate = form1.startDate.value;
    // eslint-disable-next-line
    var endDate = form1.endDate.value;
    console.log(startDate, endDate);
    var now = new Date();
    if (startDate == '' && endDate == '') {
        now = new Date((now / 1000 - 86400) * 1000);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var today = year + '-' + month + '-' + date;
        var day7 = new Date((now / 1000 - 518400) * 1000);
        var year7 = day7.getFullYear();
        var month7 = day7.getMonth() + 1;
        var date7 = day7.getDate();
        var last7 = year7 + '-' + month7 + '-' + date7;
        endDate = today;
        startDate = last7;
    }
    $('#headerTable').table2excel({
        name: 'Excel Document Name',
        filename: `氮氣報表[${startDate}]-[${endDate}].xls`,
    });
}



// loading畫面倒數3.5秒消失
setTimeout(() => {
    $(document).ready(function () {
        $('.demo').fadeOut();
    });
}, 3500);




// todo del
// 下載報表
// document.getElementById('btnExport').addEventListener('click', function () {
//     var table2excel = new Table2Excel();
//     table2excel.export(document.querySelector('#headerTable'));

// })