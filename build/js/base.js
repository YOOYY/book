var imgUrl = '../imgs/';

$(function(){
    $('.phone-nav').click(function(){
        $(this).children('ul').toggle();
    })
})

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
}