<!--载入多个JS func-->

    function addOnload(newFunction) {
        var oldOnload = window.onload;

        if (typeof oldOnload === "function") {
            window.onload = function () {
                oldOnload();
                newFunction();
            }
        }
        else {
            window.onload = newFunction;
        }
    }
    
    <!--轮播部分交互-->


    $(document).ready(function () {
        var $slider_nav = $(".slider-nav li");
        var $slider_fame = $(".carousel");
        var $bar_pic = $(".carousel #show_pic");
        var flag = 0;
        $slider_nav.mouseover(function (e) {
            var that = $(this).index();
            var delay = setTimeout(function () {
                $slider_fame.css("background-image", "url(../images/lunbo/" + flag + ".jpg)");
                flag = that;
                $(".slider-nav li:eq(" + flag + ")").removeClass().addClass("select").siblings().removeClass();
                $bar_pic.attr("src", "../images/lunbo/" + flag + ".jpg").css("display", "none").fadeIn(500);
            }, 200);
            $($slider_nav).mouseout(function () {
                clearTimeout(delay);

            });
        });
        $slider_fame.mouseover(function () {
            clearInterval(autoShow);
        });
        $slider_fame.mouseout(function (e) {
            autoShow = setInterval(auto_show, 3000);
        });
//            自动轮播
        var autoShow = setInterval(auto_show, 3000);

        function auto_show() {
            if (flag < 4) {
                var index = flag + 1;
                $slider_fame.css("background-image", "url(../images/lunbo/" + flag + ".jpg)");
                $(".slider-nav li:eq(" + index + ")").addClass("select").siblings().removeClass();
                $bar_pic.attr("src", "../images/lunbo/" + index + ".jpg").css("display", "none").fadeIn(500);
                flag++;
            } else {
                flag = 0;
                $slider_fame.css("background-image", "url(../images/lunbo/4.jpg)");
                $(".slider-nav li:eq(" + flag + ")").addClass("select").siblings().removeClass();
                $bar_pic.attr("src", "../images/lunbo/" + flag + ".jpg").css("display", "none").fadeIn(500);
            }
        }
    });
$(document).ready(function () {
    var images=new Array();
    function preLoadImg() {
        for(var i=0;i<preLoadImg.arguments.length;i++){
            images[i]=new Image();
            images[i].src=preLoadImg.arguments[i];
        }

    }
    $("#show_pic").on("load",function () {
        preLoadImg("../images/lunbo/1.jpg","../images/lunbo/2.jpg","../images/lunbo/3.jpg","../images/lunbo/4.jpg")
    });
})

// <!--分类推荐部分交互-->
    $(document).ready(function () {
        var $sideBar_list = $("#sideBar_list li");
        var index = 0;
        $sideBar_list.mouseenter(function () {
            var flag = index;
            $sideBar_list.eq(flag).css("backgroundColor", "rgba(0,0,0,0.4)").removeClass("highLight" + flag)
                .children("i").removeClass("highLight" + flag)
                .siblings('a').removeClass("highLight" + flag);
            $(".sideBar_content:eq(" + flag + ')').css("display", "none");
            index = $(this).index();
            $(this).css("backgroundColor", "#fff").addClass("highLight" + index)
                .children("i").addClass("highLight" + index)
                .siblings('a').addClass("highLight" + index);
            $(".sideBar_content:eq(" + index + ')').css("display", "block");
        })
        var $close_cate = $(".featured_cate");
        $close_cate.mouseleave(function () {
            $sideBar_list.eq(index).css("backgroundColor", "rgba(0,0,0,0.4)").removeClass("highLight" + index)
                .children("i").removeClass("highLight" + index)
                .siblings('a').removeClass("highLight" + index);
            $(".sideBar_content:eq(" + index + ')').css("display", "none");
        })
    })


    
    // <!--产品列表部分交互-->

    $(document).ready(function () {
        var $mark=$(".small_brand_list li");

        $mark.hover(function(){
            $(this).children("a").css({"backgroundColor":"rgba(0,0,0,.7)"}).fadeIn(300);

        },function(){
            $(this).children("a").stop().fadeOut(300);
        });
    })

$(document).ready(function () {
    var flag=0;
    $carousel=$(".carousel_title li");
    $carousel.mouseover(function () {
        var index=$(this).index();
        flag=index;
        $(this).addClass("carousel_title_highlight")
            .siblings("li").removeClass("carousel_title_highlight");
        $(this).parent().siblings("div").children("div")
            .children("a").eq(flag).show()
            .siblings("a").hide();
    });
    var auto_carousel=setInterval(function () {
        $carousel.eq(flag).addClass("carousel_title_highlight")
            .siblings("li").removeClass("carousel_title_highlight");
        $carousel.eq(flag).parent().siblings("div").children("div")
            .children("a").eq(flag).show()
            .siblings("a").hide();
        flag=!flag;
    },2000);

})

// <!--固定sidebar部分交互-->
// <!--左侧固定栏页内跳转-->

    $(document).ready(function () {
        var $left_fixed_sidebar=$(".left_fixed_sidebar a");
        $left_fixed_sidebar.click(function () {
            var go_to_id=$(this).attr("href");
            var height=$(go_to_id).offset().top-50;
            scrollTo(0,height);
            event.preventDefault();
        })
    })
    
    // <!--JQ实现上側和左侧飞入边栏//右侧固定边栏展开效果-->

    $(document).ready(function () {
        var $top_fixed_sidebar = $(".top_fixed_sidebar");
        var $left_fixed_sidebar = $(".left_fixed_sidebar");
        var $content = $(".content");
        $top_fixed_sidebar.hide();
        var left_fixed_sidebar_left = $content.offset().left - 35;
        $left_fixed_sidebar.css("left", left_fixed_sidebar_left)
        $(window).resize(function () {
            left_fixed_sidebar_left = $content.offset().left - 35;
            $left_fixed_sidebar.css("left", left_fixed_sidebar_left);
            if($left_fixed_sidebar.offset().left<0){
                $left_fixed_sidebar.animate({width: "0px", height: "0px", opacity: "0"}, 20);
            }
        });

        $(document).scroll(function () {
            var high = $(document).scrollTop();

            if (high <= 500) {
                $left_fixed_sidebar.stop();
                $left_fixed_sidebar.animate({width: "0px", height: "0px", opacity: "0"}, 100);
                $top_fixed_sidebar.slideUp();
            }
            if (high > 500&&$left_fixed_sidebar.offset().left>=0) {
                $left_fixed_sidebar.stop();
                $left_fixed_sidebar.animate({width: "36px", height: "360px", opacity: "1"}, 200);
                $top_fixed_sidebar.slideDown();
            }
        });
    })
//右侧固定边栏展开效果
$(document).ready(function () {
    var $right_fixed_sidebar_page_title = $(".right_fixed_sidebar_page_title");
    var $right_fixed_sidebar_left = $(".right_fixed_sidebar_left");
    var $right_fixed_sidebar_right = $(".right_fixed_sidebar_right > div");
    var right_fixed_sidebar_height;
    var right_fixed_sidebar_right_box = $(".right_fixed_sidebar_right");
    var index = null;
    $right_fixed_sidebar_page_title.click(function () {
        if(index===$(this).index()){
            var sidebar_right_width = $right_fixed_sidebar_right.eq(index).css("width");
            right_fixed_sidebar_right_box.animate({width: sidebar_right_width}, 300);
        }
        if (index !== $(this).index()) {
            $right_fixed_sidebar_right.eq(index).fadeOut(function () {
                $(this).removeClass("right_fixed_sidebar_right_show");
            });
            index = $(this).index();
            sidebar_right_width = $right_fixed_sidebar_right.eq(index).css("width");
//                var sidebar_right_height = $right_fixed_sidebar_right.eq(index).css("height");
//                right_fixed_sidebar_right_box.css("height", sidebar_right_height);
//                right_fixed_sidebar_right_box.animate({width: sidebar_right_width}, 0);
            right_fixed_sidebar_right_box.css("width",sidebar_right_width);
            $right_fixed_sidebar_right.eq(index).css("bottom", "-" + right_fixed_sidebar_height + "px");
            $right_fixed_sidebar_right.eq(index).addClass("right_fixed_sidebar_right_show").hide().slideDown();
//               .siblings().removeClass("right_fixed_sidebar_right_show");
        }
    })
})

// <!--原生JS右侧固定栏飞入小标签-->

    addOnload(right_fixed_fly_in);

function right_fixed_fly_in() {
    var right_fixed_sidebar_left = document.getElementsByClassName("right_fixed_sidebar_left");
    var sidebar_left = right_fixed_sidebar_left[0].children;
    var animation_queue = [];
    var delay_siber_mark;

//          淡入淡出函数
    function fade_In(element, t, k) {
        var i = 0;
        var j = setInterval(function () {
            if (i <= 20) {
                animation_queue[k] = false;
                element.style.opacity = i / 20;
                i++;
            } else {
                animation_queue[k] = true;
                clearInterval(j);
            }
        }, t)
    }

    function left_move_right(element, distance, t) {
        var i = 0;
        var k = 0;
        var computedStyle = document.defaultView.getComputedStyle(element, null)
        var xpos = parseInt(computedStyle.left);
        var j = setInterval(function () {
            if (i < distance) {
                xpos += 1;
                element.style.left = xpos + "px";
                i++;
            } else {
                clearInterval(j);
            }
        }, t)

    }

    function fade_Out(element, t, k) {
        var i = 20;
        var j = setInterval(function () {
            if (animation_queue[k]) {
                if (i >= 0) {
                    element.style.opacity = i / 20;
                    i--;
                } else {
                    clearInterval(j);
                    animation_queue[k] = false;
                }
            }

        }, t);
    }

    var helper = function (i) {
        return function (e) {
            var title = sidebar_left[i].getAttribute("title");
            var text_node = document.createTextNode(title);
            var text_mark = document.createElement("div");
            text_mark.appendChild(text_node);
            text_mark.className = "sidebar_left_fadeMark";
            sidebar_left[i].appendChild(text_mark);
            var move = function () {
                fade_In(text_mark, 20, i);
                left_move_right(text_mark, 30, 5);
            };
            delay_siber_mark = setTimeout(move, 300);
        }
    };
    var helper1 = function (i) {

        return function (e) {
            if (!document.getElementsByClassName("sidebar_left_fadeMark")) {
                return false;
            }
            clearTimeout(delay_siber_mark);
            var text_mark = sidebar_left[i].getElementsByClassName("sidebar_left_fadeMark");
            fade_Out(text_mark[0], 20, i);

            var delay_clear = setTimeout(function () {
                text_mark[0].parentNode.removeChild(text_mark[0]);
            }, 400)


        }
    }
    for (var i = 0; i < sidebar_left.length; i++) {
        if (i !== 1) {
            sidebar_left[i].onmouseover = helper(i);
            sidebar_left[i].onmouseout = helper1(i);
        }

    }
}

<!--事件处理程序，实现右侧固定栏收缩-->

    addOnload(right_fixed_close);

function right_fixed_close() {
    var body = document.getElementsByTagName("body");
    var right_fixed_sidebar_close_prevent_0 = document.getElementsByClassName("right_fixed_sidebar_left");
    var right_fixed_sidebar_close_prevent = document.getElementsByClassName("right_fixed_sidebar_right");
    var $right_page = $(".right_fixed_sidebar_right");
               right_fixed_sidebar_close_prevent_0[0].addEventListener('click',function () {
               event.stopPropagation()
           })
           right_fixed_sidebar_close_prevent[0].addEventListener('click',function () {
               event.stopPropagation()
           })
           body[0].addEventListener('click',function () {
               $right_page.eq(0).animate({width: "0px"}, 300);
           })

}
