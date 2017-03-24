/*
 * 营销-优惠券-添加编辑
 */
// 设置时间
function setJedate(){
	//不显示秒的解决办法
	var stxt = $("#start_time").val().trim();
	if(stxt.length == 19){
		$("#start_time").val(stxt.substr(0, 16));
	}
	var etxt = $("#end_time").val().trim();
	if(etxt.length == 19){
		$("#end_time").val(etxt.substr(0, 16));
	}
	var start = {
		dateCell: '#start_time',
		format: 'YYYY-MM-DD hh:mm',
		minDate: '1970-01-01 00:00:00',
		festival: false,
		maxDate: '2099-12-31 23:59:59',
		isinitVal:true,
		isTime: true,
		choosefun: function(datas) {
			end.minDate = datas; 
		}
	};
	var end = {
		dateCell: '#end_time',
		format: 'YYYY-MM-DD hh:mm',
		minDate: '1970-01-01 00:00:00',
		festival: false,
		maxDate: '2099-12-31 23:59:59',
		isinitVal:true,
		isTime: true,
		choosefun: function(datas) {
			start.maxDate = datas;
		}
	};
	jeDate(start);
	jeDate(end);
}
setJedate();
var ychser = new YcChoser();
ychser.setChosenIds($("#yc-goods-ids").val());
function delGoodsItem(o) {
	ychser.isRepeat($(o).attr("data-id"));
	ychser.remove();
	$("#yc-goods-ids").val(ychser.getChosenIds());
	$(o).parents("li").remove();
}
function updateGoodsIds(ids) {
	$("#yc-goods-ids").val(ids);
	ychser.setChosenIds(ids);
}
function showRelativeArea(o){
	var v = parseInt(o.value);
	if (v == 1) {
		$('.money-price-area').show();
		$('.order-price-area').hide();
		$('.set-goods-area').hide();
        $('.youhui_goods-area').show();
        $('.set_goods_name_values').text('设置排除商品');
	}
	if (v == 2) {
		$('.money-price-area').hide();
		$('.order-price-area').show();
		$('.set-goods-area').hide();
		$('.youhui_goods-area').show();
        $('.set_goods_name_values').text('设置排除商品');
	}
	if (v == 3) {
		$('.money-price-area').hide();
		$('.order-price-area').hide();
		$('.set-goods-area').show();
        $('.youhui_goods-area').show();
        $('.set_goods_name_values').text('设置商品');
	}
} 
$('#daterange-btn').click(function () {
	layer.open({
		type: 2,
		title: '添加优惠券商品',
		area: ['1000px', '800px'],
		fixed: false,
		maxmin: true,
		content: yx_product_url
	});
});
$('.ajax-sort').blur(function () {
	var v = $(this).val();
	$.post("/Admin/DiscountCoupon/ajaxSort", {sort:v}, function(result){
		if (result == 1) {
			alert('该排序号已经被使用了');
			$('.ajax-sort').val('');
		}
	});
});
var yhTypeObj = $("#yh-type");
var yhCheckFlag = false;
//检查select对应显示区域内容的填写情况
function checkSubmit(){
	var v = parseInt(yhTypeObj.val());
	var curVal;
	var tmpVal;
	var tmpFlag;
	var o;
	
	yhCheckFlag = false;
	if(v == 1){
		//验证现金优惠券
		o = $('#money_price');			
		mbValidator.fixPrice(o, o.val());
		curVal = parseFloat(o.val());
		if(curVal < 0.01){
			GErr.show(o, "输入的金额必须大于等于0.01");
		}else{
			yhCheckFlag = true;
			GErr.remove(o);	
		}
	}else if(v == 2){
		o = $('#man_price');			
		mbValidator.fixPrice(o, o.val());
		curVal = parseFloat(o.val());
		tmpFlag = false;
		if(curVal < 0.01){
			GErr.show(o, "输入的金额必须大于等于0.01");
		}else{
			tmpFlag = true;
			GErr.remove(o);	
		}
		yhCheckFlag = tmpFlag;
		tmpFlag = false;
		tmpVal = curVal;
		o = $("#youhui_price");
		mbValidator.fixPrice(o, o.val());
		curVal = parseFloat(o.val());
		if(curVal < 0.01){
			GErr.show(o, "输入的金额必须大于等于0.01");
		}else if(curVal >= tmpVal){
			GErr.show(o, "输入的金额必须小于"+tmpVal);
		}else{
			tmpFlag = true;
			GErr.remove(o);	
		}
		yhCheckFlag = yhCheckFlag && tmpFlag;
	}else if(v == 3){
		o = $("#yc-goods-ids");
		tmpFlag = false;
		if(mbValidator.isEmpty(o.val())){			
			GErr.show(o, "请至少选择一个商品");
		}else{
			tmpFlag = true;
			GErr.remove(o);	
		}
		yhCheckFlag = tmpFlag;
		tmpFlag = false;
		o = $('#goods_price');
		mbValidator.fixPrice(o, o.val());
		curVal = parseFloat(o.val());
		if(curVal < 0.01){
			GErr.show(o, "输入的金额必须大于等于0.01");
		}else{
			tmpFlag = true;
			GErr.remove(o);	
		}
		yhCheckFlag = yhCheckFlag && tmpFlag;
	}
	return yhCheckFlag;
}
//表单验证
$("#form").validate({
	rules: {
		name:{
			required: true,
			rangelength:[2, 50]
		},
		start_time:{
			required: true,
			isActTime: true
		},
		end_time:{
			required: true,
			isActTime: true,
			dateTimeBigThan: "#start_time"
		}
	},
	messages:{
		name:{
			required: "请输入优惠券名称"
		},
		begin_time:{
			required: "请输入开始时间"
		},
		end_time:{
			required: "请输入结束时间",
			dateTimeBigThan: "【注意：】结束时间不能小于开始时间"
		}
	},
	submitHandler: function(form){
		if(yhCheckFlag){
			form.submit();   //提交表单	
		}
	}
});