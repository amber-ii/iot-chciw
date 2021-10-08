// 導出報表
function exportTable() {
    // eslint
    var startDate = form1.startDate.value; // eslint-disable-line
    var endDate = form1.endDate.value; // eslint-disable-line
    var today = new Date();
    var yesterday = new Date((today / 1000 - 86400) * 1000);

    if (!startDate || !endDate) {
        alert('請先搜尋報表');
        return;
    }
    $('#headerTable').table2excel({
        name: 'Excel Document Name',
        filename: `A25_DATA[${startDate}]-[${endDate}].xls`,
    });
}




// loading畫面倒數三秒消失
setTimeout(() => {
    $(document).ready(function () {
        $('.demo').fadeOut(1000);
    });
}, 1000);

// 計算兩日期差異天數
var DateDiff = function (a, b) { // sDate1 和 sDate2 是 2016-06-18 格式
    var oDate1 = new Date(a);
    var oDate2 = new Date(b);
    var iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
    return iDays;
};

function formatDate(now) {
    let date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    return date;
}


// 依照日期搜尋 原檔備份
$('#search').click(function () {
    var t2 = document.getElementById('table2');
    var today = formatDate(new Date()).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2'); // eslint-disable-line
    $.ajax({
        beforeSend: function () {
            var startDate = dateSearch.startDate.value;  // eslint-disable-line
            var endDate = dateSearch.endDate.value;  // eslint-disable-line
            // var a25Schema1 = dateSearch.a25Schema.value;  // eslint-disable-line
            // var a25Schema = $('input:radio:checked').val();
            // switch (a25Schema) {
            // case '1': 
            //     urla = '/a25data/dcs';
            //     break; 
            // case '2':
            //     urla = '/a25data/dcs03';
            //     break;
            // case '3':
            //     urla = '/a25data/dcs03filter';
            //     break;
            // case '4':
            //     urla = '/a25data/plc';
            //     break;
            // }
            // alert($('input:radio:checked').val()+''+urla);

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
            }, 2000);
            t2.innerHTML = '';
        },
        type: 'POST',
        url: '/a25data/dcs',
        data: $('#form1').serialize(), //序列化表單的值
        async: true,
        success: function (data) {
            var renderString = '';
            for (let index = 0; index < data.length; index++) {
                renderString =
                    ' <tr class="bg-gray-800 text-md">'
                   

                    + '</tr>';
                $('#table2').nextAll().remove();
                t2.insertAdjacentHTML('beforeEnd', renderString);
            }

        }, error: function (request) {
            alert('Connection error');
        },
    });
});



// dcs
$('#dcs').click(function () {
    var t2 = document.getElementById('table2');
    var today = formatDate(new Date()).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2'); // eslint-disable-line
    $.ajax({
        beforeSend: function () {
            var startDate = dateSearch.startDate.value;  // eslint-disable-line
            var endDate = dateSearch.endDate.value;  // eslint-disable-line
            if (startDate > endDate) {
                alert('無效日期，起始日不得大於結束日');
                return false;
            }
            if (!startDate || !endDate) {
                alert('請輸入起始&結束日');
                return false;
            }
            // if (DateDiff(startDate, endDate) >= 2) {
            //     alert('日期區間不要超過2天 資料量太大了@@');
            //     return false;
            // }
            if (startDate < '2020-03-03') {
                alert('最早的資料為2020-03-03，請重新搜尋');
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
            }, 4000);
            t2.innerHTML = '';
            document.getElementById('colname').innerHTML = '';
        },
        type: 'POST',
        url: '/a25data/dcs',
        data: $('#form1').serialize(), //序列化表單的值
        async: true,

        success: function (data) {
            var renderString = '';
            for (let index = 0; index < data.length; index++) {
                renderString =
                    ' <tr class="bg-gray-800 text-md">'





                    + '<th class="dateFormate">' + data[index].Date + '</th>'
                    + '<th>' + data[index].BD08102S0101_DT02 + '</th>'
                    + '<th>' + data[index].DI1301_1_PV + '</th>'
                    + '<th>' + data[index].DI1301_2_PV + '</th>'
                    + '<th>' + data[index].DI2501_PV + '</th>'
                    + '<th>' + data[index].DIC2502_MV + '</th>'
                    + '<th>' + data[index].DIC2502_PV + '</th>'
                    + '<th>' + data[index].DIC2502_SV + '</th>'
                    + '<th>' + data[index].FI_GUN1_PV + '</th>'
                    + '<th>' + data[index].FI_GUN2_PV + '</th>'
                    + '<th>' + data[index].FI1301_2_PV + '</th>'
                    + '<th>' + data[index].FI2401_PV + '</th>'
                    + '<th>' + data[index].FI2402_1_PV + '</th>'
                    + '<th>' + data[index].FI2501_PV + '</th>'
                    + '<th>' + data[index].FI3201_PV + '</th>'
                    + '<th>' + data[index].FI3202_PV + '</th>'
                    + '<th>' + data[index].FI3401_PV + '</th>'
                    + '<th>' + data[index].FIC1301_1_MV + '</th>'
                    + '<th>' + data[index].FIC1301_1_PV + '</th>'
                    + '<th>' + data[index].FIC1301_1_SV + '</th>'
                    + '<th>' + data[index].FIC1301_1_VEL_DMVM + '</th>'
                    + '<th>' + data[index].FIC1301_1_VEL_DMVP + '</th>'
                    + '<th>' + data[index].FIC1302_MV + '</th>'
                    + '<th>' + data[index].FIC1302_PV + '</th>'
                    + '<th>' + data[index].FIC1302_SV + '</th>'
                    + '<th>' + data[index].FIC1303_MV + '</th>'
                    + '<th>' + data[index].FIC1303_PV + '</th>'
                    + '<th>' + data[index].FIC1303_SV + '</th>'
                    + '<th>' + data[index].FIC1304_MV + '</th>'
                    + '<th>' + data[index].FIC1304_PV + '</th>'
                    + '<th>' + data[index].FIC1304_SV + '</th>'
                    + '<th>' + data[index].FIC2402_2_MV + '</th>'
                    + '<th>' + data[index].FIC2402_2_PV + '</th>'
                    + '<th>' + data[index].FIC2402_2_SV + '</th>'
                    + '<th>' + data[index].FIC2502_1_MV + '</th>'
                    + '<th>' + data[index].FIC2502_1_SV + '</th>'
                    + '<th>' + data[index].FIC2502_2_MV + '</th>'
                    + '<th>' + data[index].FIC2502_2_SV + '</th>'
                    + '<th>' + data[index].FIC2502_3_MV + '</th>'
                    + '<th>' + data[index].FIC2502_3_PV + '</th>'
                    + '<th>' + data[index].FIC2502_3_SV + '</th>'
                    + '<th>' + data[index].FIC3301_MV + '</th>'
                    + '<th>' + data[index].FIC3301_PV + '</th>'
                    + '<th>' + data[index].FIC3301_SV + '</th>'
                    + '<th>' + data[index].FIC3302_MV + '</th>'
                    + '<th>' + data[index].FIC3302_PV + '</th>'
                    + '<th>' + data[index].FIC3302_SV + '</th>'
                    + '<th>' + data[index].FIC3505_MV + '</th>'
                    + '<th>' + data[index].FIC3505_PV + '</th>'
                    + '<th>' + data[index].FIC3505_SV + '</th>'
                    + '<th>' + data[index].LI1303_PV + '</th>'
                    + '<th>' + data[index].LI4501_PV + '</th>'
                    + '<th>' + data[index].LI4502_PV + '</th>'
                    + '<th>' + data[index].LI4503_PV + '</th>'
                    + '<th>' + data[index].LI4504_PV + '</th>'
                    + '<th>' + data[index].LI4505_PV + '</th>'
                    + '<th>' + data[index].LI4506_PV + '</th>'
                    + '<th>' + data[index].LI4507_PV + '</th>'
                    + '<th>' + data[index].LI4508_PV + '</th>'
                    + '<th>' + data[index].LIC1303_MV + '</th>'
                    + '<th>' + data[index].LIC1303_PV + '</th>'
                    + '<th>' + data[index].LIC1303_SV + '</th>'
                    + '<th>' + data[index].LIC1501_MV + '</th>'
                    + '<th>' + data[index].LIC1501_PV + '</th>'
                    + '<th>' + data[index].LIC1501_SV + '</th>'
                    + '<th>' + data[index].LIC1502_MV + '</th>'
                    + '<th>' + data[index].LIC1502_PV + '</th>'
                    + '<th>' + data[index].LIC1502_SV + '</th>'
                    + '<th>' + data[index].P1101A_FV + '</th>'
                    + '<th>' + data[index].P1101A_MV + '</th>'
                    + '<th>' + data[index].P1101A_SV + '</th>'
                    + '<th>' + data[index].P1101AVFO_SV + '</th>'
                    + '<th>' + data[index].P1101B_FV + '</th>'
                    + '<th>' + data[index].P1101B_MV + '</th>'
                    + '<th>' + data[index].P1101B_SV + '</th>'
                    + '<th>' + data[index].P1101BVFO_SV + '</th>'
                    + '<th>' + data[index].P1102A_FV + '</th>'
                    + '<th>' + data[index].P1102A_MV + '</th>'
                    + '<th>' + data[index].P1102A_SV + '</th>'
                    + '<th>' + data[index].P1102AVFO_SV + '</th>'
                    + '<th>' + data[index].P1102B_FV + '</th>'
                    + '<th>' + data[index].P1102B_MV + '</th>'
                    + '<th>' + data[index].P1102B_SV + '</th>'
                    + '<th>' + data[index].P1102BVFO_SV + '</th>'
                    + '<th>' + data[index].P2101_FV + '</th>'
                    + '<th>' + data[index].P2101_MV + '</th>'
                    + '<th>' + data[index].P2101_SV + '</th>'
                    + '<th>' + data[index].P2101VFO_SV + '</th>'
                    + '<th>' + data[index].P2102_FV + '</th>'
                    + '<th>' + data[index].P2102_MV + '</th>'
                    + '<th>' + data[index].P2102_SV + '</th>'
                    + '<th>' + data[index].P2102VFO_SV + '</th>'
                    + '<th>' + data[index].P2103_FV + '</th>'
                    + '<th>' + data[index].P2103_MV + '</th>'
                    + '<th>' + data[index].P2103_SV + '</th>'
                    + '<th>' + data[index].P2103VFO_SV + '</th>'
                    + '<th>' + data[index].P2104_FV + '</th>'
                    + '<th>' + data[index].P2104_MV + '</th>'
                    + '<th>' + data[index].P2104_SV + '</th>'
                    + '<th>' + data[index].P3101A_MV + '</th>'
                    + '<th>' + data[index].P3101A_PV + '</th>'
                    + '<th>' + data[index].P3101B_MV + '</th>'
                    + '<th>' + data[index].P3101B_PV + '</th>'
                    + '<th>' + data[index].P3102A_MV + '</th>'
                    + '<th>' + data[index].P3102A_PV + '</th>'
                    + '<th>' + data[index].P3102B_MV + '</th>'
                    + '<th>' + data[index].P3102B_PV + '</th>'
                    + '<th>' + data[index].P3103A_MV + '</th>'
                    + '<th>' + data[index].P3103A_PV + '</th>'
                    + '<th>' + data[index].P3103B_MV + '</th>'
                    + '<th>' + data[index].P3103B_PV + '</th>'
                    + '<th>' + data[index].P4101_FV + '</th>'
                    + '<th>' + data[index].P4101_MV + '</th>'
                    + '<th>' + data[index].P4101_SV + '</th>'
                    + '<th>' + data[index].P4101VFO_SV + '</th>'
                    + '<th>' + data[index].P4102_FV + '</th>'
                    + '<th>' + data[index].P4102_MV + '</th>'
                    + '<th>' + data[index].P4102_SV + '</th>'
                    + '<th>' + data[index].P4102VFO_SV + '</th>'
                    + '<th>' + data[index].P4103_FV + '</th>'
                    + '<th>' + data[index].P4103_MV + '</th>'
                    + '<th>' + data[index].P4103_SV + '</th>'
                    + '<th>' + data[index].P4103VFO_SV + '</th>'
                    + '<th>' + data[index].P4104_FV + '</th>'
                    + '<th>' + data[index].P4104_MV + '</th>'
                    + '<th>' + data[index].P4104_SV + '</th>'
                    + '<th>' + data[index].P4104VFO_SV + '</th>'
                    + '<th>' + data[index].P4105_FV + '</th>'
                    + '<th>' + data[index].P4105_MV + '</th>'
                    + '<th>' + data[index].P4105_SV + '</th>'
                    + '<th>' + data[index].P4105VFO_SV + '</th>'
                    + '<th>' + data[index].P4106_FV + '</th>'
                    + '<th>' + data[index].P4106_MV + '</th>'
                    + '<th>' + data[index].P4106_SV + '</th>'
                    + '<th>' + data[index].P4106VFO_SV + '</th>'
                    + '<th>' + data[index].P4107_FV + '</th>'
                    + '<th>' + data[index].P4107_MV + '</th>'
                    + '<th>' + data[index].P4107_SV + '</th>'
                    + '<th>' + data[index].P4107VFO_SV + '</th>'
                    + '<th>' + data[index].P4108_FV + '</th>'
                    + '<th>' + data[index].P4108_MV + '</th>'
                    + '<th>' + data[index].P4108_SV + '</th>'
                    + '<th>' + data[index].P4108VFO_SV + '</th>'
                    + '<th>' + data[index].PI_A01_PV + '</th>'
                    + '<th>' + data[index].PI_A02_PV + '</th>'
                    + '<th>' + data[index].PI_A03_PV + '</th>'
                    + '<th>' + data[index].PI_A04_PV + '</th>'
                    + '<th>' + data[index].PI_A05_PV + '</th>'
                    + '<th>' + data[index].PI_A06_PV + '</th>'
                    + '<th>' + data[index].PI_A07_PV + '</th>'
                    + '<th>' + data[index].PI_A08_PV + '</th>'
                    + '<th>' + data[index].PI1301_1_PV + '</th>'
                    + '<th>' + data[index].PI1301_2_PV + '</th>'
                    + '<th>' + data[index].PI1302_PV + '</th>'
                    + '<th>' + data[index].PI1303_PV + '</th>'
                    + '<th>' + data[index].PI1401_1_PV + '</th>'
                    + '<th>' + data[index].PI1401_2_PV + '</th>'
                    + '<th>' + data[index].PI1401_3_1_PV + '</th>'
                    + '<th>' + data[index].PI1401_3_2_PV + '</th>'
                    + '<th>' + data[index].PI1402_PV + '</th>'
                    + '<th>' + data[index].PI1501_PV + '</th>'
                    + '<th>' + data[index].PI1502_PV + '</th>'
                    + '<th>' + data[index].PI2301_PV + '</th>'
                    + '<th>' + data[index].PI2401_PV + '</th>'
                    + '<th>' + data[index].PI3101_PV + '</th>'
                    + '<th>' + data[index].PI3102_PV + '</th>'
                    + '<th>' + data[index].PI3401_1_PV + '</th>'
                    + '<th>' + data[index].PI4501_PV + '</th>'
                    + '<th>' + data[index].PI4502_PV + '</th>'
                    + '<th>' + data[index].PI4503_PV + '</th>'
                    + '<th>' + data[index].PI4504_PV + '</th>'
                    + '<th>' + data[index].PI4505_PV + '</th>'
                    + '<th>' + data[index].PI4506_PV + '</th>'
                    + '<th>' + data[index].PI4507_PV + '</th>'
                    + '<th>' + data[index].PI4508_PV + '</th>'
                    + '<th>' + data[index].PIC3401_2_MV + '</th>'
                    + '<th>' + data[index].PIC3401_2_PV + '</th>'
                    + '<th>' + data[index].PIC3401_2_SV + '</th>'
                    + '<th>' + data[index].PIC3401_2_VEL_DMVM + '</th>'
                    + '<th>' + data[index].PIC3401_2_VEL_DMVP + '</th>'
                    + '<th>' + data[index].TI1301_1_PV + '</th>'
                    + '<th>' + data[index].TI1301_2_PV + '</th>'
                    + '<th>' + data[index].TI1301_3_PV + '</th>'
                    + '<th>' + data[index].TI1302_2_PV + '</th>'
                    + '<th>' + data[index].TI1302_3_PV + '</th>'
                    + '<th>' + data[index].TI1303_PV + '</th>'
                    + '<th>' + data[index].TI1304_1_PV + '</th>'
                    + '<th>' + data[index].TI1304_2_PV + '</th>'
                    + '<th>' + data[index].TI1304_3_PV + '</th>'
                    + '<th>' + data[index].TI1304_4_PV + '</th>'
                    + '<th>' + data[index].TI1401_1_PV + '</th>'
                    + '<th>' + data[index].TI1401_2_PV + '</th>'
                    + '<th>' + data[index].TI1401_3_PV + '</th>'
                    + '<th>' + data[index].TI1402_1_PV + '</th>'
                    + '<th>' + data[index].TI1402_2_PV + '</th>'
                    + '<th>' + data[index].TI1402_3_PV + '</th>'
                    + '<th>' + data[index].TI1501_PV + '</th>'
                    + '<th>' + data[index].TI1502_PV + '</th>'
                    + '<th>' + data[index].TI2401_1_PV + '</th>'
                    + '<th>' + data[index].TI2401_2_PV + '</th>'
                    + '<th>' + data[index].TI2401_3_PV + '</th>'
                    + '<th>' + data[index].TI2402_1_PV + '</th>'
                    + '<th>' + data[index].TI2402_2_PV + '</th>'
                    + '<th>' + data[index].TI2501_PV + '</th>'
                    + '<th>' + data[index].TI3301_2_PV + '</th>'
                    + '<th>' + data[index].TI3302_2_PV + '</th>'
                    + '<th>' + data[index].TI3401_1_PV + '</th>'
                    + '<th>' + data[index].TI3502_PV + '</th>'
                    + '<th>' + data[index].TI3503_PV + '</th>'
                    + '<th>' + data[index].TI3504_PV + '</th>'
                    + '<th>' + data[index].TIC1302_MV + '</th>'
                    + '<th>' + data[index].TIC1302_PV + '</th>'
                    + '<th>' + data[index].TIC1302_SV + '</th>'
                    + '<th>' + data[index].TIC2502_1_MV + '</th>'
                    + '<th>' + data[index].TIC2502_1_PV + '</th>'
                    + '<th>' + data[index].TIC2502_1_SV + '</th>'
                    + '<th>' + data[index].TIC2502_2_MV + '</th>'
                    + '<th>' + data[index].TIC2502_2_PV + '</th>'
                    + '<th>' + data[index].TIC2502_2_SV + '</th>'
                    + '<th>' + data[index].TIC2502_2_BD_DT01 + '</th>'
                    + '<th>' + data[index].TIC2502_2_BD_DT02 + '</th>'
                    + '<th>' + data[index].TIC2502_2_BD_DT03 + '</th>'
                    + '<th>' + data[index].TIC2502_2_BD_DT04 + '</th>'
                    + '<th>' + data[index].TIC2502_2_BD_DT05 + '</th>'
                    + '<th>' + data[index].TIC2502_2_BD_DT06 + '</th>'
                    + '<th>' + data[index].TIC2502_2_BD_DT07 + '</th>'
                    + '<th>' + data[index].TIC2502_2_CL1_P01 + '</th>'
                    + '<th>' + data[index].TIC2502_2_CL1_P02 + '</th>'
                    + '<th>' + data[index].TIC2502_2_CL1_P03 + '</th>'
                    + '<th>' + data[index].TIC2502_2_CL1_P04 + '</th>'
                    + '<th>' + data[index].TIC2502_2_CL1_P05 + '</th>'
                    + '<th>' + data[index].TIC2502_2_CL1_P06 + '</th>'
                    + '<th>' + data[index].TIC3301_MV + '</th>'
                    + '<th>' + data[index].TIC3301_PV + '</th>'
                    + '<th>' + data[index].TIC3301_SV + '</th>'
                    + '<th>' + data[index].TIC3302_MV + '</th>'
                    + '<th>' + data[index].TIC3302_PV + '</th>'
                    + '<th>' + data[index].TIC3302_SV + '</th>'
                    + '<th>' + data[index].TIC3504_MV + '</th>'
                    + '<th>' + data[index].TIC3504_PV + '</th>'
                    + '<th>' + data[index].TIC3504_SV + '</th>'
                    + '<th>' + data[index].TM00501S0101_PH + '</th>'
                    + '<th>' + data[index].XI1302_PV + '</th>'
                    + '<th>' + data[index].XI1303_PV + '</th>'
                    + '<th>' + data[index].XI1304_PV + '</th>'
                    + '<th>' + data[index].XI2502_PV + '</th>'
                    + '<th>' + data[index].XI3501_PV + '</th>'
                    + '<th>' + data[index].XV1401_1_MV + '</th>'
                    + '<th>' + data[index].XV1401_1_PV + '</th>'
                    + '<th>' + data[index].XV1402_1_MV + '</th>'
                    + '<th>' + data[index].XV1402_2_MV + '</th>'
                    + '<th>' + data[index].XV1402_2_PV + '</th>'
                    + '<th>' + data[index].XV1402_2_CAL_P01 + '</th>'
                    + '<th>' + data[index].XV1402_2_CAL_P02 + '</th>'
                    + '<th>' + data[index].XV1402_3_MV + '</th>'
                    + '<th>' + data[index].XV1501_1_MV + '</th>'
                    + '<th>' + data[index].XV1501_1_PV + '</th>'
                    + '<th>' + data[index].XV1501_3_MV + '</th>'
                    + '<th>' + data[index].XV1501_3_PV + '</th>'
                    + '<th>' + data[index].XV1502_MV + '</th>'
                    + '<th>' + data[index].XV2401_1_MV + '</th>'
                    + '<th>' + data[index].XV2401_2_MV + '</th>'
                    + '<th>' + data[index].XV2401_3_MV + '</th>'
                    + '<th>' + data[index].XV2402_1_MV + '</th>'
                    + '<th>' + data[index].XV2402_1_PV + '</th>'
                    + '<th>' + data[index].XV2402_2_MV + '</th>'
                    + '<th>' + data[index].XV2402_2_PV + '</th>'
                    + '<th>' + data[index].XV2402_3_MV + '</th>'
                    + '<th>' + data[index].XV2402_3_PV + '</th>'
                    + '<th>' + data[index].XV2501_1_MV + '</th>'
                    + '<th>' + data[index].XV2501_2_MV + '</th>'
                    + '<th>' + data[index].XV2501_3_MV + '</th>'
                    + '<th>' + data[index].XV2501_3_PV + '</th>'
                    + '<th>' + data[index].XV2502_MV + '</th>'
                    + '<th>' + data[index].XV3101_1_MV + '</th>'
                    + '<th>' + data[index].XV3102_1_MV + '</th>'
                    + '<th>' + data[index].XV3102_2_MV + '</th>'
                    + '<th>' + data[index].XV3102_3_MV + '</th>'
                    + '<th>' + data[index].XV3401_2_MV + '</th>'
                    + '<th>' + data[index].XV3501_MV + '</th>'
                    + '<th>' + data[index].XV4101_1_MV + '</th>'
                    + '<th>' + data[index].XV4101_1_PV + '</th>'
                    + '<th>' + data[index].XV4101_2_MV + '</th>'
                    + '<th>' + data[index].XV4101_2_PV + '</th>'
                    + '<th>' + data[index].XV4102_1_MV + '</th>'
                    + '<th>' + data[index].XV4102_1_PV + '</th>'
                    + '<th>' + data[index].XV4102_2_MV + '</th>'
                    + '<th>' + data[index].XV4102_2_PV + '</th>'
                    + '<th>' + data[index].XV4103_1_MV + '</th>'
                    + '<th>' + data[index].XV4103_1_PV + '</th>'
                    + '<th>' + data[index].XV4103_2_MV + '</th>'
                    + '<th>' + data[index].XV4103_2_PV + '</th>'
                    + '<th>' + data[index].XV4104_1_MV + '</th>'
                    + '<th>' + data[index].XV4104_1_PV + '</th>'
                    + '<th>' + data[index].XV4104_2_MV + '</th>'
                    + '<th>' + data[index].XV4104_2_PV + '</th>'
                    + '<th>' + data[index].XV4105_1_MV + '</th>'
                    + '<th>' + data[index].XV4105_1_PV + '</th>'
                    + '<th>' + data[index].XV4105_2_MV + '</th>'
                    + '<th>' + data[index].XV4105_2_PV + '</th>'
                    + '<th>' + data[index].XV4106_1_MV + '</th>'
                    + '<th>' + data[index].XV4106_1_PV + '</th>'
                    + '<th>' + data[index].XV4106_2_MV + '</th>'
                    + '<th>' + data[index].XV4106_2_PV + '</th>'
                    + '<th>' + data[index].XV4107_1_MV + '</th>'
                    + '<th>' + data[index].XV4107_1_PV + '</th>'
                    + '<th>' + data[index].XV4107_2_MV + '</th>'
                    + '<th>' + data[index].XV4107_2_PV + '</th>'
                    + '<th>' + data[index].XV4108_1_MV + '</th>'
                    + '<th>' + data[index].XV4108_1_PV + '</th>'
                    + '<th>' + data[index].XV4108_2_MV + '</th>'
                    + '<th>' + data[index].XV4108_2_PV + '</th>'
                    + '<th>' + data[index].XV4501_1_MV + '</th>'
                    + '<th>' + data[index].XV4501_2_MV + '</th>'
                    + '<th>' + data[index].XV4501_3_MV + '</th>'
                    + '<th>' + data[index].XV4502_1_MV + '</th>'
                    + '<th>' + data[index].XV4502_2_MV + '</th>'
                    + '<th>' + data[index].XV4502_3_MV + '</th>'
                    + '<th>' + data[index].XV4503_1_MV + '</th>'
                    + '<th>' + data[index].XV4503_2_MV + '</th>'
                    + '<th>' + data[index].XV4503_3_MV + '</th>'
                    + '<th>' + data[index].XV4504_1_MV + '</th>'
                    + '<th>' + data[index].XV4504_2_MV + '</th>'
                    + '<th>' + data[index].XV4504_3_MV + '</th>'
                    + '<th>' + data[index].XV4505_1_MV + '</th>'
                    + '<th>' + data[index].XV4505_2_MV + '</th>'
                    + '<th>' + data[index].XV4505_3_MV + '</th>'
                    + '<th>' + data[index].XV4506_1_MV + '</th>'
                    + '<th>' + data[index].XV4506_2_MV + '</th>'
                    + '<th>' + data[index].XV4506_3_MV + '</th>'
                    + '<th>' + data[index].XV4507_1_MV + '</th>'
                    + '<th>' + data[index].XV4507_2_MV + '</th>'
                    + '<th>' + data[index].XV4507_3_MV + '</th>'
                    + '<th>' + data[index].XV4508_1_MV + '</th>'
                    + '<th>' + data[index].XV4508_2_MV + '</th>'
                    + '<th>' + data[index].XV4508_3_MV + '</th>'







                    + '</tr>';
                $('#table2').nextAll().remove();
                t2.insertAdjacentHTML('beforeEnd', renderString);
            }
            var renderTableHead = '';
            var headArr = ['Date', 'BD08102S0101_DT02',
                'DI1301_1_PV',
                'DI1301_2_PV',
                'DI2501_PV',
                'DIC2502_MV',
                'DIC2502_PV',
                'DIC2502_SV',
                'FI_GUN1_PV',
                'FI_GUN2_PV',
                'FI1301_2_PV',
                'FI2401_PV',
                'FI2402_1_PV',
                'FI2501_PV',
                'FI3201_PV',
                'FI3202_PV',
                'FI3401_PV',
                'FIC1301_1_MV',
                'FIC1301_1_PV',
                'FIC1301_1_SV',
                'FIC1301_1_VEL_DMVM',
                'FIC1301_1_VEL_DMVP',
                'FIC1302_MV',
                'FIC1302_PV',
                'FIC1302_SV',
                'FIC1303_MV',
                'FIC1303_PV',
                'FIC1303_SV',
                'FIC1304_MV',
                'FIC1304_PV',
                'FIC1304_SV',
                'FIC2402_2_MV',
                'FIC2402_2_PV',
                'FIC2402_2_SV',
                'FIC2502_1_MV',
                'FIC2502_1_SV',
                'FIC2502_2_MV',
                'FIC2502_2_SV',
                'FIC2502_3_MV',
                'FIC2502_3_PV',
                'FIC2502_3_SV',
                'FIC3301_MV',
                'FIC3301_PV',
                'FIC3301_SV',
                'FIC3302_MV',
                'FIC3302_PV',
                'FIC3302_SV',
                'FIC3505_MV',
                'FIC3505_PV',
                'FIC3505_SV',
                'LI1303_PV',
                'LI4501_PV',
                'LI4502_PV',
                'LI4503_PV',
                'LI4504_PV',
                'LI4505_PV',
                'LI4506_PV',
                'LI4507_PV',
                'LI4508_PV',
                'LIC1303_MV',
                'LIC1303_PV',
                'LIC1303_SV',
                'LIC1501_MV',
                'LIC1501_PV',
                'LIC1501_SV',
                'LIC1502_MV',
                'LIC1502_PV',
                'LIC1502_SV',
                'P1101A_FV',
                'P1101A_MV',
                'P1101A_SV',
                'P1101AVFO_SV',
                'P1101B_FV',
                'P1101B_MV',
                'P1101B_SV',
                'P1101BVFO_SV',
                'P1102A_FV',
                'P1102A_MV',
                'P1102A_SV',
                'P1102AVFO_SV',
                'P1102B_FV',
                'P1102B_MV',
                'P1102B_SV',
                'P1102BVFO_SV',
                'P2101_FV',
                'P2101_MV',
                'P2101_SV',
                'P2101VFO_SV',
                'P2102_FV',
                'P2102_MV',
                'P2102_SV',
                'P2102VFO_SV',
                'P2103_FV',
                'P2103_MV',
                'P2103_SV',
                'P2103VFO_SV',
                'P2104_FV',
                'P2104_MV',
                'P2104_SV',
                'P3101A_MV',
                'P3101A_PV',
                'P3101B_MV',
                'P3101B_PV',
                'P3102A_MV',
                'P3102A_PV',
                'P3102B_MV',
                'P3102B_PV',
                'P3103A_MV',
                'P3103A_PV',
                'P3103B_MV',
                'P3103B_PV',
                'P4101_FV',
                'P4101_MV',
                'P4101_SV',
                'P4101VFO_SV',
                'P4102_FV',
                'P4102_MV',
                'P4102_SV',
                'P4102VFO_SV',
                'P4103_FV',
                'P4103_MV',
                'P4103_SV',
                'P4103VFO_SV',
                'P4104_FV',
                'P4104_MV',
                'P4104_SV',
                'P4104VFO_SV',
                'P4105_FV',
                'P4105_MV',
                'P4105_SV',
                'P4105VFO_SV',
                'P4106_FV',
                'P4106_MV',
                'P4106_SV',
                'P4106VFO_SV',
                'P4107_FV',
                'P4107_MV',
                'P4107_SV',
                'P4107VFO_SV',
                'P4108_FV',
                'P4108_MV',
                'P4108_SV',
                'P4108VFO_SV',
                'PI_A01_PV',
                'PI_A02_PV',
                'PI_A03_PV',
                'PI_A04_PV',
                'PI_A05_PV',
                'PI_A06_PV',
                'PI_A07_PV',
                'PI_A08_PV',
                'PI1301_1_PV',
                'PI1301_2_PV',
                'PI1302_PV',
                'PI1303_PV',
                'PI1401_1_PV',
                'PI1401_2_PV',
                'PI1401_3_1_PV',
                'PI1401_3_2_PV',
                'PI1402_PV',
                'PI1501_PV',
                'PI1502_PV',
                'PI2301_PV',
                'PI2401_PV',
                'PI3101_PV',
                'PI3102_PV',
                'PI3401_1_PV',
                'PI4501_PV',
                'PI4502_PV',
                'PI4503_PV',
                'PI4504_PV',
                'PI4505_PV',
                'PI4506_PV',
                'PI4507_PV',
                'PI4508_PV',
                'PIC3401_2_MV',
                'PIC3401_2_PV',
                'PIC3401_2_SV',
                'PIC3401_2_VEL_DMVM',
                'PIC3401_2_VEL_DMVP',
                'TI1301_1_PV',
                'TI1301_2_PV',
                'TI1301_3_PV',
                'TI1302_2_PV',
                'TI1302_3_PV',
                'TI1303_PV',
                'TI1304_1_PV',
                'TI1304_2_PV',
                'TI1304_3_PV',
                'TI1304_4_PV',
                'TI1401_1_PV',
                'TI1401_2_PV',
                'TI1401_3_PV',
                'TI1402_1_PV',
                'TI1402_2_PV',
                'TI1402_3_PV',
                'TI1501_PV',
                'TI1502_PV',
                'TI2401_1_PV',
                'TI2401_2_PV',
                'TI2401_3_PV',
                'TI2402_1_PV',
                'TI2402_2_PV',
                'TI2501_PV',
                'TI3301_2_PV',
                'TI3302_2_PV',
                'TI3401_1_PV',
                'TI3502_PV',
                'TI3503_PV',
                'TI3504_PV',
                'TIC1302_MV',
                'TIC1302_PV',
                'TIC1302_SV',
                'TIC2502_1_MV',
                'TIC2502_1_PV',
                'TIC2502_1_SV',
                'TIC2502_2_MV',
                'TIC2502_2_PV',
                'TIC2502_2_SV',
                'TIC2502_2_BD_DT01',
                'TIC2502_2_BD_DT02',
                'TIC2502_2_BD_DT03',
                'TIC2502_2_BD_DT04',
                'TIC2502_2_BD_DT05',
                'TIC2502_2_BD_DT06',
                'TIC2502_2_BD_DT07',
                'TIC2502_2_CL1_P01',
                'TIC2502_2_CL1_P02',
                'TIC2502_2_CL1_P03',
                'TIC2502_2_CL1_P04',
                'TIC2502_2_CL1_P05',
                'TIC2502_2_CL1_P06',
                'TIC3301_MV',
                'TIC3301_PV',
                'TIC3301_SV',
                'TIC3302_MV',
                'TIC3302_PV',
                'TIC3302_SV',
                'TIC3504_MV',
                'TIC3504_PV',
                'TIC3504_SV',
                'TM00501S0101_PH',
                'XI1302_PV',
                'XI1303_PV',
                'XI1304_PV',
                'XI2502_PV',
                'XI3501_PV',
                'XV1401_1_MV',
                'XV1401_1_PV',
                'XV1402_1_MV',
                'XV1402_2_MV',
                'XV1402_2_PV',
                'XV1402_2_CAL_P01',
                'XV1402_2_CAL_P02',
                'XV1402_3_MV',
                'XV1501_1_MV',
                'XV1501_1_PV',
                'XV1501_3_MV',
                'XV1501_3_PV',
                'XV1502_MV',
                'XV2401_1_MV',
                'XV2401_2_MV',
                'XV2401_3_MV',
                'XV2402_1_MV',
                'XV2402_1_PV',
                'XV2402_2_MV',
                'XV2402_2_PV',
                'XV2402_3_MV',
                'XV2402_3_PV',
                'XV2501_1_MV',
                'XV2501_2_MV',
                'XV2501_3_MV',
                'XV2501_3_PV',
                'XV2502_MV',
                'XV3101_1_MV',
                'XV3102_1_MV',
                'XV3102_2_MV',
                'XV3102_3_MV',
                'XV3401_2_MV',
                'XV3501_MV',
                'XV4101_1_MV',
                'XV4101_1_PV',
                'XV4101_2_MV',
                'XV4101_2_PV',
                'XV4102_1_MV',
                'XV4102_1_PV',
                'XV4102_2_MV',
                'XV4102_2_PV',
                'XV4103_1_MV',
                'XV4103_1_PV',
                'XV4103_2_MV',
                'XV4103_2_PV',
                'XV4104_1_MV',
                'XV4104_1_PV',
                'XV4104_2_MV',
                'XV4104_2_PV',
                'XV4105_1_MV',
                'XV4105_1_PV',
                'XV4105_2_MV',
                'XV4105_2_PV',
                'XV4106_1_MV',
                'XV4106_1_PV',
                'XV4106_2_MV',
                'XV4106_2_PV',
                'XV4107_1_MV',
                'XV4107_1_PV',
                'XV4107_2_MV',
                'XV4107_2_PV',
                'XV4108_1_MV',
                'XV4108_1_PV',
                'XV4108_2_MV',
                'XV4108_2_PV',
                'XV4501_1_MV',
                'XV4501_2_MV',
                'XV4501_3_MV',
                'XV4502_1_MV',
                'XV4502_2_MV',
                'XV4502_3_MV',
                'XV4503_1_MV',
                'XV4503_2_MV',
                'XV4503_3_MV',
                'XV4504_1_MV',
                'XV4504_2_MV',
                'XV4504_3_MV',
                'XV4505_1_MV',
                'XV4505_2_MV',
                'XV4505_3_MV',
                'XV4506_1_MV',
                'XV4506_2_MV',
                'XV4506_3_MV',
                'XV4507_1_MV',
                'XV4507_2_MV',
                'XV4507_3_MV',
                'XV4508_1_MV',
                'XV4508_2_MV',
                'XV4508_3_MV',
            ];
            headArr.forEach(element => {
                renderTableHead +=
                    '<th>'
                    + element
                    + '</th>';
            });
            renderTableHead = '<tr>' + renderTableHead + '</tr>';
            document.getElementById('colname').insertAdjacentHTML('beforeEnd', renderTableHead);

        }, error: function (request) {
            alert('Connection error');
        },
    });
});



// dcs03
$('#dcs03').click(function () {
    var t2 = document.getElementById('table2');
    var today = formatDate(new Date()).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2'); // eslint-disable-line
    $.ajax({
        beforeSend: function () {
            var startDate = dateSearch.startDate.value;  // eslint-disable-line
            var endDate = dateSearch.endDate.value;  // eslint-disable-line
            if (startDate > endDate) {
                alert('無效日期，起始日不得大於結束日');
                return false;
            }
            if (!startDate || !endDate) {
                alert('請輸入起始&結束日');
                return false;
            }
            if (DateDiff(startDate, endDate) >= 2) {
                alert('日期區間不要超過2天 資料量太大了@@');
                return false;
            }
            if (startDate < '2020-09-10') {
                alert('最早的資料為2020-09-10，請重新搜尋');
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
            }, 4000);
            t2.innerHTML = '';
            document.getElementById('colname').innerHTML = '';
        },
        type: 'POST',
        url: '/a25data/dcs03',
        data: $('#form1').serialize(), //序列化表單的值
        async: true,

        success: function (data) {
            var renderString = '';
            for (let index = 0; index < data.length; index++) {
                renderString =
                    ' <tr class="bg-gray-800 text-md">'
                    + '<th class="dateFormate">'
                    + data[index].Date
                    + '</th>'
                    + '<th class="  text-center">'
                    + data[index].A25_3AV301_MV
                    + '</th>'
                    + ' <th class="  text-center">'
                    + data[index].A25_3AV302_MV
                    + '</th>'
                    + ' <th class="  text-center">'
                    + data[index].A25_3AV305_MV
                    + '</th>'
                    + ' <th class="  text-center">'
                    + data[index].A25_3AV306_MV
                    + '</th>'
                    + ' <th class="  text-center">'
                    + data[index].A25_3FI301_PV
                    + '</th>'
                    + '<th class="  text-center">'
                    + data[index].A25_3FI302_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FI303_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FI304_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FI309_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FI401_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FI402_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FI404_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FI408_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FI409_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FIC405_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FIC405_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FIC405_TM_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FIC901_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FIC901_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FIC902_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FIC902_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FIC903_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FIC903_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FIC904_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3FIC904_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P10_FV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P10_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P11_FV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P11_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P12A_FV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P12A_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P12B_FV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P12B_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P14A_FV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P14A_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P14B_FV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P14B_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P3_FV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P3_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P4_FV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P4_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P5_FV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3P5_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PH401_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PH402_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PH403_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PH501_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PI301_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PI401_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PI402_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PI901_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PI910_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PI912_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PI914_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PIC904_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PIC904_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PIC905_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PIC905_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PIC906_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PIC906_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PIC907_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3PIC907_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI301_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI302_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI303_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI305_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI306_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI307_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI401_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI403_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI405_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI406_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI409_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI410_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI411_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI901_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI902_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI903_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI904_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI905_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI906_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI908_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI909_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI910_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI911_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI912_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI913_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI914_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI915_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TI916_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TIC304_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TIC304_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TIC402_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TIC402_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TIC412_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3TIC412_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3V105_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3V105_PV


                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3V108_MV


                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3V108_PV


                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV101_MV


                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV308_MV


                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV308_PV


                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV309_MV


                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV310_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV311_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV311_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV312_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV312_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV313_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV313_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3XV411_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3DIC301_MV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3DIC301_PV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].A25_3DIC301_SV

                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].MQTTproject_A25TOC
                    + '</th>'

                    + '</tr>';
                $('#table2').nextAll().remove();
                t2.insertAdjacentHTML('beforeEnd', renderString);
            }
            var renderTableHead = '';
            var headArr = ['Date', '3AV301_MV',
                '3AV302_MV',
                '3AV305_MV',
                '3AV306_MV',
                '3FI301_PV',
                '3FI302_PV',
                '3FI303_PV',
                '3FI304_PV',
                '3FI309_PV',
                '3FI401_PV',
                '3FI402_PV',
                '3FI404_PV',
                '3FI408_PV',
                '3FI409_PV',
                '3FIC405_MV',
                '3FIC405_PV',
                '3FIC405_TM_PV',
                '3FIC901_MV',
                '3FIC901_PV',
                '3FIC902_MV',
                '3FIC902_PV',
                '3FIC903_MV',
                '3FIC903_PV',
                '3FIC904_MV',
                '3FIC904_PV',
                '3P10_FV',
                '3P10_MV',
                '3P11_FV',
                '3P11_MV',
                '3P12A_FV',
                '3P12A_MV',
                '3P12B_FV',
                '3P12B_MV',
                '3P14A_FV',
                '3P14A_MV',
                '3P14B_FV',
                '3P14B_MV',
                '3P3_FV',
                '3P3_MV',
                '3P4_FV',
                '3P4_MV',
                '3P5_FV',
                '3P5_MV',
                '3PH401_PV',
                '3PH402_PV',
                '3PH403_PV',
                '3PH501_PV',
                '3PI301_PV',
                '3PI401_PV',
                '3PI402_PV',
                '3PI901_PV',
                '3PI910_PV',
                '3PI912_PV',
                '3PI914_PV',
                '3PIC904_MV',
                '3PIC904_PV',
                '3PIC905_MV',
                '3PIC905_PV',
                '3PIC906_MV',
                '3PIC906_PV',
                '3PIC907_MV',
                '3PIC907_PV',
                '3TI301_PV',
                '3TI302_PV',
                '3TI303_PV',
                '3TI305_PV',
                '3TI306_PV',
                '3TI307_PV',
                '3TI401_PV',
                '3TI403_PV',
                '3TI405_PV',
                '3TI406_PV',
                '3TI409_PV',
                '3TI410_PV',
                '3TI411_PV',
                '3TI901_PV',
                '3TI902_PV',
                '3TI903_PV',
                '3TI904_PV',
                '3TI905_PV',
                '3TI906_PV',
                '3TI908_PV',
                '3TI909_PV',
                '3TI910_PV',
                '3TI911_PV',
                '3TI912_PV',
                '3TI913_PV',
                '3TI914_PV',
                '3TI915_PV',
                '3TI916_PV',
                '3TIC304_MV',
                '3TIC304_PV',
                '3TIC402_MV',
                '3TIC402_PV',
                '3TIC412_MV',
                '3TIC412_PV',
                '3V105_MV',
                '3V105_PV',
                '3V108_MV',
                '3V108_PV',
                '3XV101_MV',
                '3XV308_MV',
                '3XV308_PV',
                '3XV309_MV',
                '3XV310_MV',
                '3XV311_MV',
                '3XV311_PV',
                '3XV312_MV',
                '3XV312_PV',
                '3XV313_MV',
                '3XV313_PV',
                '3XV411_MV',
                '3DIC301_MV',
                '3DIC301_PV',
                '3DIC301_SV',
                'MQTTproject_A25TOC',
            ];
            headArr.forEach(element => {
                renderTableHead +=
                    '<th>'
                    + element
                    + '</th>';
            });
            renderTableHead = '<tr>' + renderTableHead + '</tr>';
            document.getElementById('colname').insertAdjacentHTML('beforeEnd', renderTableHead);

        }, error: function (request) {
            alert('Connection error');
        },
    });
});

// filter
$('#dcs03filter').click(function () {
    var t2 = document.getElementById('table2');
    var today = formatDate(new Date()).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2'); // eslint-disable-line
    $.ajax({
        beforeSend: function () {
            var startDate = dateSearch.startDate.value;  // eslint-disable-line
            var endDate = dateSearch.endDate.value;  // eslint-disable-line
            if (startDate > endDate) {
                alert('無效日期，起始日不得大於結束日');
                return false;
            }
            if (!startDate || !endDate) {
                alert('請輸入起始&結束日');
                return false;
            }
            if (DateDiff(startDate, endDate) >= 2) {
                alert('日期區間不要超過2天 資料量太大了@@');
                return false;
            }
            if (startDate < '2021-08-24') {
                alert('最早的資料為2020-08-24，請重新搜尋');
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
            }, 4000);
            t2.innerHTML = '';
            document.getElementById('colname').innerHTML = '';
        },
        type: 'POST',
        url: '/a25data/dcs03filter',
        data: $('#form1').serialize(), //序列化表單的值
        async: true,

        success: function (data) {
            var renderString = '';
            for (let index = 0; index < data.length; index++) {
                renderString =
                    ' <tr class="bg-gray-800 text-md">'
                    + '<th class="dateFormate">'
                    + data[index].Date
                    + '</th>'
                    + '<th class="  text-center">'
                    + data[index].Filter_1XV102F_MV
                    + '</th>'
                    + ' <th class="  text-center">'
                    + data[index].Filter_3P101F_SV
                    + '</th>'
                    + ' <th class="  text-center">'
                    + data[index].Filter_3XV303F_PV
                    + '</th>'
                    + ' <th class="  text-center">'
                    + data[index].Filter_3XV304F_MV
                    + '</th>'
                    + ' <th class="  text-center">'
                    + data[index].Filter_3XV304F_PV
                    + '</th>'
                    + '<th class="  text-center">'
                    + data[index].Filter_3XV305F_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV305F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV308_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV308_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV311_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV311_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV313_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3P102F_FV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV313_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_DI1301_1_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3P102F_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3P102F_SV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI_201F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI201FDV_CPV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI_202F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI202FDV_CPV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI_203F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI203FDV_CPV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_1XV102F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI_204F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI_205F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI205FDV_CPV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI_206F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI206FDV_CPV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI_207F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI207FDV_CPV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI_208F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI_209F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI_210F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3FC301_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI303FDV_CPV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI304FDV_CPV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI305FDV_CPV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI306FDV_CPV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3TI303F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3TI304F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3V105_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3V105_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3V108_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3V108_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3FC301_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV101_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV107F_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV107F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV108F_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV108F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV10AF_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV10AF_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV10BF_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV10BF_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV10CF_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3FC301_SV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV10CF_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV10DF_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV10DF_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV201_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV201_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV202_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV202_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV203_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV203_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV204_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3FI_201F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV204_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV205_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV205_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV206_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV206_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV207_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV207_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV208_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV208_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV209_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3FI_202F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV209_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV210_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV210_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV211_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV211_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV212_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV212_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV213_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV213_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV214_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3P101F_FV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV214_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV215_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV215_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV216_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV216_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV217_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV217_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV218_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV218_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV219_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3P101F_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV219_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV220_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV220_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV221_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV221_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV301F_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV301F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV302F_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV302F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3XV303F_MV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3FI302F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI301F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI302F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI303F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI304F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI305F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI306F_PV
                    + '</th>'
                    + '<th class=" text-center">'
                    + data[index].Filter_3PI307F_PV
                    + '</th>'

                    + '</tr>';
                $('#table2').nextAll().remove();
                t2.insertAdjacentHTML('beforeEnd', renderString);
            }
            var renderTableHead = '';
            var headArr = ['Date', '1XV102F_MV',
                '3P101F_SV',
                '3XV303F_PV',
                '3XV304F_MV',
                '3XV304F_PV',
                '3XV305F_MV',
                '3XV305F_PV',
                '3XV308_MV',
                '3XV308_PV',
                '3XV311_MV',
                '3XV311_PV',
                '3XV313_MV',
                '3P102F_FV',
                '3XV313_PV',
                'DI1301_1_PV',
                '3P102F_MV',
                '3P102F_SV',
                '3PI_201F_PV',
                '3PI201FDV_CPV',
                '3PI_202F_PV',
                '3PI202FDV_CPV',
                '3PI_203F_PV',
                '3PI203FDV_CPV',
                '1XV102F_PV',
                '3PI_204F_PV',
                '3PI_205F_PV',
                '3PI205FDV_CPV',
                '3PI_206F_PV',
                '3PI206FDV_CPV',
                '3PI_207F_PV',
                '3PI207FDV_CPV',
                '3PI_208F_PV',
                '3PI_209F_PV',
                '3PI_210F_PV',
                '3FC301_MV',
                '3PI303FDV_CPV',
                '3PI304FDV_CPV',
                '3PI305FDV_CPV',
                '3PI306FDV_CPV',
                '3TI303F_PV',
                '3TI304F_PV',
                '3V105_MV',
                '3V105_PV',
                '3V108_MV',
                '3V108_PV',
                '3FC301_PV',
                '3XV101_MV',
                '3XV107F_MV',
                '3XV107F_PV',
                '3XV108F_MV',
                '3XV108F_PV',
                '3XV10AF_MV',
                '3XV10AF_PV',
                '3XV10BF_MV',
                '3XV10BF_PV',
                '3XV10CF_MV',
                '3FC301_SV',
                '3XV10CF_PV',
                '3XV10DF_MV',
                '3XV10DF_PV',
                '3XV201_MV',
                '3XV201_PV',
                '3XV202_MV',
                '3XV202_PV',
                '3XV203_MV',
                '3XV203_PV',
                '3XV204_MV',
                '3FI_201F_PV',
                '3XV204_PV',
                '3XV205_MV',
                '3XV205_PV',
                '3XV206_MV',
                '3XV206_PV',
                '3XV207_MV',
                '3XV207_PV',
                '3XV208_MV',
                '3XV208_PV',
                '3XV209_MV',
                '3FI_202F_PV',
                '3XV209_PV',
                '3XV210_MV',
                '3XV210_PV',
                '3XV211_MV',
                '3XV211_PV',
                '3XV212_MV',
                '3XV212_PV',
                '3XV213_MV',
                '3XV213_PV',
                '3XV214_MV',
                '3P101F_FV',
                '3XV214_PV',
                '3XV215_MV',
                '3XV215_PV',
                '3XV216_MV',
                '3XV216_PV',
                '3XV217_MV',
                '3XV217_PV',
                '3XV218_MV',
                '3XV218_PV',
                '3XV219_MV',
                '3P101F_MV',
                '3XV219_PV',
                '3XV220_MV',
                '3XV220_PV',
                '3XV221_MV',
                '3XV221_PV',
                '3XV301F_MV',
                '3XV301F_PV',
                '3XV302F_MV',
                '3XV302F_PV',
                '3XV303F_MV',
                '3FI302F_PV',
                '3PI301F_PV',
                '3PI302F_PV',
                '3PI303F_PV',
                '3PI304F_PV',
                '3PI305F_PV',
                '3PI306F_PV',
                '3PI307F_PV',
            ];
            headArr.forEach(element => {
                renderTableHead +=
                    '<th>'
                    + element
                    + '</th>';
            });
            renderTableHead = '<tr>' + renderTableHead + '</tr>';
            document.getElementById('colname').insertAdjacentHTML('beforeEnd', renderTableHead);

        }, error: function (request) {
            alert('Connection error');
        },
    });
});

// filter
$('#plc').click(function () {
    var t2 = document.getElementById('table2');
    var today = formatDate(new Date()).replace(/(\:|-|\s)(\d)(?=\D|$)/g, '$10$2'); // eslint-disable-line
    $.ajax({
        beforeSend: function () {
            var startDate = dateSearch.startDate.value;  // eslint-disable-line
            var endDate = dateSearch.endDate.value;  // eslint-disable-line
            if (startDate > endDate) {
                alert('無效日期，起始日不得大於結束日');
                return false;
            }
            if (!startDate || !endDate) {
                alert('請輸入起始&結束日');
                return false;
            }
            if (DateDiff(startDate, endDate) >= 2) {
                alert('日期區間不要超過2天 資料量太大了@@');
                return false;
            }
            if (startDate < '2020-03-03') {
                alert('最早的資料為2020-03-03，請重新搜尋');
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
            }, 4000);
            t2.innerHTML = '';
            document.getElementById('colname').innerHTML = '';
        },
        type: 'POST',
        url: '/a25data/plc',
        data: $('#form1').serialize(), //序列化表單的值
        async: true,

        success: function (data) {
            var renderString = '';
            for (let index = 0; index < data.length; index++) {
                renderString =
                    ' <tr class="bg-gray-800 text-md">'
                    + '<th class="dateFormate">'
                    + data[index].Date
                    + '</th>'


                    + '<th>' + data[index].DT_101 + '</th>'
                    + '<th>' + data[index].DT_301 + '</th>'
                    + '<th>' + data[index].FT_101 + '</th>'
                    + '<th>' + data[index].FT_102 + '</th>'
                    + '<th>' + data[index].FT_103 + '</th>'
                    + '<th>' + data[index].FT_201 + '</th>'
                    + '<th>' + data[index].FT_301 + '</th>'
                    + '<th>' + data[index].FT_302 + '</th>'
                    + '<th>' + data[index].FT_401 + '</th>'
                    + '<th>' + data[index].FT_402 + '</th>'
                    + '<th>' + data[index].MP_101_INV + '</th>'
                    + '<th>' + data[index].MP_102_INV + '</th>'
                    + '<th>' + data[index].MP_103_INV + '</th>'
                    + '<th>' + data[index].MP_104_MV + '</th>'
                    + '<th>' + data[index].MP_105_MV + '</th>'
                    + '<th>' + data[index].MP_301_INV + '</th>'
                    + '<th>' + data[index].MP_303_MV + '</th>'
                    + '<th>' + data[index].PIDV_101 + '</th>'
                    + '<th>' + data[index].PIDV_401 + '</th>'
                    + '<th>' + data[index].PT_101 + '</th>'
                    + '<th>' + data[index].PT_102 + '</th>'
                    + '<th>' + data[index].PT_103 + '</th>'
                    + '<th>' + data[index].PT_104 + '</th>'
                    + '<th>' + data[index].PT_201 + '</th>'
                    + '<th>' + data[index].PT_202 + '</th>'
                    + '<th>' + data[index].PT_203 + '</th>'
                    + '<th>' + data[index].PT_204 + '</th>'
                    + '<th>' + data[index].PT_205 + '</th>'
                    + '<th>' + data[index].PT_206 + '</th>'
                    + '<th>' + data[index].PT_207 + '</th>'
                    + '<th>' + data[index].PT_208 + '</th>'
                    + '<th>' + data[index].PT_209 + '</th>'
                    + '<th>' + data[index].PT_210 + '</th>'
                    + '<th>' + data[index].PT_211 + '</th>'
                    + '<th>' + data[index].PT_212 + '</th>'
                    + '<th>' + data[index].PT_301 + '</th>'
                    + '<th>' + data[index].PT_302 + '</th>'
                    + '<th>' + data[index].PT_303 + '</th>'
                    + '<th>' + data[index].PT_401 + '</th>'
                    + '<th>' + data[index].RT_201 + '</th>'
                    + '<th>' + data[index].RT_202 + '</th>'
                    + '<th>' + data[index].RT_203 + '</th>'
                    + '<th>' + data[index].RT_204 + '</th>'
                    + '<th>' + data[index].RT_205 + '</th>'
                    + '<th>' + data[index].TT_101 + '</th>'
                    + '<th>' + data[index].TT_102 + '</th>'
                    + '<th>' + data[index].TT_103 + '</th>'
                    + '<th>' + data[index].TT_104 + '</th>'
                    + '<th>' + data[index].TT_105 + '</th>'
                    + '<th>' + data[index].TT_106 + '</th>'
                    + '<th>' + data[index].TT_107 + '</th>'
                    + '<th>' + data[index].TT_108 + '</th>'
                    + '<th>' + data[index].TT_109 + '</th>'
                    + '<th>' + data[index].TT_110 + '</th>'
                    + '<th>' + data[index].TT_111 + '</th>'
                    + '<th>' + data[index].TT_112 + '</th>'
                    + '<th>' + data[index].TT_113 + '</th>'
                    + '<th>' + data[index].TT_301 + '</th>'
                    + '<th>' + data[index].TT_302 + '</th>'
                    + '<th>' + data[index].TT_401 + '</th>'
                    + '<th>' + data[index].TT_402 + '</th>'



                    + '</tr>';
                $('#table2').nextAll().remove();
                t2.insertAdjacentHTML('beforeEnd', renderString);
            }
            var renderTableHead = '';
            var headArr = ['Date',
                'DT_101',
                'DT_301',
                'FT_101',
                'FT_102',
                'FT_103',
                'FT_201',
                'FT_301',
                'FT_302',
                'FT_401',
                'FT_402',
                'MP_101_INV',
                'MP_102_INV',
                'MP_103_INV',
                'MP_104_MV',
                'MP_105_MV',
                'MP_301_INV',
                'MP_303_MV',
                'PIDV_101',
                'PIDV_401',
                'PT_101',
                'PT_102',
                'PT_103',
                'PT_104',
                'PT_201',
                'PT_202',
                'PT_203',
                'PT_204',
                'PT_205',
                'PT_206',
                'PT_207',
                'PT_208',
                'PT_209',
                'PT_210',
                'PT_211',
                'PT_212',
                'PT_301',
                'PT_302',
                'PT_303',
                'PT_401',
                'RT_201',
                'RT_202',
                'RT_203',
                'RT_204',
                'RT_205',
                'TT_101',
                'TT_102',
                'TT_103',
                'TT_104',
                'TT_105',
                'TT_106',
                'TT_107',
                'TT_108',
                'TT_109',
                'TT_110',
                'TT_111',
                'TT_112',
                'TT_113',
                'TT_301',
                'TT_302',
                'TT_401',
                'TT_402'];
            headArr.forEach(element => {
                renderTableHead +=
                    '<th>'
                    + element
                    + '</th>';
            });
            renderTableHead = '<tr>' + renderTableHead + '</tr>';
            document.getElementById('colname').insertAdjacentHTML('beforeEnd', renderTableHead);

        }, error: function (request) {
            alert('Connection error');
        },
    });
});




