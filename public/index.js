// function showDate() {
//     let date = new Date();
//     let month = date.getMonth() + 1;
//     let day = date.getDate();
//     let h = date.getHours();
//     let m = date.getMinutes();
//     let s = date.getSeconds();
//     document.getElementById('time').innerHTML = `${month}/${day} ${h}:${m}:${s}`
//     setTimeout('showDate()', 1000);
// }


// 引入相同代碼
$(".include").each(function () {
    if (!!$(this).attr("file")) {
        var $includeObj = $(this);
        $(this).load($(this).attr("file"), function (html) {
            $includeObj.after(html).remove();    //載入的檔案內容寫入到當前標籤後面並移除當前標籤
        })
    }
});

function page(id){
    var pageValue = document.getElementById(id).innerHTML;
    console.log(pageValue);
    document.getElementById('pageName').innerHTML = pageValue;
}