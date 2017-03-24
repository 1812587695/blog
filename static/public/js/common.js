String.prototype.trim = function(){
	return this.replace(/^\s+/, "").replace(/\s+^/, "");	
}
/**
 * 怡臣选择ID过滤
 */
function YcChoser(){
    var chosenIds = [];
    var pos = -1;
    this.setChosenIds = function(ids){
        if(ids !== ""){
            chosenIds = ids.split("#");
        }
    };
    this.isRepeat = function(id){
        var flag = false;
        var clen = chosenIds.length;
        pos = -1;
        for(var i = 0; i < clen; i++){
            if(chosenIds[i].toString() == id.toString()){
                flag = true;
                pos = i;
                break;
            }
        }
        return flag;
    };
    this.remove = function(){
        if(pos !== -1){
            chosenIds.splice(pos, 1);
        }
    };
    this.add = function(id){
        chosenIds.push(id);
    };
    this.getChosenIds = function(){
        return chosenIds.length == 0 ? "" : chosenIds.join("#");
    };
	this.getLength = function(){
		return chosenIds.length;
	};
    this.getPosition = function(){
        return pos;
    };
}
/**
 * 怡臣数据验证
 */
(function(g){
    function validtaor(){
        var _rules = {};
        function bind(){
            _rules["username"] = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
            _rules["date"] = /^(\d{4}\/\d{1,2}\/\d{1,2}|\d{4}-\d{1,2}-\d{1,2})$/;
            _rules["password"] = /^[^\s]{6,20}$/;
            _rules["mobile"] = /^1[0-9]{10}$/;
            _rules["phone"] = /^(\d{3,4}-)(\d{3}|\d{7,8})(-(\d{3,}))?$/;
            _rules["zipCode"] = /^[0-9]{6}$/;
            _rules["price"] = /^-?[0-9]+(\.[0-9]+)?$/;
            _rules["goodsprice"] = /^[0-9]+(\.[0-9]+)?$/;
            _rules["positiveint"] = /^[1-9][0-9]*?$/;
            _rules["money"] = /^(0|[1-9][0-9]*?)(\.[0-9]+)?$/;
        };
		// 是否为空
        this.isEmpty = function(str){
            return str == "" || /^\s+$/.test(str);
        };
        // 是否为商品价格
        this.isGoodsPrice = function(str){            
            return _rules["goodsprice"].test(str);
        };
        // 是否为正整数(除了0的自然数)
        this.isPositiveInt = function(str){            
            return _rules["positiveint"].test(str);
        };
        this.isPassword = function(str){
            return _rules["password"].test(str);
        };
        // 是否为有效日期
		this.isDate = function(str){
            return _rules["date"].test(str);
        };
		// 是否为用户名
        this.isUsername = function(str){
            return _rules["username"].test(str);
        };
        // 是否为有效电话号
		this.isPhone = function(str){
            return _rules["phone"].test(str);
        };
		// 是否为有效手机号
        this.isMobile = function(str){
            return _rules["mobile"].test(str);
        };
		// 是否为有效邮编
        this.isZipCode = function(str){
            return _rules["zipCode"].test(str);
        };
        this.isPrice = function(str){
            //可为负数
            return _rules["price"].test(str);
        };
        this.isMoney = function(str){
            // 此处只验证大于0的价格
            return _rules["money"].test(str);
        };
        this.isInRangeLength = function(str, xlen, dlen){
            return str.length >= xlen && str.length <= dlen;
        };
		// 修正price el:Jquery对象
		this.fixPrice = function(el, str){
			if(!_rules["price"].test(str)){
				$(el).val("0.00");             
            }else{
                var pos = str.indexOf(".");
                var len = str.length;
                if(pos !== -1){
                    if(pos + 2 < len - 1){
                        $(el).val(str.replace(/^(-?)(0*?)(0|[1-9][0-9]*?)(\.[0-9]{2})([0-9]+?)$/, '$1$3$4'));
                    }else{
                        $(el).val(str.replace(/^(-?)(0*?)(0|[1-9][0-9]*?)(\.[0-9]+?)$/, '$1$3$4') + (pos + 2 == len - 1 ? "" : "0"));
                    }                    
                }else{
                    $(el).val(str.replace(/^(-?)(0+?)(0|[1-9][0-9]*?)$/, '$1$3'));
                }
            }
		};
        bind();
    }
    g.mbValidator = new validtaor();
})(window);

/*价格计算*/

function repeatStr(str, times){
    var rs = "";
    for(var i = 0; i < times; i++){
        rs += str;  
    }
    return rs;
}
// 获取精准浮点(只保证小数点为两位的)
// 相乘时要求v2是整数
function getFixedFloat(v1, v2, op){
    v1 = v1.toString();
    v2 = v2.toString();
	var isFs1 = v1.indexOf("-") == 0;
	var isFs2 = v2.indexOf("-") == 0;
	var isDoubleFs = false;
	if(isFs1 && isFs2){
		v1 = v1.substring(1);
		v2 = v2.substring(1);
		isDoubleFs = true;
	}else if(isFs1){
		v1 = v1.substring(1);
		if(op == "-"){			
			isDoubleFs = true;
			op = "+";		
		}else if(op == "+"){
			var tmp = v1;
			v1 = v2;
			v2 = tmp;
			op = "-";
		}
	}else if(isFs2){
		v2 = v2.substring(1);
		if(op == "-"){
			op = "+";		
		}else if(op == "+"){
			op = "-";
		}
	}
    var v1Arr = v1.split(".");
    var v2Arr = v2.split(".");
    var cMax = 1;
    if(v1Arr.length == 1){
        v1Arr.push("0");
    }else{
        cMax = v1Arr[1].length;
        if(cMax == 1){
            v1Arr[1] = v1Arr[1] + "0";
            cMax = 2;
        }        
    }    
    if(v2Arr.length == 1){
        v2Arr.push("0");
    }else{
        var fdlen2 = v2Arr[1].length;
        if(fdlen2 > cMax){            
            v1Arr[1] = v1Arr[1].toString() + repeatStr("0", fdlen2 - cMax);
            cMax = fdlen2;
        }else if(fdlen2 < cMax){
            v2Arr[1] += repeatStr("0", cMax - fdlen2);
        }
        cMax = 2;
    }	
    for(var i = 0; i < 2; i++){
        v1Arr[i] = parseInt(v1Arr[i]);
        v2Arr[i] = parseInt(v2Arr[i]);
    }	
    var rs = 0;
    var jsArr = [0, 0];
    var isMinus = false;
    var isReverse = false;
    if(op == "+"){
        jsArr[0] = v1Arr[0] + v2Arr[0];
        jsArr[1] = v1Arr[1] + v2Arr[1];
    }else if(op == "-"){
        if(v1Arr[0] < v2Arr[0] || (v1Arr[0] == v2Arr[0] && v1Arr[1] < v2Arr[1])){
            jsArr[0] = v2Arr[0] - v1Arr[0];
            jsArr[1] = v2Arr[1] - v1Arr[1];
            isReverse = true;
        }else{
            jsArr[0] = v1Arr[0] - v2Arr[0];
            jsArr[1] = v1Arr[1] - v2Arr[1];
        }
        isMinus = true;
    }else if(op == "*"){
        jsArr[0] = v1Arr[0] * v2Arr[0];
        jsArr[1] = v1Arr[1] * v2Arr[0];
    }
    var xsstr = jsArr[1].toString();
    var dlen = xsstr.length - cMax;
    if(dlen > 0 && !isMinus){
        jsArr[0] += parseInt(xsstr.substr(0, dlen));
        xsstr = xsstr.substr(dlen);        
    }else if(isMinus){
        if(jsArr[0] > 0 && jsArr[1] < 0){            
            jsArr[1] += 100;
            jsArr[0] -= 1;
        }
        xsstr = jsArr[1].toString();
    }
    if(xsstr.length == 1){
        xsstr = "0" + xsstr;
    }
	var rs = "";
	var isZero = parseInt(jsArr[0]) == 0 && parseInt(xsstr) == 0;
	if(isDoubleFs){
		if(isReverse && op == "-"){
			rs = jsArr[0] + "." + xsstr;
		}else if(op == "-" || op == "+"){
			rs = (isZero ? "" : "-") + jsArr[0] + "." + xsstr;
		}
	}else{
		rs = (isReverse ? "-" : "") + jsArr[0] + "." + xsstr;
	}
    return rs;
}

var bigPicObjCache = null;
/*静态显示大图*/
function showBigPicture(){
	$(".scale-img").each(function(){
		$(this).bind("mouseover", function(e){
			if(!bigPicObjCache){
				$(document.body).append('<div id="BigPicBox"><img src="'+$(this).data("bimg")+'"/></div>');
				bigPicObjCache = $("#BigPicBox");
			}else{
				bigPicObjCache.children("img").attr("src", $(this).data("bimg"));
			}
			bigPicObjCache.css({"left": ($(this).offset().left + 50)+"px", "top": ($(this).offset().top + 20) + "px", "display" : "block"});
		});	
		$(this).bind("mouseout", function(){
			if(bigPicObjCache){
				bigPicObjCache.css("display", "none");	
			}			
		});
	});	
}
// 动态渲染的显示大图
var GPicEvent = {
	on: function(o){
		if(!bigPicObjCache){
			$(document.body).append('<div id="BigPicBox"><img src="'+$(o).data("bimg")+'"/></div>');
			bigPicObjCache = $("#BigPicBox");
		}else{
			bigPicObjCache.children("img").attr("src", $(o).data("bimg"));
		}
		bigPicObjCache.css({"left": ($(o).offset().left + 50)+"px", "top": ($(o).offset().top + 20) + "px", "display" : "block"});
	},
	out: function(o){
		if(bigPicObjCache){
			bigPicObjCache.css("display", "none");	
		}
	}
}


/*
 * 公用弹出
 * 依赖于layer ui
 * <script src="/Public/layer/layer.js"></script>
 */
var GPopup = {
	lay_ajaxLoadID : 0,
	/**
	 * ajax异步保存加载框,依赖于layer ui
	 * 
	 */
	loadDialog : function(txt){
		var txt = txt || "正在处理中...";
		layer.open({
			type: 1 ,title: false //不显示标题栏
			,closeBtn: false
			,area: '300px;'
			,shade: 0.8
			,id: 'lay_loading' //设定一个id，防止重复弹出
			,moveType: 1 //拖拽模式，0或者1
			,content: '<div class="ajax-loading-dialog">'+txt+'</div>'
		  });
		this.lay_ajaxLoadID = layer.index;  
	},
	/*移除加载框*/
	removeLoad : function(){
		layer.close(this.lay_ajaxLoadID);
	},
	alertTip: function(txt){
		layer.msg(txt, {time:1000});
	}
};
/*
 * 公用验证错误显示
 * 依赖于jquery
 */
var GErr = {
	map : {},
	show : function(o, msg){
		var p = o.parent().parent();
		if(o.attr("id") in this.map){
			this.map[o.attr("id")].html(msg);
		}else{
			p.append('<span id="err-'+o.attr("id")+'" class="error" style="display:inline-block;font-weight:700;">'+msg+'</span>');
			this.map[o.attr("id")] = $("#err-" + o.attr("id"));
		}
	},
	remove : function(o){
		if(o.attr("id") in this.map){
			this.map[o.attr("id")].remove();
			delete this.map[o.attr("id")];
		}
	}
};
/*获取当前日期字符串 如：2012-01-01*/
function getNowDateStr(){
	var now = new Date();
	return now.getFullYear() + "-" + (now.getMonth() +1) + "-" + now.getDate();
}