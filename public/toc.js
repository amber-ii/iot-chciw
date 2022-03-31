// MQTT
function onMessageArrived(r_message) {
  var rcMsg = JSON.parse(r_message.payloadString)
  // console.log(rcMsg);
  for (var key in rcMsg) {
    var id = key
    var value = rcMsg[key]
    if (document.getElementById(id)) {
      document.getElementById(id).innerHTML = value + '<span class ="ml-2 text-gray-400 text-sm">' + 'ppb' + '</span>'
      // '<span class ="text-gray-400 bg-red-400 text-sm">' + "ppb" + '</span>'
    }
  }
}

Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() - days)
  return this
}

// 趨勢圖
let chartData = function () {
  return {
    date: 'perMins',
    options: [
      {
        label: 'Last 3 hours',
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
      this.selectedOption = index
      this.date = this.options[index].value
      this.renderChart()
    },
    data: null,
    fetch: function () {
      fetch('http://web.chciw.com.tw:8080/tocs/chart')
        .then((res) => res.json())
        .then((res) => {
          this.data = res.dates
          this.renderChart()
          this.refresh()
        })
    },

    refresh: function () {
      setInterval(() => {
        fetch('http://web.chciw.com.tw:8080/tocs/chart')
          .then((res) => res.json())
          .then((res) => {
            this.data = res.dates
            this.renderChart()
          })
      }, 60000)
    },

    renderChart: function () {
      let c = false
      Chart.helpers.each(Chart.instances, function (instance) {
        //eslint-disable-line
        if (instance.chart.canvas.id == 'chart') {
          c = instance
        }
      })

      if (c) {
        c.destroy()
      }

      let ctx = document.getElementById('chart').getContext('2d')

      let chart = new Chart(ctx, {
        //eslint-disable-line
        type: 'line',
        data: {
          labels: this.data[this.date].data.label,
          datasets: [
            {
              label: 'A25TOC',
              borderColor: 'rgba( 30,144,255, 1)',
              pointBackgroundColor: 'rgba( 255,215,0, 1)',
              data: this.data[this.date].data.A25TOC,
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
              fontSize: 16,
            },
          },

          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  fontSize: 16,
                  callback: function (value, index, array) {
                    return value > 1000 ? (value < 1000000 ? value / 1000 + 'K' : value / 1000000 + 'M') : value
                  },
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  fontSize: 16,
                },
              },
            ],
          },
        },
      })
    },
  }
}

// 兩個日期的間距
const dateDiff = (a, b) => parseInt(Math.abs(new Date(a) - new Date(b)) / 1000 / 60 / 60 / 24)

// 格式化日期
const formatDate = (now) => now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()

// 依照日期搜尋
$('#search').click(async function () {
  $('html, body').animate({ scrollTop: $('#loadingSv').offset().top }, 0)
  $('html, body').animate({ scrollTop: $('#form1').offset().top }, 1000)
  let today = formatDate(new Date()).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2') //eslint-disable-line
  let startDate = dateSearch.startDate.value //eslint-disable-line
  let endDate = dateSearch.endDate.value
  let tocValue = dateSearch.tocValue.value //eslint-disable-line
  let _endDate = new Date(endDate)
  if (!startDate && !endDate) {
    document.querySelector('.loadingSv div').innerHTML = "Searching today's data"
    document.getElementById('startDate').value = today
    document.getElementById('endDate').value = today
  }

  if (startDate < '2021-09-01' && endDate) {
    document.querySelector('.loadingSv div').innerHTML = '資料最早起始日為2021-09-01'
    document.getElementById('startDate').value = '2021-09-01'
    document.getElementById('endDate').value = '2021-09-03'
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
    if (tocValue) {
        document.querySelector('.loadingSv div').innerHTML = 'Searching🟢🟢🟢...'
    }

  if (!tocValue && dateDiff(startDate, endDate) > 3) {
    document.getElementById('startDate').value = formatDate(_endDate.addDays(2)).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2')
    document.querySelector('.loadingSv div').innerHTML = '查詢區間>3，自動幫您調成3天...'
    if (startDate < '2021-09-01' || endDate < '2021-09-01') {
      document.getElementById('startDate').value = '2021-09-01'
      document.getElementById('endDate').value = '2021-09-03'
      document.querySelector('.loadingSv div').innerHTML = '資料最早起始日為2021-09-01'
    }
  }

  $.ajax({
    beforeSend: function () {
        document.querySelector('tbody').innerHTML = ''
        $('.loadingSv').show()
        
    },
    type: 'POST',
    url: '/tocs',

    data: $('#form1').serialize(),
    async: true,
    success: function (data) {
      var renderString = ''
      for (let index = 0; index < data.length; index++) {
        renderString =
          ' <tr class="bg-gray-800 text-md">' +
          '<th class="p-3">' +
          data[index].Date +
          '</th>' +
          '<th class="py-3 px-4">' +
          data[index].A25TOC +
          '</th>' +
          '</tr>'
        $('tbody').nextAll().remove()
        document.querySelector('tbody').insertAdjacentHTML('beforeEnd', renderString)
      }
      $('.loadingSv').fadeOut(500)
    },
    error: function (request) {
      alert('Connection error')
    },
  })
})

function getAll() {
  fetch('http://web.chciw.com.tw:8080/tocs')
    .then(function (response) {
      return response.json()
    })
    .then(function (res) {
      for (let index = 0; index < res.length; index++) {
        renderString =
          '<tr class="bg-gray-800 text-md">' +
          '<th class="p-3">' +
          res[index].Date +
          '</th>' +
          '<th class="py-3 px-4">' +
          res[index].A25TOC +
          '</th>' +
          '</tr>'
        $('tbody').nextAll().remove()
        document.querySelector('tbody').insertAdjacentHTML('beforeEnd', renderString)
      }
    })
}

document.querySelector('#clear').addEventListener('click', function () {
  document.querySelector('tbody').innerHTML = ''
})

// 導出報表
function exportTable() {
  // eslint
  let startDate = form1.startDate.value // eslint-disable-line
  let endDate = form1.endDate.value // eslint-disable-line
  let today = new Date()
  let yesterday = new Date((today / 1000 - 86400) * 1000)

  if (!startDate && !endDate) {
    if (today.getHours() > 7) {
      endDate = formatDate(today)
      startDate = formatDate(new Date((today / 1000 - 518400) * 1000))
    } else {
      endDate = formatDate(yesterday)
      startDate = formatDate(new Date((yesterday / 1000 - 518400) * 1000))
    }
  }
  $('#headerTable').table2excel({
    name: 'Excel Document Name',
    filename: `A25水質檢測[${startDate}]-[${endDate}].xls`,
  })
}
