$(document).ready(function(){
$(".panelToggle").click(function(){
    $(".userPanel").toggleClass("width200px width45px");
	$("i",this).toggleClass("fa-arrow-left fa-arrow-right");
	$(".userLogo img").toggleClass("width50p width90p");
	$(".userNameSpan").toggleClass("show hide");
	$(".userMenu span").toggleClass("show hide");
	$(".userMenu ul").toggleClass("showI2");
	$(".userMenu ul i").toggleClass("Icon Icon2");
});
});