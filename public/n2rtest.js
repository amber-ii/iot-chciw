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
