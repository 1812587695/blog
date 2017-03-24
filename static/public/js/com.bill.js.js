/*结算js*/
var _JSObj = { 
		"num" : {"order" : 0, "refund" : 0},
		"extra" : {"order-bank" : "0.00", "order-other" : "0.00", "refund-other" : "0.00"},
		"realcost" : {"order" : "0.00", "refund" : "0.00"},
		"order" : {"totalCost": "0.00", "totalYJ" : "0.00", "num" : $("#zj-order-num"), "cost" : $("#zj-order-totalcost"), "yj" : $("#zj-order-totalyj"), "bank" : $("#zj-order-bank"), "other" : $("#zj-order-other"), "finalfee" : $("#zj-order-finalfee")},
		"refund" : {"totalCost": "0.00", "totalYJ" : "0.00", "num" : $("#zj-refund-num"), "cost" : $("#zj-refund-totalcost"), "yj" : $("#zj-refund-totalyj"), "other" : $("#zj-refund-other"), "finalfee" : $("#zj-refund-finalfee")}
			};
var jsOrderList = [];
var jsRefundList = [];
var _isBlurEnabled = true;
$("#zj-order-bank, #zj-order-other, #zj-refund-other").each(function(){
	_JSObj["extra"][$(this).attr("data-key")] = $(this).val();
	$(this).on("blur", function(){
		if(!_isBlurEnabled) return;
		var _v = $(this).val().trim();
		mbValidator.fixPrice($(this), _v);
		_v = $(this).val();
		if(parseFloat(_v) < 0){
			_v = "0.00";
			$(this).val(_v);
		}
		updateInputPrice($(this).attr("data-key"), _v);
	});
});
$(".grid-order").each(function(i, o){
	_JSObj["order"]["totalCost"] = getFixedFloat(_JSObj["order"]["totalCost"], $(this).attr("data-cost"), "+");
	_JSObj["order"]["totalYJ"] = getFixedFloat(_JSObj["order"]["totalYJ"], $(this).attr("data-yjfee"), "+");
	var real = getFixedFloat($(this).attr("data-cost"), $(this).attr("data-yjfee"), "-");
	jsOrderList.push({"cost" : $(this).attr("data-cost"), "yj" : $(this).attr("data-yjfee"), "real" : real});
});
$(".grid-refund").each(function(i, o){
	_JSObj["refund"]["totalCost"] = getFixedFloat(_JSObj["refund"]["totalCost"], $(this).attr("data-cost"), "+");
	_JSObj["refund"]["totalYJ"] = getFixedFloat(_JSObj["refund"]["totalYJ"], $(this).attr("data-yjfee"), "+");
	var real = getFixedFloat($(this).attr("data-cost"), $(this).attr("data-yjfee"), "-");
	jsRefundList.push({"cost" : $(this).attr("data-cost"), "yj" : $(this).attr("data-yjfee"), "real" : real});
});

_JSObj["num"]["order"] = jsOrderList.length;
_JSObj["num"]["refund"] = jsRefundList.length;

_JSObj["realcost"]["order"] = getFixedFloat(_JSObj["order"]["totalCost"], _JSObj["order"]["totalYJ"], "-");
_JSObj["realcost"]["order"] = getFixedFloat(_JSObj["realcost"]["order"], _JSObj["extra"]["order-bank"], "-");
_JSObj["realcost"]["order"] = getFixedFloat(_JSObj["realcost"]["order"], _JSObj["extra"]["order-other"], "-");

_JSObj["realcost"]["refund"] = getFixedFloat(_JSObj["refund"]["totalCost"], _JSObj["refund"]["totalYJ"], "-");
_JSObj["realcost"]["refund"] = getFixedFloat(_JSObj["realcost"]["refund"], _JSObj["extra"]["refund-other"], "-");

_JSObj["order"]["finalfee"].text(_JSObj["realcost"]["order"]);
_JSObj["refund"]["finalfee"].text(_JSObj["realcost"]["refund"]);
$("#current-js-fianlfee").text(getFixedFloat(_JSObj["realcost"]["order"], _JSObj["realcost"]["refund"], "-"));
function removeRecord(i, type){
	_isBlurEnabled = false;
	if(type == "order"){
		_JSObj["num"]["order"] = _JSObj["num"]["order"] - 1;
		_JSObj["order"]["num"].text(_JSObj["num"]["order"]);
		if(_JSObj["num"]["order"] == 0){
			_JSObj["order"]["cost"].text("0.00");
			_JSObj["order"]["yj"].text("0.00");
			_JSObj["order"]["bank"].val("0.00");
			_JSObj["order"]["other"].val("0.00");
			_JSObj["order"]["finalfee"].text("0.00");
			_JSObj["realcost"]["order"] = "0.00";
		}else{
			_JSObj["order"]["totalCost"] = getFixedFloat(_JSObj["order"]["totalCost"], jsOrderList[i]["cost"], "-");
			_JSObj["order"]["totalYJ"] = getFixedFloat(_JSObj["order"]["totalYJ"], jsOrderList[i]["yj"], "-");
			_JSObj["order"]["cost"].text(_JSObj["order"]["totalCost"]);
			_JSObj["order"]["yj"].text(_JSObj["order"]["totalYJ"]);
			_JSObj["realcost"]["order"] = getFixedFloat(_JSObj["realcost"]["order"], jsOrderList[i]["real"], "-");
			_JSObj["order"]["finalfee"].text(_JSObj["realcost"]["order"]);				
		}
		$("#current-js-fianlfee").text(getFixedFloat(_JSObj["realcost"]["order"], _JSObj["realcost"]["refund"], "-"));
	}else if(type == "refund"){
		_JSObj["num"]["refund"] = _JSObj["num"]["refund"] - 1;
		_JSObj["refund"]["num"].text(_JSObj["num"]["refund"]);
		if(_JSObj["num"]["refund"] == 0){
			_JSObj["refund"]["cost"].text("0.00");
			_JSObj["refund"]["yj"].text("0.00");
			_JSObj["refund"]["other"].val("0.00");
			_JSObj["refund"]["finalfee"].text("0.00");
			_JSObj["realcost"]["refund"] = "0.00";
		}else{
			_JSObj["refund"]["totalCost"] = getFixedFloat(_JSObj["refund"]["totalCost"], jsRefundList[i]["cost"], "-");
			_JSObj["refund"]["totalYJ"] = getFixedFloat(_JSObj["refund"]["totalYJ"], jsRefundList[i]["yj"], "-");
			_JSObj["refund"]["cost"].text(_JSObj["refund"]["totalCost"]);
			_JSObj["refund"]["yj"].text(_JSObj["refund"]["totalYJ"]);
			_JSObj["realcost"]["refund"] = getFixedFloat(_JSObj["realcost"]["refund"], jsRefundList[i]["real"], "-");
			_JSObj["refund"]["finalfee"].text(_JSObj["realcost"]["refund"]);				
		}
		$("#current-js-fianlfee").text(getFixedFloat(_JSObj["realcost"]["order"], _JSObj["realcost"]["refund"], "-"));
	}		
	_isBlurEnabled = true;
}
function updateInputPrice(type, v){
	var diff = getFixedFloat(v, _JSObj["extra"][type], "-");
	_JSObj["extra"][type] = v;
	diff = parseFloat(diff);
	if(diff == 0){
		return;
	}
	if(type.indexOf("order-") != -1){			
		_JSObj["realcost"]["order"] = getFixedFloat(_JSObj["realcost"]["order"], Math.abs(diff), diff >= 0 ? "-" : "+");
	}else{
		_JSObj["realcost"]["refund"] = getFixedFloat(_JSObj["realcost"]["refund"], Math.abs(diff), diff >= 0 ? "-" : "+");
	}
	_JSObj["order"]["finalfee"].text(_JSObj["realcost"]["order"]);
	_JSObj["refund"]["finalfee"].text(_JSObj["realcost"]["refund"]);
	
	$("#current-js-fianlfee").text(getFixedFloat(_JSObj["realcost"]["order"], _JSObj["realcost"]["refund"], "-"));
}
$("#order-table-list .grid-delete").each(function(i, o){
	$(this).bind("click", function(){
		if(confirm("是否移除？")){
			$(this).parents(".one-order-area").remove();
			removeRecord(i, "order");
		}			
	});
});

$("#refund-table-list .grid-delete").each(function(i, o){
	$(this).bind("click", function(){
		if(confirm("是否移除？")){
			$(this).parents(".one-refund-area").remove();
			removeRecord(i, "refund");
		}
	});
});
function checkSettleSubmit(){
	var flag = true;
	$("#zj-order-bank, #zj-order-other, #zj-refund-other").each(function(){
		var _v = $(this).val().trim();
		mbValidator.fixPrice($(this), _v);
		_v = $(this).val();
		if(parseFloat(_v) < 0){
			_v = "0.00";
			$(this).val(_v);
		}
	});
	return flag;	
}