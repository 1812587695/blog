/*结算异议js*/

//异议提交时候的url
var yc_yy_url = "";
var _isYYSubmit = false;

 $('.yc-yy-operate').on('click', function(){
	$('#myYYModal').modal('show');
});
// 构建时间
function buildDate(time) {
	if(time) {
		var date = new Date(time*1000);
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds();
		return Y+M+D+h+m+s;
	} else {
		return '';
	}
}
// 渲染异议列表
function renderYYList(list){
	if(list){
		var html='';
		for (var i=0; i<list.length; i++) {
			html += '<p class="message">';
			html += '<span>';
			html += '<small class="text-muted pull-right">';
			html += '<i class="fa fa-clock-o"></i>'+buildDate(list[i]['time']);
			html += '</small>';
			html += list[i]['name'];
			html += '</span>';
			if (list[i]['role'] != 'store') {
				html += '<span class="ft-blue">(平台)</span>';
			} else {
				html += '<span class="ft-blue">(店铺)</span>';
			}
			if (list[i]['tel'] != '') {
				html += '&nbsp;&nbsp;&nbsp;&nbsp;<span class="ft-blue">tel:</span>'+list[i]["tel"]+'';
			}
			html += '<br>';
			html += '<span class="ft-blue">备注内容：</span>';
			html += '<span>';
			html += list[i]["desc"];
			html += '</span>';
			html += '</p>';
		}
		$('#commentarea').append(html);
	}
}

//保存异议数据
function saveYYFormData() {
	if(_isYYSubmit) return;
	_isYYSubmit = true;
	var _desc = $("#yy_desc").val();
	var _name = $("#yy_name").val();
	var _tel = $("#yy_tel").val();
	var _id = $("#yy_id").val();
	 var _data = {"id":_id, "name":_name, "tel":_tel, "desc":_desc};
	 GPopup.loadDialog();
	 $.ajax({
		url: yc_yy_url,
		type: 'POST',
		dataType: 'json',
		data: _data,
		success: function(rs){
			GPopup.removeLoad();
			if(rs.status) {
				layer.msg(rs.message, function(){
					$('#myYYModal').modal('hide');
					window.location.reload();
				 });
			}else{
				GPopup.alertTip(rs.message);
			}
			_isYYSubmit = false;
		},
		error: function(){
			GPopup.removeLoad();
			GPopup.alertTip('服务器异常，请稍后重试！');
			_isYYSubmit = false;
		}
	});
}
$('#yy-form-mark').validate({
	rules: {
		desc: {
			required: true,
			rangelength :[2,500]
		},
		name: {
			required: true,
			rangelength :[1,20]
		},
		tel:{
			required: true,
			isMobile: true
		}
	},
	messages: {
		desc: {
			required: '备注必填',
		},
		name: {
			required: '联系人必填',
		},
		tel: {
			required: '联系电话必填',
			isMobile: '联系电话格式有误 如(13688888888)'
		}
	},
	submitHandler: function(){
		saveYYFormData();
	}
});