
// isplay:是否自动轮播,
// count:每次轮播的张数,
// speed:运动的时间,
// time:每次运动的间隔,
// type:"左右按钮的的事件（'click'/'mousemove'）",
// prev:"上一张按钮名（ID名/class名）",
// next:"下一张按钮名（ID名/class名）"
// direction:"运动方向 值为（x,y,不区分大小写）默认x轴"

;
(function($){
	$.fn.slider=function(option){
		var deft = {
			isplay:true,
			count:1,
			speed:1000,
			time:4000,
			type:"mouseover",
			prev:".left",
			next:".right",
			direction:"X"
		}

		var set = $.extend({},deft,option)
		return $(this).each(function(){
			
			init($(this))
		})



		function init(dom){

			var ul = dom.find("ul"),
				len = ul.children("li").length,
				w = ul.children("li").outerWidth(true),
				timer = null;

				ul.width(len*w)

			if(set.isplay){
				dom.hover(function(){
					clearInterval(timer)
				},function(){
					timer = setInterval(auto,set.time)
				}).trigger("mouseleave")
			}
			
			$(set.next).on(set.type,function(){
				if(ul.is(":animated")) return false
				auto()
			})
			$(set.prev).on(set.type,function(){
				if(ul.is(":animated")) return false
				ul.css("margin-left",-w*set.count)
				ul.children("li").slice(-set.count).prependTo(ul)
				ul.stop().animate({"margin-left":0},set.speed)
			})

			function auto(){
				ul.stop().animate({"margin-left":-w*set.count},set.speed,function(){
					$(this).children("li").slice(0,set.count).appendTo($(this))
					$(this).css("margin-left",0)
				})
			}
		}

		
	}
})(jQuery)