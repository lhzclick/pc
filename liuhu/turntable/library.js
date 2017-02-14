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