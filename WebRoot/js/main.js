// JavaScript Document
$(function(){/*html文档加载完成后执行的内容*/
	/*定义一个重置cover-height,cover-width的函数(功能)*/
	function reset(){
		var width=$(window).width();/*取当前浏览器可视区域宽度*/
		var height=$(window).height();/*取当前浏览器可视区域高度*/
		$(".cover-height").height(height);
		$(".cover-width").width(width);
	}
	$(window).resize(reset);
	reset();/*执行窗口自适应函数*/
});
/*定义移动下一屏的动画函数*/
function goto(selector){
	/*获取需要移动的目标当前位置*/
	var top1=$(selector).offset().top;
//	$("html,body").scrollTop(top1);
	/*创建一个屏幕滚动的动画,动画时长500ms,滚动条向下滚动的距离是top1*/
	$("html,body").animate({scrollTop:top1},500);
}