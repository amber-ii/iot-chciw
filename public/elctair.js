function onMessageArrived(r_message) {
  // 聽全部的訊息
  var rcMsg = JSON.parse(r_message.payloadString)
  console.log(rcMsg)

  for (var key in rcMsg) {
    var elcId = key
    var elcValue = rcMsg[key]
    if (document.getElementById(elcId) != null) {
      document.getElementById(elcId).innerHTML = elcValue
    }
  }
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
      fetch('http://web.chciw.com.tw:8080/elctairJson')
        .then((res) => res.json())
        .then((res) => {
          this.data = res.dates
          this.renderChart()
        })
    },
    renderChart: function () {
      let c = false
      // eslint-disable-next-line
      Chart.helpers.each(Chart.instances, function (instance) {
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
          datasets: [
            {
              label: 'A22_溫度',
              borderColor: 'rgba( 240,230,140, 1)',
              pointBackgroundColor: 'rgba( 240,230,140, 1)',
              data: this.data[this.date].data.A22,
            },
            {
              label: 'A23_溫度',
              borderColor: 'rgba(237, 100, 166, 1)',
              pointBackgroundColor: 'rgba(237, 100, 166, 1)',
              data: this.data[this.date].data.A23,
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
                    return value > 1000
                      ? value < 1000000
                        ? value / 1000 + 'K'
                        : value / 1000000 + 'M'
                      : value
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
