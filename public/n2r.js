function onMessageArrived(r_message) {
    var rcMsg = JSON.parse(r_message.payloadString)
        // console.log(rcMsg);
    for (var key in rcMsg) {
        var id = key
        var value = rcMsg[key]
        if (document.getElementById(id) && id.includes('F')) {
            document.getElementById(id).innerHTML =
                '<div class="flex items-end">' +
                value +
                '<div class="text-gray-400 text-sm ml-4">' +
                'Nm' +
                '<sup>' +
                '3' +
                '</sup>' +
                '<sub>' +
                '/h' +
                '</sub>' +
                '</div>' +
                '</div>'
        } else if (document.getElementById(id) && id.includes('T')) {
            document.getElementById(id).innerHTML =
                '<div class="flex items-end">' + value + '<div class="text-gray-400 text-sm ml-4">' + 'Nm' + '<sup>' + '3' + '</sup>' + '</div>' + '</div>'
        }
    }
}



// 千分位轉換
Number.prototype.comma_formatter = function() {
    return this.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
}


// 趨勢圖
// eslint-disable-next-line
let chartData = function() {
    return {
        date: 'flow',
        options: [{
                label: '即時流量-5天',
                value: 'flow',
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
            //     label: 'This Year',
            //     value: 'year',
            // },
        ],
        showDropdown: false,
        selectedOption: 0,
        selectOption: function(index) {
            this.selectedOption = index
            this.date = this.options[index].value
            this.renderChart()

        },
        data: null,
        fetch: function() {
            fetch('http://web.chciw.com.tw:8080/n2r/n2rJson')
                .then((res) => res.json())
                .then((res) => {
                    this.data = res.dates
                    this.renderChart()
                    this.refresh()
                })
        },
        refresh: function() {
            setInterval(() => {
                fetch('http://web.chciw.com.tw:8080/n2r/n2rJson')
                    .then((res) => res.json())
                    .then((res) => {
                        this.data = res.dates
                        this.renderChart()
                    })
            }, 600000)
        },
        renderChart: function() {
            let c = false
                // eslint-disable-next-line
            Chart.helpers.each(Chart.instances, function(instance) {
                if (instance.chart.canvas.id == 'chart') {
                    c = instance
                }
            })

            if (c) {
                c.destroy()
            }

            let ctx = document.getElementById('chart').getContext('2d')
                // eslint-disable-next-line
            let chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.data[this.date].data.label,
                    datasets: [{
                            label: 'a3-1',
                            borderColor: 'rgba(102, 126, 234, 1)',
                            pointBackgroundColor: 'rgba(255, 165, 0, 1)',
                            data: this.data[this.date].data.a3t1,
                            borderWidth: 2,
                            radius: 1,
                        },
                        {
                            label: 'a3-2',
                            borderColor: 'rgba(237, 100, 166, 1)',
                            pointBackgroundColor: 'rgba(0, 0, 205, 1)',
                            data: this.data[this.date].data.a3t2,
                            borderWidth: 2,
                            radius: 1,
                        },
                        {
                            label: 'a4-1',
                            borderColor: 'rgba(0,128,0, 1)',
                            pointBackgroundColor: 'rgba(255,0,0, 1)',
                            data: this.data[this.date].data.a4t1,
                            borderWidth: 2,
                            radius: 1,
                        },

                        {
                            label: 'a8-1',
                            borderColor: 'rgba(160, 82, 45, 1)',
                            pointBackgroundColor: 'rgba(0, 255, 0, 1)',
                            data: this.data[this.date].data.a8t1,
                            borderWidth: 2,
                            radius: 1,
                        },
                        {
                            label: 'a16-1',
                            borderColor: 'rgba(147, 112, 219, 1)',
                            pointBackgroundColor: 'rgba(255, 215, 0, 1)',
                            data: this.data[this.date].data.a16t1,
                            borderWidth: 2,
                            radius: 1,
                        },
                        {
                            label: 'a2-1',
                            borderColor: 'rgba(255,140,0, 1)',
                            pointBackgroundColor: 'rgba(0,128,0, 1)',
                            data: this.data[this.date].data.a2t1,
                            borderWidth: 2,
                            radius: 1,
                        },
                    ],
                },
                layout: {
                    padding: {
                        right: 10,
                    },
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
                                display: false,
                            },
                            ticks: {
                                fontSize: 16,
                                // eslint-disable-next-line
                                callback: function(value, index, array) {
                                    return value > 1000 ? (value < 1000000 ? value / 1000 + 'K' : value / 1000000 + 'M') : value
                                },
                            },
                        }, ],
                        xAxes: [{
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                fontSize: 16,
                            },
                        }, ],
                    },
                },
            })
        },
    }

}

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() - days)
    return this
}



// 計算兩日期差異天數
const dateDiff = (a, b) => parseInt(Math.abs(new Date(a) - new Date(b)) / 1000 / 60 / 60 / 24)

// 格式化日期
const formatDate = (now) => now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()

// 依照日期搜尋
$('#search').click(function() {
    $('html, body').animate({ scrollTop: $('#loadingSv').offset().top }, 0)
    $('html, body').animate({ scrollTop: $('#form1').offset().top }, 1000)
    let t2 = document.getElementById('table2')
    let startDate = dateSearch.startDate.value
    let endDate = dateSearch.endDate.value
    let ft = dateSearch.FT.value
    let today = formatDate(new Date()).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2'); //eslint-disable-line
    let yesterday = new Date((new Date() / 1000 - 86400) * 1000)
    let _endDate = new Date(endDate)
    yesterday = formatDate(yesterday).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2') // eslint-disable-line

    if (!startDate && !endDate) {
        document.querySelector('.loadingSv div').innerHTML = "Searching today's data"
        document.getElementById('startDate').value = today
        document.getElementById('endDate').value = today
    }
    if (dateDiff(startDate, endDate) < 7 || dateDiff(startDate, endDate) == 7) {
        document.querySelector('.loadingSv div').innerHTML = 'Searching🟢🟢🟢...'
    }

    if (startDate < '2021-03-05' && endDate) {
        document.querySelector('.loadingSv div').innerHTML = '資料最早起始日為2021-03-05'
        document.getElementById('startDate').value = '2021-03-05'
        document.getElementById('endDate').value = '2021-03-05'
    }

    if (startDate > endDate) {
        //  alert('無效日期，起始日不得大於結束日')
        document.getElementById('startDate').value = ''
        document.getElementById('endDate').value = ''
        return false
    }
    if (startDate > today || endDate > today) {
        document.querySelector('.loadingSv div').innerHTML = "Searching today's data"
        document.getElementById('startDate').value = today
        document.getElementById('endDate').value = today
    }

    // if (dateDiff(startDate, endDate) > 7) {
    //     document.getElementById('startDate').value = formatDate(_endDate.addDays(6)).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2')
    //     document.querySelector('.loadingSv div').innerHTML = '查詢區間自動幫您調成7天...'
    //     if (startDate < '2021-03-05' || endDate < '2021-03-05') {
    //         document.getElementById('startDate').value = '2021-03-05'
    //         document.getElementById('endDate').value = '2021-03-11'
    //         document.querySelector('.loadingSv div').innerHTML = '資料最早起始日為2021-03-05'
    //     }
    // }

    $.ajax({
        beforeSend: function() {


            // if (startDate > endDate) {
            //     alert('無效日期，起始日不得大於結束日')
            //     return false
            // }
            // if (!startDate || !endDate) {
            //     alert('請輸入起始&結束日')
            //     return false
            // }
            // if (dateDiff(startDate, endDate) >= 7) {
            //     alert('搜尋日期區間不要大於7天')
            //     return false
            // }
            // if (startDate < '2021-03-05') {
            //     alert('最早的資料為2021-03-05，請重新搜尋')
            //     return false
            // }
            $('.loadingSv').show()
            t2.innerHTML = ''
            if ((endDate > yesterday && ft == 'T') || (startDate > yesterday && ft == 'T')) {
                alert('日期不得超過昨日，請重新搜尋')
                $('.loadingSv').fadeOut(500)
                return false
            }

            // $('.loading').show()
            // $('.word').show()

        },
        type: 'POST',
        url: '/n2r',
        data: $('#form1').serialize(),
        async: true,
        success: function(data) {
            var renderString = ''
            for (var index = 0; index < data.length; index++) {
                renderString =
                    '<tr class="bg-gray-800">' +
                    '<th class="p-3">' +
                    data[index].Date +
                    '</th>' +
                    '<th>' +
                    data[index].a3t1 +
                    '</th>' +
                    ' <th>' +
                    data[index].a3t2 +
                    '</th>' +
                    ' <th>' +
                    data[index].a4t1 +
                    '</th>' +
                    ' <th>' +
                    data[index].a8t1 +
                    '</th>' +
                    ' <th>' +
                    data[index].a16t1 +
                    '</th>' +
                    ' <th>' +
                    data[index].a2t1 +
                    '</th>' +
                    '</tr>'
                $('#table2').nextAll().remove()
                t2.insertAdjacentHTML('beforeEnd', renderString)
            }

            $('.loadingSv').fadeOut(500)
            exportTable()
                // exportTable()
        },
        error: function(request) {
            alert('資料庫連線失敗，請洽電控組')
        },
    })
})

// 導出報表
// eslint-disable-next-line
function exportTable() {
    // eslint-disable-next-line
    let startDate = form1.startDate.value
        // eslint-disable-next-line
    let endDate = form1.endDate.value
    let today = new Date()
    let yesterday = new Date((today / 1000 - 86400) * 1000)
    if (!startDate && !endDate) {
        endDate = formatDate(yesterday)
        startDate = formatDate(new Date((yesterday / 1000 - 518400) * 1000))
    }
    $('#headerTable').table2excel({
        name: 'Excel Document Name',
        filename: `氮氣報表[${startDate}]-[${endDate}].xls`,
    })
}

// loading畫面倒數3.5秒消失
// setTimeout(() => {
//     $(document).ready(function() {
//         $('.loading').fadeOut(1000);
//         $('.word').fadeOut(500);
//     });
// }, 2500);


document.querySelector('.clear').addEventListener('click', function() {
        document.querySelector('tbody').innerHTML = ''
    })
    // $('.loading').hide()
    // $('.word').hide()