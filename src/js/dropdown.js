/*跨浏览器事件(使用DOM2级事件)*/
var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
		}
	},
	removeHandler:function(element,type,handler){
		if(element.removeHandler){
			element.removeHandler(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	}
};
/*导航插件开关*/
/*采用selectors API,支持IE8+、Firefox3.5+、Safari3.1+、Chrome和Opera10+*/
EventUtil.addHandler(window,"load",function(event){
		(function(){
			function stopPropagation(){
				return function(event){
					EventUtil.stopPropagation(event);
				};
			}
			function changeStyle(){
				return function(){
					var ul=this.querySelector("ul");
					span=this.querySelector("span");
					if(!ul.style.display||ul.style.display=="none"){			
						span.className="glyphicon glyphicon-chevron-up";
						ul.style.display="block";
						this.className=(this.className=="dropdown-table")?"dropdown-table open":"dropdown-table2 open";
						
					}else{
						span.className="glyphicon glyphicon-chevron-down";
						ul.style.display="none";
						this.className=(this.className=="dropdown-table open")?"dropdown-table":"dropdown-table2";
						
					}
					var li=this.querySelectorAll("li.dropdown-table2");
					li.forEach(function(item,index,array){
						EventUtil.addHandler(item,"click",stopPropagation());
					});
					li=this.querySelectorAll("li.dropdown-table3");
					
					li.forEach(function(item,index,array){
						EventUtil.addHandler(item,"click",stopPropagation());
					});	
				};
			}
			var list=document.querySelectorAll(".dropdown-table");
			list.forEach(function(item,index,array){
				EventUtil.addHandler(item,"click",changeStyle());
				EventUtil.addHandler(item,"click",stopPropagation());
			});
		    list=document.querySelectorAll(".dropdown-table2");
		    list.forEach(function(item,index,array){
				EventUtil.addHandler(item,"click",changeStyle());
				EventUtil.addHandler(item,"click",stopPropagation());
			});
		    //全部产品按钮
		    var btn_all=document.querySelector(".dropdown-header");
		    EventUtil.addHandler(btn_all,"click",function(){
		    	var div=this.querySelector(".dropdown-all");
		    	if(!div.style.display||div.style.display=="none"){
		    		this.className="dropdown-header action";
		    		div.style.display="block";
		    	}else{
		    		this.className="dropdown-header";
		    		div.style.display="none";
		    	}
		    	var li=this.querySelectorAll("li");
		    	li.forEach(function(item,index,array){
						EventUtil.addHandler(item,"click",stopPropagation());
					});	
		    });
		})();
		//根据URL保持对应的导航打开状态
		(function(){
			var href=location.href;
			var div=document.querySelector(".dropdown");
			var listA=div.querySelectorAll("a");
			var a;
			for(var i=0;i<listA.length;i++)
			{
				if(listA[i].getAttribute("href")===href)
					{
						a=listA[i];
						break;
					}
			}
			if(a){
				a.style.color="#00a2ac";
				var par=a.parentNode;
				par.className+=" dropdown-table-active";
				for(var node=a.parentNode.parentNode;node.className!="dropdown";node=node.parentNode){
					if(node.nodeName==="UL"){
						node.style.display="block";						
					}
					if(node.nodeName==="LI"){						
						var span=node.querySelector("span");
						span.className="glyphicon glyphicon-chevron-up";
						node.className=(node.className=="dropdown-table")?"dropdown-table open":"dropdown-table2 open";
					}
				}
			}	
		})();
});