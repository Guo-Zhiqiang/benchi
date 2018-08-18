var userAgent = navigator.userAgent;
var ifSafari = (userAgent.indexOf("Safari") > -1) && (userAgent.indexOf("Chrome") < 0);

var music_player = new Audio();
var au = music_player;

setTimeout("play_music()", 100);

/**/
function play_music() {
    music_player.src = 'img/music.mp3';
    music_player.loop = 'loop';
    music_player.play();
    $('#sound').addClass("play");
    $(".play .s").show();
}

/*开关音频*/
function switchsound() {
    //au = music_player;
    if (au.paused) {
        au.play();
        $('#sound').addClass("play");
    } else {
        $('#sound').removeClass("play");
        au.pause();
    }
}

var ChooseColor = null; //选择的颜色

$(function() {
    $(".firstSecond .imgBgWarp").width($(".firstSecond").width())
    $(window).resize(function() {
        $(".firstSecond .imgBgWarp").width($(".firstSecond").width())
    })
    page_add();
    var flag = 0;
    var numberIndex = 0;
    var fistenter = false; //判断是否是第一次进入
    var moveOff = true; //判断是否做了选择
    function page_add() {
        $(".box").fullpage({
            "controlArrows": false,
            onLeave: function(index, nextIndex, direction) {
                $(".box").find(".page").eq(index - 1).trigger("onLeave", index);
            },
            afterRender: function() {
                $.fn.fullpage.setAllowScrolling(false);
            },
            afterLoad: function(anchorLink, index) {
                //console.log(anchorLink + '=========' + index);
                numberIndex = index;
                if (index == 1) {
                    $("#myPointer").hide();
                }
                // $(".page_8 .car").removeClass('flyCar1');
                // $(".page_9 .red .car").removeClass('flyCar2');
                // if(index==10){
                // 	$(".page_8 .car").addClass('flyCar1');
                // }else if(index==6){
                // 	$(".page_9 .red .car").addClass('flyCar2');
                // }

                var _activeAtr = $('.page.active').attr('hasback');

                console.log(_activeAtr);
                console.log(ChooseColor);

                if (_activeAtr == 'page_old_8' || (_activeAtr == 'page_new_9' && ChooseColor == 'red')) {
                    $('.logoBox').css('display', 'block')
                } else {
                    $('.logoBox').css('display', 'none')
                }



                if (numberIndex != (index - 1)) {
                    $(".box").find(".page").eq(index - 1).trigger("onLoad", index)
                }
            }

        });


        $(".page").on("onLeave", function(event, index) {
            var obj = $(".box").find(".page").eq(index - 1);
            var current = obj.attr("altr")
            obj.addClass(current + "_leave").removeClass(current + "_load");
            if ($('.page_1').hasClass('page_1_leave')) {
                $('.page_1').removeClass('page_1_load_1 page_1_load_2 page_1_load_11 page_1_load_22');
            }

            if (index == 1) {
                InitFirst();
            }
            return false;
        })
        $(".page").on("onLoad", function(event, index) {
            if (index == 1) {
                $(".main").removeClass('mainRed');
                $('.gray').show();
                $('.red').show();
                //setAudio();
                $.fn.fullpage.setAllowScrolling(false);
                for (var i = 1; i <= 4; i++) {
                    $(".yichu>.page").eq(0).appendTo($(".box"))
                }
            }
            if (fistenter) {
                $(".firstSecond").removeClass('firstSecondfirst').addClass("firstSecondTwo");
            }
            var obj = $(".box").find(".page").eq(index - 1);
            var current = obj.attr("altr")
            obj.addClass(current + "_load").removeClass(current + "_leave");
            var isHasClass = $('.page_1').hasClass('page_1_load');
            // if(isHasClass){
            // 	var rightWidth = $(".rightRed").css('width');
            // 	rightWidth = parseInt(rightWidth);
            // 	console.log(rightWidth)
            // 	if(rightWidth==0){
            // 		$(".page_1").addClass('page_1_load_11');
            // 	}else if(rightWidth>960){
            // 		$(".page_1").addClass('page_1_load_22');

            // 	}
            // };
        })
        $(".box").find(".page").eq(0).trigger("onLoad", 1);

    }

    var moveObject = $(".rightRed");
    var moveObjectW = 0;
    var downX = 0;
    var distance = 0;
    $('.moveBox').mousedown(function(e) {
        downX = e.pageX;
        moveObjectW = moveObject.width();
        if (moveOff) {
            $(this).bind('mousemove', dragElement);
        }

    });

    function dragElement(event) {
        distance = event.pageX - downX;
        if (distance > 0) {
            moveObject.css({
                width: moveObjectW - Math.abs(distance)
            })
        } else if (distance < 0) {
            moveObject.css({
                width: moveObjectW + Math.abs(distance)
            })
        }
        return false;
    }

    $(document).mouseup(function() {
        var number = Math.abs(distance) / (moveObject.width() / 2) * 100;
        if (distance > 0) {
            ChooseColor = 'grey';
            moveDonghuan("0%", "50%", "grey");
        } else if (distance < 0) {
            ChooseColor = 'red';
            moveDonghuan("100%", "50%", "red");
        }

        function moveDonghuan(str1, str2, ROFB) {
            if (number > 50) {
                moveObject.animate({
                    width: str1
                }, function() {
                    $(".index_bg").remove();
                    fistenter = true;
                    if (ROFB == "red") {
                        $(".firstSecond .leftGrey img").css('opacity', 0);
                        $(".page_1").addClass('page_1_load_1');
                        $.fn.fullpage.setAllowScrolling(true);
                        $('.gray').hide();
                        $('.jiaotou').hide();
                        $(".main").addClass('mainRed');
                        $(".play .s").show();
                        $("#sound").addClass('play');
                        //$("#audio").attr('src','img/music_new.mp3');
                        music_player.src = 'img/music_new.mp3';
                        $(".firstSecond .moveBox").css("cursor", 'auto');
                        $("#myPointer").show();
                        for (var i = 1; i <= 4; i++) {
                            $(".box>.page").eq(6).appendTo($(".yichu"))
                        }


                    } else if (ROFB == "grey") {
                        $(".firstSecond .leftGrey img").css('opacity', 0);
                        $(".page_1").addClass('page_1_load_2');
                        $.fn.fullpage.setAllowScrolling(true);
                        $('.red').hide();
                        $(".jiaotou").hide();
                        $(".main").removeClass('mainRed');
                        $("#myPointer").show();
                        $(".firstSecond .moveBox").css("cursor", 'auto');
                        music_player.src = 'img/music.mp3';
                        //$("#audio").attr('src','img/music3.mp3');
                    }

                    switchsound();
                    $('#sound').show();

                    moveObjectW = 0;
                    downX = 0;
                    distance = 0;
                    moveOff = false;
                })
            } else {
                moveObject.animate({
                    width: str2
                }, function() {})
            }
        }
        $('.moveBox').unbind('mousemove');
    });


    function InitFirst() {
        $(".firstSecond .leftGrey img").css('opacity', 1);
        $(".page_1").removeClass('page_1_load_2');
        $.fn.fullpage.setAllowScrolling(true);
        $(".jiaotou").show();
        $(".rightRed").width("50%");
        moveOff = true;
    }

    //点击 智  初始化  车辆选择
    function setCar() {
        $('.index_bg').css('display', 'none');
        $('.firstSecond').addClass('firstSecond1');
    }



    window.page_add = page_add;

    $('.right_btn .btn3').on('click', function() {

        ChooseColor = null; //选择的颜色
        $('.logoBox').css('display', 'none');

        // console.log(numberIndex)
        if (numberIndex == 0) {
            return false;
        }
        //setAudio();
        if (numberIndex > 1) {
            InitFirst();
            $.fn.fullpage.moveTo(1, 0);
        }
        music_player.src = 'img/music.mp3';
        music_player.play();
        // au.pause();
        // $('#sound').hide();

    })

    $('.right_btn .btn1').on('click', function() {
        _smq.push(['custom', '返回首页', "返回首页"]);
        _hmt.push(['_trackEvent', "返回首页", 'click', '返回首页']);
    })


    $('.right_btn .btn4').on('click', function() {
        _smq.push(['custom', '观看VR', "观看VR"]);
        _hmt.push(['_trackEvent', "观看VR", 'click', '观看VR']);
    })


    function setAudio() {
        //判断是否Safari浏览器
        if (!ifSafari) {
            $('#audio').get(0).pause();
        }
        $(".play .s").hide();
    }

    // function setAudio(){
    // 	audio.pause();
    // 	$(".play .s").hide();
    // }
    var audioFlag = false; //判断当前音频是否打开
    $(".page .btn,.page .btn2,.newVideo a,.newVideo2 a").on("click", function() {

        //如果音频开启
        if (!au.paused) {
            au.pause();
            audioFlag = true;
        }

        var text_str = $(this).attr("text_str");
        _smq.push(['custom', text_str, "click", "视频按钮"]);
        _hmt.push(['_trackEvent', text_str, 'click', '视频按钮']);

        $(".video").fadeIn();
        if ($(this).attr("address") == '') {
            $(".voide_warp").show();
            $(".video_box").hide();
        } else {
            $(".video .video_box video").attr("src", $(this).attr("address"));
            $(".video_box").show();
            $(".voide_warp").hide();
        }
    })
    $(".newVideo a,.newVideo2 a").on("click", function() {
        $(".mask2").fadeIn();
    })
    $(".newVideo .close").on("click", function() {
        $(".newVideo,.mask_v").fadeOut();
    })
    $(".newVideo2 .close").on("click", function() {
        $(".newVideo2").fadeOut();
    })
    $(".mask2").on("click", function() {
        $(".video,.mask2").fadeOut();
    })
    $(".video .close").on("click", function() {
        $(".video,.mask2").fadeOut();
        $(".video .video_box video").attr("src", "");
        // audio.play();
        /*if (!ifSafari) {
        $('#audio').get(0).play();
    } */

        //如果音频曾经开启过
        if (!!audioFlag) {
            au.play();
            audioFlag = false;
        }

    })
    // 声音按钮
    $("#sound").click(function() {
        switchsound();
    });

    // 表单
    $("#form_btn,#form_btn_red,.right_btn .btn2").on("click", function() {
        $(".mask").show();
        $(".form").show();
    })

    $(".form .close").on("click", function() {
        $(".mask").hide();
        $(".form").hide();
        $(".yinshi").hide();
    })


    // 价格
    $("#price_obj,#price_obj_red,#carsPrice, #rightPrice").on("click", function() {
        $(".mask").show();
        $(".price").show();
    })


    $(".price .close").on("click", function() {
        $(".mask").hide();
        $(".price").hide();
    })


    $("#online_car,#online_car_red, #rightNavOnline").on("click", function() {
        $(".mask").show();
        $(".online_car_tip").show();
    })

    // $("#online_car,#online_car_red").on("click",function(){
    // 	$(".mask").show();
    // 	$(".online_car_tip").show();
    // })


    $(".online_car_tip .close").on("click", function() {
        $(".mask").hide();
        $(".online_car_tip").hide();
    })


    //视频按钮

    $("#allVideos").on("click", function() {
        //$(".newVideo2").hide();
        $(".newVideo").show();
        $(".mask_v").show();
        $(".newVideo .bgCar").show();
    })

    $(".price .close").on("click", function() {
        $(".mask").hide();
        $(".price").hide();
    })
    //下面的四个视频

    $("#shiping, #shiping_red").on("click", function() {
        $(".newVideo").show();
        $(".newVideo .bgCar").show();
        $(".mask_v").show();

        //$(".newVideo2").show();
    })

    $("#weibo").on("click", function() {
        share("weibo")
    })

    function share(type) {
        var content = "设计的智能,令几何多光束LED大灯的84颗独立光源,依环境动态调节光线;驾驶的智能,让智能领航在200km/h时速内,自动跟车行驶; 互联的智能,将Mercedes me提供的海量资讯与贴心服务,实时推送,随需而用;全新梅赛德斯-奔驰长轴距E级车,以智能杰作致敬 社会中坚力量。";
        var url = window.location.href;
        var pic = "http://special.mercedes-benz.com.cn/thenewe-classlaunch/pc/img/webo_pic.jpg";
        var appkey = "";

        if (type == "weibo") {
            window.open('http://v.t.sina.com.cn/share/share.php?title=' + encodeURIComponent(content) + '&url=' + encodeURIComponent(url) + '&pic=' + pic + "&appkey=" + appkey, '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
            void(0);
        }
        if (type == "dou") {
            window.open('http://www.douban.com/recommend/?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(content) + '&image=' + pic, '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
            void(0);
        }
        if (type == "weixin") {
            $("#weixin").fadeIn();
        }
    }



    $.get('js/data.xml', function(data) {
        resetData(data);
    });

    Array.prototype.unique = function() {
        var n = []; //一个新的临时数组
        for (var i = 0; i < this.length; i++) //遍历当前数组
        {
            //如果当前数组的第i已经保存进了临时数组，那么跳过，
            //否则把当前项push到临时数组里面
            if (n.indexOf(this[i]) == -1) n.push(this[i]);
        }
        return n;
    }

    var cityData = [];

    //省份切换
    $('select[name=dealerprovince]').on('change', function() {
        if (cityData.length == 0) {
            alert('数据未加载');
            return;
        }
        var vals = $(this).find('option:checked').val();
        var data = createOption(vals, "province", "city");

        // $('select[name=dealercity]').html(data).prev().text($('select[name=dealercity]').find('option:checked').text());
        $('select[name=dealercity]').html(data);
        var vals2 = $('select[name=dealercity]').find('option').first().text();
        // var vals2 = $('select[name=dealercity]').find('option:checked').text();

        var data2 = createOption(vals2, "city", "dealer");
        $('select[name=dealer]').html(data2);
        // $('select[name=dealer]').html(data2).prev().text($('select[name=dealer]').find('option:checked').text());
    });

    $('select[name=dealercity]').on('change', function() {
        var vals = $(this).find('option:checked').val();
        var data = createOption(vals, "city", "dealer");
        $('select[name=dealer]').html(data);

    });

    //生成新的下一级下拉列表
    function createOption(initTxt, initObj, getObj) {
        //alert(initTxt)
        var tmpOption = '';
        var nnb = [];
        // if(initTxt == "北京"){
        //     return '<option value="北京市">北京市</option>';
        // }
        for (var i = 0, len = cityData.length; i < len; i++) {
            if (cityData[i][initObj] == initTxt) {
                nnb.push(cityData[i][getObj]);

            }
        }
        var New = nnb.unique();
        for (var i = 0, len = New.length; i < len; i++) {
            tmpOption += '<option value="' + New[i] + '">' + New[i] + '</option>';
        }
        return tmpOption;
    }
    //处理经销商数据
    function resetData(data) {
        $(data).find('metadata').each(function() {
            cityData.push({
                province: $(this).find('province').text(),
                city: $(this).find('city').text(),
                dealer: $(this).find('dealer').text()
            })
        });
    }


    // 表单选择
    $(".sex .text_sex").on("click", function() {
        $(this).addClass("selected").siblings().removeClass("selected")
    })

    var clause_off = false;
    $(".clause").on("click", function() {
        if (clause_off) {
            $(this).removeClass("selected")
            clause_off = false;
        } else {
            $(this).addClass("selected")
            clause_off = true;
        }
    })

});