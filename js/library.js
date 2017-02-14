function $(selector,content){						//命名函数
	if(selector.charAt(0) === '#'){
		return document.getElementById(selector.substring(1));
	}else{
		var m = content ||document;
		return m.getElementsByTagName(selector);
	}
};
			
function getStyle(obj,attr){							//获取元素函数
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];	
}

function doMove(obj,attr,dir,target,endFn) {
	clearInterval(obj.timer);					//每次点击前清定时器
	dir =  parseInt(getStyle(obj,attr))>target ? -dir:dir; //正负值的处理
	obj.timer = setInterval(function () {					
		var speed = parseInt(getStyle(obj,attr)) + dir;		
		if(speed > target && dir > 0 || speed < target && dir < 0){
			speed = target;										//往前往后走
		};
		obj.style[attr] = speed + 'px';							
		if(speed == target){
			clearInterval(obj.timer);							
			endFn && endFn();									//判断有没有回调函数
		};
	},30)
}

function shake(obj,attr,speed,endFn){							//抖动函数
	var arr = [];
	var n = 0;
	var pos = parseInt(getStyle(obj,attr));
	for (var i=speed;i>0;i-=3) {
		arr.push(i,-i)
	};
	arr.push(0)
	clearInterval(obj.shaker);
	obj.shaker = setInterval(function () {
		obj.style[attr] = pos + arr[n] + 'px';
		n++;
		if(n==arr.length){
			clearInterval(obj.shaker);
			endFn && endFn();
			obj.shaker = null;
		}
	},30)
};
function addZero(n){
	return n < 10 ? "0"+n : n;
}
function getTimes(){
	var d = new Date(); 	
	var weekend = ["日","一","二","三","四","五","六"];
	var H = d.getHours();
	var Min = d.getMinutes();
	var S = d.getSeconds();
	var str = addZero(H)+":"+addZero(Min)+":"+addZero(S);
	return str;
}
function scrollTop(){
	return document.documentElement.scrollTop || document.body.scrollTop;
}

function viewWH(){
	return {
		w:document.documentElement.clientWidth,
		h:document.documentElement.clientHeight
	}
}
function scroll(obj,upFn,downFn){
	flag = true;
	obj.onmousewheel = fn;
	if(obj.addEventListener){
		obj.addEventListener('DOMMouseScroll',fn,false)
	}
	function fn(ev) {
		var e =  ev|| event ;
		var m = true ;
		if(e.wheelDelta){
			if(e.wheelDelta > 0){
				m = true
			}else{
				m = false;
			}
		}else{
			if(e.detail < 0){
				m = true
			}else{
				m = false;
			}
		};
		if(m){
			typeof upFn === 'function' && flag && upFn(e)
		}else{
			typeof downFn === "function" && flag && downFn(e);
		}
		if(e.preventDefault){
			e.preventDefault();  //ie低版本不兼容
		}
		return false;
	}
};
function mousewheel(obj,upFn,downFn){
			
	obj.onmousewheel = fn;
	if(obj.addEventListener){
		obj.addEventListener("DOMMouseScroll",fn,false);
	}
	function fn(ev){
		var e = ev || event;
		var direction = true;
		if( e.wheelDelta ){ //chrome
			direction = e.wheelDelta > 0 ? true : false;
		}else{  //FF
			direction = e.detail < 0 ? true : false;
		}
		if( direction ){  //向上
			typeof upFn === "function" && upFn(e);
		}else{ //向下
			typeof downFn === "function" && downFn(e);
		}

		if(e.preventDefault){
			e.preventDefault();  //ie低版本不兼容
		}

		return false;
	}	
}







