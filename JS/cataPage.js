
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
    


    // <!--/*branch_select部分交互*/-->
  
    $(document).ready(function () {
        var $branch = $(".branch_select_content_list_1");
        $("#search_branch_input").live("keyup keydown", function () {
            var word = $(this).toPinyin();
            word = word.toLowerCase().replace(/\s/gi, "");
            if (word === "") {
                $branch.show();
            } else {
                for (var i = 0; i < $branch.length; i++) {
                    if ($branch.eq(i).attr("title").indexOf(word) >= 0) {
                        $branch.eq(i).show();
                    } else {
                        $branch.eq(i).hide();
                    }
                }
            }
        });
        $branch.hover(function () {
            $(this).children("div").css("display", "block");
        }, function () {
            $(this).children("div").css("display", "none");
        })

    });
$(document).ready(function () {
    var $branch_list = $(".branch_select_content_list");
    var $brand_category_content_search = $(".brand_category_content_search");
    var $branch_pack_up = $("#branch_pack_up");
    var $brand_category = $(".brand_category");
    var $category_style_2 = $(".category_style_2");
    var $pack_up_button_1 = $(".pack_up_button_1");
    $branch_pack_up.toggle(function () {
        $brand_category_content_search.css("display", "none");
        $branch_list.addClass("pack_up");
        $brand_category.addClass("brand_category_pack_up");
        $(this).html("更多<i class='iconfont'>&#xe701;</i>");
        event.preventDefault();
    }, function () {
        $brand_category_content_search.css("display", "block");
        $branch_list.removeClass("pack_up");
        $brand_category.removeClass("brand_category_pack_up");
        $(this).html("收起<i class='iconfont'>&#xe700;</i>");
        event.preventDefault();
    })
    $branch_pack_up.click();
    $pack_up_button_1.toggle(function () {
        $(this).parent().parent().addClass("category_style_2_pack_up");
        $(this).html("更多<i class='iconfont'>&#xe701;</i>");
        event.preventDefault();
    }, function () {
        $(this).parent().parent().removeClass("category_style_2_pack_up");
        $(this).html("收起<i class='iconfont'>&#xe700;</i>");

    });
    $pack_up_button_1.click();
});
$(document).ready(function () {
    var $branch_select = $(".branch_select");
    var $close_choice_button = $(".close_choice_button");
    var $category_style_3 = $(".category_style_3");
    $close_choice_button.toggle(function () {
        $category_style_3.css("display", "none");
        $(this).html(" 更多选项<i class=\"iconfont\">&#xe709;</i>")
    }, function () {
        $category_style_3.css("display", "block");
        $(this).html(" 精简选项<i class=\"iconfont\">&#xe708;</i>")

    });
    $close_choice_button.click();
});



// <!--main_content交互部分-->

    //        筛选栏交互
    //              商品标签
    $(document).ready(function () {
        $goods_label_click_bottom = $(".goods_label a");
        $goods_label_click_bottom.toggle(function () {
            $(this).parent().addClass("goods_label_click");
            $(this).html("收起<i class=\"iconfont\">&#xe63b;</i>");
        }, function () {
            $(this).parent().removeClass("goods_label_click");
            $(this).html("更多<i class=\"iconfont\">&#xe701;</i>");

        })
    });
//        商品点击展示小图片的实现
$(document).ready(function () {
    var $small_goods_img = $(".small_goods_img");
    $small_goods_img.click(function () {
        var pic_src = $(this).addClass("small_goods_img_show").attr("src");
        $(this).siblings().removeClass("small_goods_img_show");
        $(this).parent().prev().attr("src", pic_src);
    })
})

// <!--图片懒加载-->

    $(document).ready(function () {
        $("img.lazy").lazyload({
            threshold: 150,
            effect: "fadeIn"
        });
    })
    
    // <!--价格筛选-->
  
    $(document).ready(function () {
        var price_filter = $(".price_filter");
        price_filter.keyup(function () {
            var price = $(this).val();
            if (isNaN(price)) {
                price = 1;
            }
//                console.log(price);
            if (price !== "") {
                price = parseInt(price);
//                    console.log(price);
                $(this).val(price);
            }
            var min_price = $(".price_filter_low").val();
            var max_price = $(".price_filter_high").val();
            var $main_content_goods = $(".main_content_goods");
            if (!isNaN(min_price) && !isNaN(max_price) && min_price !== "" && max_price !== "") {
                $main_content_goods.hide();
                $main_content_goods.each(function () {
                    var goods_price = $(this).attr("price");
//                        console.log(goods_price);
                    if (goods_price <= max_price && goods_price >= min_price) {
                        console.log(goods_price);
                        $(this).show()
                    }
                })
            } else {
                $main_content_goods.show();
            }
        })
    })
    


    // <!--右侧固定栏交互部分-->
    // <!--原生JS右侧固定栏飞入小标签-->
  
           $(document).ready(function () {
               var $top_fixed_sidebar = $(".top_fixed_sidebar:eq(0)");
               var $left_fixed_sidebar = $(".left_fixed_sidebar:eq(0)");
               var $content = $(".content:eq(0)");
               $top_fixed_sidebar.hide();
               var left_fixed_sidebar_left = $content.offset().left - 35;
               $(window).resize(function () {
                   left_fixed_sidebar_left = $content.offset().left - 35;
                   $left_fixed_sidebar.css("left", left_fixed_sidebar_left)
               });

               $(document).scroll(function () {
                   var high = $(document).scrollTop();

                   if (high <= 500) {
                       $left_fixed_sidebar.stop();
                       $left_fixed_sidebar.animate({width: "0px", height: "0px", opacity: "0"}, 100);
                       $top_fixed_sidebar.slideUp();
                   }
                   if (high > 500) {
                       $left_fixed_sidebar.stop();
                       $top_fixed_sidebar.slideDown();
                       $left_fixed_sidebar.animate({width: "36px", height: "360px", opacity: "1"}, 200);
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
            if (index === $(this).index()) {
                var sidebar_right_width = $right_fixed_sidebar_right.eq(index).css("width");
                var sidebar_right_height = $right_fixed_sidebar_right.eq(index).css("height");
                right_fixed_sidebar_right_box.css("height",sidebar_right_height);
                right_fixed_sidebar_right_box.animate({width: sidebar_right_width}, 300);
            }
            if (index !== $(this).index()) {
                $right_fixed_sidebar_right.eq(index).fadeOut(function () {
                    $(this).removeClass("right_fixed_sidebar_right_show");
                });
                index = $(this).index();
                sidebar_right_width = $right_fixed_sidebar_right.eq(index).css("width");
                sidebar_right_height = $right_fixed_sidebar_right.eq(index).css("height");
                right_fixed_sidebar_right_box.css("height", sidebar_right_height);
                right_fixed_sidebar_right_box.animate({width: sidebar_right_width}, 300);
                $right_fixed_sidebar_right.eq(index).css("bottom", "-" + right_fixed_sidebar_height + "px");
                $right_fixed_sidebar_right.eq(index).addClass("right_fixed_sidebar_right_show").hide().slideDown();
//               .siblings().removeClass("right_fixed_sidebar_right_show");
            }
        })

    })
    
    // <!--事件处理程序，实现右侧固定栏展开-->
  
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

<!--筛选栏滚动固定-->

    $(document).ready(function () {
        var $main_content_classify_bar = $(".main_content_classify_bar");
        var last = 0;
        var delay_act;
        var that;
//节流函数，减少触发次数
        function throttle(fn, interval, target) {
            var now = +new Date();
            if (that === undefined) {
                that = target;
            }
            clearTimeout(delay_act);
            if (now - last >= interval) {
                fn.apply(that);
                that = undefined;
                last = now;
            } else {
                delay_act = setTimeout(function () {
                    fn.apply(that);
                    last = now;
                    that = undefined;
                }, interval);
            }

        }

        function fn() {
            if($(this).scrollTop()>=330){
                $main_content_classify_bar.addClass("fixed_main_content_classify_bar");
            }else{
                $main_content_classify_bar.removeClass("fixed_main_content_classify_bar");

            }
        }

        $(document).scroll(function () {
            throttle(fn, 50, this);
        });
    });
