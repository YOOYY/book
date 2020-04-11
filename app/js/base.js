var imgUrl = './imgs/',
    bBtn = true;

$(function () {
    $('.search').click(function () {
        $(this).addClass('active');
        $(this).children('input').focus();
    })
    $('.search input').blur(function () {
        $(this).parent().removeClass('active');
    })
    //navigator.userAgent.indexOf用来判断浏览器类型
    var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
    if (isAndroid) { //如果是安卓手机的浏览器
        var win_h = $(window).height(); //关键代码
        $("body").height(win_h); //关键代码
        window.addEventListener('resize', function () {
            // Document 对象的activeElement 属性返回文档中当前获得焦点的元素。
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                if ($('#footer').is(':visible')) {
                    $('#footer').hide();
                } else {
                    $('#footer').show();
                }
            }
        });
    }
})

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
}

function getlist(el, url, callback) {
    var veiwHeight = document.documentElement.clientHeight;
    var scrollY = $(document).scrollTop();
    var height = el.offset().top + el.height();
    if (height < (veiwHeight + scrollY) && bBtn) {
        bBtn = false;

        $.get(url, function (str) {
            // var json = JSON.parse(str);
            var json = str;

            if (!json.code) {
                bBtn = true;
            }

            callback(json.list);
        });
    }
}

function checkMobile(phoneNum) {
    var reg_phone = /^[1][0-9][0-9]{9}$/;
    var regPhone = new RegExp(reg_phone);
    if (regPhone.test(phoneNum)) {
        return true;
    } else {
        return false;
    }
}