jQuery(document).ready(function($) {
    $("#spig").mousedown(function(e) {
        if (e.which == 3) {
        }
    });
    $("#spig").bind("contextmenu",
    function(e) {
        return false;
    });
});

jQuery(document).ready(function($) {
    $("#message").hover(function() {
        $("#message").fadeTo("100", 1);
    });
});

jQuery(document).ready(function($) {
    $(".mumu").mouseover(function() {
        $(".mumu").fadeTo("300", 0.3);
        msgs = ["我隐身了，你看不到我", "我会隐身哦！嘿嘿！", "别动手动脚的，把手拿开！", "把手拿开我才出来！"];
        var i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i]);
    });
    $(".mumu").mouseout(function() {
        $(".mumu").fadeTo("300", 1)
    });
});

jQuery(document).ready(function($) {

    window.setInterval(function() {
        msgs = [$("#hitokoto").text(),weather.c[0], weather.c[1], weather.c[3],weather.c[4]];
        var i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i], 7000);
    },
    35000);
});

jQuery(document).ready(function($) {
    window.setInterval(function() {
        msgs = [$("#hitokoto").text()];
        //if(weather.state)msgs.concat(weather.c);
        var i = Math.floor(Math.random() * msgs.length);
        s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.75];
        var i1 = Math.floor(Math.random() * s.length);
        var i2 = Math.floor(Math.random() * s.length);
        $(".spig").animate({
            left: document.body.offsetWidth / 2 * (1 + s[i1]),
            top: document.body.offsetheight / 2 * (1 + s[i1])
        },
        {
            duration: 2000,
            complete: showMessage(msgs[i])
        });
    },
    45000);
});


var spig_top = 250;
jQuery(document).ready(function($) {
    var f = $(".spig").offset().top;
    $(window).scroll(function() {
        $(".spig").animate({
            top: $(window).scrollTop() + f + 80
        },
        {
            queue: false,
            duration: 1500
        });
    });
});

jQuery(document).ready(function($) {
    var stat_click = 0;
    $(".mumu").click(function() {
        if (!ismove) {
            stat_click++;
            if (stat_click <= 4) {
                msgs = [weather.c[0], weather.c[1],  weather.c[3],weather.c[4]];
            } else if (stat_click > 4) {
                msgs = ["你有完没完呀？", "你已经摸我" + stat_click + "次了", "非礼呀！救命！"];
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            } else {
                msgs = ["筋斗云！~我飞！", "我跑呀跑呀跑！~~", "干嘛动我呀！小心我咬你！"];
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            }
            s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.75];
            var i1 = Math.floor(Math.random() * s.length);
            var i2 = Math.floor(Math.random() * s.length);
            $(".spig").animate({
                left: document.body.offsetWidth / 2 * (1 + s[i1]),
                top: document.body.offsetheight / 2 * (1 + s[i1])
            },
            {
                duration: 500,
                complete: showMessage(msgs[i])
            });
        } else {
            ismove = false;
        }
    });
});


function showMessage(a, b) {
    if (b == null) b = 10000;
    jQuery("#message").hide().stop();
    jQuery("#message").html(a);
    jQuery("#message").fadeIn();
    jQuery("#message").fadeTo("1", 1);
    jQuery("#message").fadeOut(b);
};

var _move = false;
var ismove = false; //移动标记
var _x, _y; //鼠标离控件左上角的相对位置
jQuery(document).ready(function($) {
    $("#spig").mousedown(function(e) {
        _move = true;
        _x = e.pageX - parseInt($("#spig").css("left"));
        _y = e.pageY - parseInt($("#spig").css("top"));
    });
    $(document).mousemove(function(e) {
        if (_move) {
            var x = e.pageX - _x;
            var y = e.pageY - _y;
            var wx = $(window).width() - $('#spig').width();
            var dy = $(document).height() - $('#spig').height();
            if (x >= 0 && x <= wx && y > 0 && y <= dy) {
                $("#spig").css({
                    top: y,
                    left: x
                }); //控件新位置
                ismove = true;
            }
        }
    }).mouseup(function() {
        _move = false;
    });
});

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null;
}
function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString()
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"
}
var weather = Array();
weather.s = false;
jQuery(document).ready(function($) {
    var date = new Date();
    weather.d = "" + date.getFullYear() + date.getMonth() + date.getDay();
    weather.ck = getCookie("weather");
    if (weather.ck == null || weather.d != getCookie("wea_tstamp")) {
        $.ajax({
            dataType: "jsonp",
            success: function(data) {
                if (data.resultcode != 200) {
                    return;
                }
                weather.s = true;
                weather.c = Array();
                weather.c[0] = "今天是" + data.result.today.date_y + "," + data.result.today.week;
                weather.c[1] = data.result.today.city + "今天" + data.result.today.temperature+ data.result.today.weather +data.result.today.dressing_advice;
                weather.c[3] = data.result.today.city + "今天" + data.result.sk.wind_direction  +data.result.sk.wind_strength;
                weather.c[4] = data.result.today.city + "明天" + data.future.temperature+ data.future.weather;
                setCookie("wea_tstamp", weather.d, 1);
                setCookie("weather", encodeURI(weather.c.join(",")), 1);
            },
            type: "GET",
            url: "http://v.juhe.cn/weather/index?format=2&cityname=长沙&key=1ae9a744c5e2c305f0632db8a9d38945"
        });
    } else {
        weather.s = true;
        weather.c = decodeURI(weather.ck).split(",");
    }
});
