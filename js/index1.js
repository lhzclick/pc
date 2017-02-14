//主导航的旋转效果
$('#workNav').hover(function(){
	$('#div1 .rotateDiv').css('animation-play-state','paused')
},function (){
		$('#div1 .rotateDiv').css('transform','0')
		$('#div1 .rotateDiv').css('animation-play-state','running')
})
$('#div1 .prev').hover(function () {
	$('#div1 .rotateDiv').css('animation','none')
},function(){
	$('#div1 .rotateDiv').css('transform','0')
	$('#div1 .rotateDiv').css('animation','12s rotate infinite linear')
})
$('#div1 .next').hover(function () {
	$('#div1 .rotateDiv').css('animation','none')
},function(){
	$('#div1 .rotateDiv').css('animation','12s rotate infinite linear')
})	
$('#div1 .prev')[0].onclick = function () {
	$('#div1 .rotateDiv')[0].style.transform += 'rotateY(60deg)'
	
}
$('#div1 .next')[0].onclick = function () {
	$('#div1 .rotateDiv')[0].style.transform += 'rotateY(-60deg)'
	
}

//导航栏中li划过，下划线跟着走
var navLi = $('#mianNav li');
navLi.mouseover(function (){ 
	var navLiLeft = navLi.eq(navLi.index(this)).offset().left;
    $('#underline').css('left',navLiLeft+'px') 
})

var divH = $(window).height();
//导航栏中li点击自身翻转
navLi.click(function (){ 
	navLi.removeClass('active')
	navLi.eq(navLi.index(this)).addClass('active')
	$('#wrap').animate({
		top:-navLi.index(this)*divH
	},1000)
})


//加载页面时主页右下角的img从左边运动到右边
$('#intro').css('left','50px').css('transform','rotateX(1080deg)');


//加载页面时主页六棱柱导航从上到下,上下按钮出现
$('#workNav').css('top','20px');
$('#div1 .prev').show(3000)
$('#div1 .next').show(3000)


//整屏切换效果，鼠标滚动时，页面切换一个屏幕
$('#wrap>div').height(divH); 
var n = 0;
//n =  navLi.index(this);
//调用之前封装好的滚轮函数
scroll($('#wrap')[0],function () {
		flag = false;
		n--;
		n = n <= 0 ? 0 : n;
		$('#wrap').animate({
			top:-n*divH
		},function () {
			flag = true;
			navLi.removeClass('active')
			navLi.eq(n).addClass('active')
		})
	},function () {
		flag = false;
		n++;
		n = n >= $('#wrap>div').length - 1? $('#wrap>div').length-1 : n;
		$('#wrap').animate({
			top:-n*divH
		},function () {
			flag = true;
			navLi.removeClass('active')
			navLi.eq(n).addClass('active')
		})
})
//---------------------------------------------------整屏切换结束


//第二页中图片切换效果
var m = 0;
var timer = null;

//img手动切换函数
function Imgmove(index) {
	$('#div2 .listImg li').hide(600)
	$('#div2 .listImg li').eq(index).show(600)
	$('#div2 .point span').removeClass('show')
	$('#div2 .point span').eq(index).addClass('show')
}


//img自动切换函数
function autoMove() {
	timer = setInterval(function () {
	m++;
	m = m > $('#div2 .listImg li').length - 1 ? 0:m;
		Imgmove(m);	
	},2000)
}

//加载完成后自动切换
autoMove();

//移动到左右按纽，清除定时器
$('#div2 .tabBtn').mouseover(function () {
	clearInterval(timer)
})


//移开左右按纽，调用自动切换函数
$('#div2 .tabBtn').mouseout(function () {
	autoMove();
})

//点击左按纽，操作m传入手动运动函数中
$('#div2 .prev').click(function () {
	m -- ;
	m = m <= 0 ? $('#div2 .listImg li').length - 1 :m;
	Imgmove(m);
})

//点击右按纽，操作m传入手动运动函数中
$('#div2 .next').click(function () {
	m++;
	m = m > $('#div2 .listImg li').length - 1 ? 0:m;
	Imgmove(m);	
})


//移入图片下面圆导航清除定时器，让对应的小图片显示出来，并记录当前值，让m=当前值 
$('#div2 .point span').mouseover(function () {
	m = $('#div2 .point span').index(this);
	clearInterval(timer)
	$('#div2 .smallDiv img').css('opacity',0)
	$('#div2 .smallDiv img').eq($('#div2 .point span').index(this)).css('opacity',1)
})


//移开图片下面圆导航调用自动播放函数，让小图消失
$('#div2 .point span').mouseout(function () {
	$('#div2 .smallDiv img').css('opacity',0)
	autoMove();
})


//点击对应圆导航，调用手动切换函数，传入的参数为当前值
$('#div2 .point span').click(function () {
	Imgmove($('#div2 .point span').index(this));
})

//--------------------------------------------------------图片切换结束














