var menu_position = 1;
var menu_pos_faceup_attack = 1 << 1;
var menu_pos_faceup_defence = 1 << 2;
var menu_pos_facedown_defence = 1 << 3;
var menu_pos_facedown_attack = 1 << 4;
var menu_enable_revivelimit = 1 << 5;
var menu_disable_revivelimit = 1 << 6;
var menu_target = 1 << 7;
var menu_equip = 1 << 8;
var menu_counter = 1 << 9;
var menu_show_list = 1 << 10;

var PopMenu = function createPopMenu(){
	var popMenu = document.getElementById("popMenu");
	var aUl = popMenu.getElementsByTagName("ul");
	var aLi = popMenu.getElementsByTagName("li");
	var showTimer = hideTimer = null;
	var i = 0;
	var maxWidth = maxHeight = 0;
	var aDoc = [document.documentElement.offsetWidth, document.documentElement.offsetHeight];
	var thumb;//弹出右键菜单的thumb
	popMenu.style.display = "none";
	for (i = 0; i < aLi.length; i++){
		//为含有子菜单的li加上箭头
		aLi[i].getElementsByTagName("ul")[0] && (aLi[i].className = "sub");
		
		aLi[i].onmouseover = function (){
			var oThis = this;
			var oUl = oThis.getElementsByTagName("ul");
			oThis.className += " active";   
			//显示子菜单
			if (oUl[0]){
				clearTimeout(hideTimer);    
				showTimer = setTimeout(function (){
					for (i = 0; i < oThis.parentNode.children.length; i++){
						oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
						(oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
					}
					oUl[0].style.display = "block";
					oUl[0].style.top = oThis.offsetTop + "px";
					oUl[0].style.left = oThis.offsetWidth + "px";
					setWidth(oUl[0]);
					//最大显示范围
					maxWidth = aDoc[0] - oUl[0].offsetWidth;
					maxHeight = aDoc[1] - oUl[0].offsetHeight;
					//防止溢出
					maxWidth < getOffset.left(oUl[0]) && (oUl[0].style.left = -oUl[0].clientWidth + "px");
					maxHeight < getOffset.top(oUl[0]) && (oUl[0].style.top = -oUl[0].clientHeight + oThis.offsetTop + oThis.clientHeight + "px")
				},300);
			}
		};

		aLi[i].onmouseout = function (){
			var oThis = this;
			var oUl = oThis.getElementsByTagName("ul");
			oThis.className = oThis.className.replace(/\s?active/,"");
			clearTimeout(showTimer);
			hideTimer = setTimeout(function (){
				for (i = 0; i < oThis.parentNode.children.length; i++){
					oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
					(oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
				}
			},300);
		};
	}
	
	//各菜单项的响应事件
	aLi[1].onmousedown = function(event){//表侧攻击表示
		var tmplItem = $(thumb).tmplItem().data;
		var card_id = tmplItem.card_info.card_id;
		thumb.src = card_img_thumb_url + card_id + ".jpg";
		tmplItem.card_info.position = "POS_FACEUP_ATTACK";
		if(isIE){
			thumb.style.top = tmplItem.top + "px";
			thumb.style.left = tmplItem.left + "px";
		}
		else {
			thumb.style.left = tmplItem.left + "px";
		}
		Img.rotate(thumb, 0);
	}
	aLi[2].onmousedown = function(event){//表侧守备表示
		var tmplItem = $(thumb).tmplItem().data;
		var card_id = tmplItem.card_info.card_id;
		thumb.src = card_img_thumb_url + card_id + ".jpg";
		tmplItem.card_info.position = "POS_FACEUP_DEFENCE";
		if(isIE){
			thumb.style.top = 13 + "px";
			thumb.style.left = 0 + "px";
		}
		else {
			thumb.style.left = 10 + "px";
		}
		Img.rotate(thumb, -90);
	}
	aLi[3].onmousedown = function(event){//里侧守备表示
		var tmplItem = $(thumb).tmplItem().data;
		var card_id = tmplItem.card_info.card_id;
		thumb.src = "images/unknow.jpg";
		tmplItem.card_info.position = "POS_FACEDOWN_DEFENCE";
		if(isIE){
			thumb.style.top = 13 + "px";
			thumb.style.left = 0 + "px";
		}
		else {
			thumb.style.left = 10 + "px";
		}
		Img.rotate(thumb, -90);
	}
	aLi[4].onmousedown = function(event){//里侧攻击表示
		var tmplItem = $(thumb).tmplItem().data;
		var card_id = tmplItem.card_info.card_id;
		thumb.src = "images/unknow.jpg";
		tmplItem.card_info.position = "POS_FACEDOWN_ATTACK";
		if(isIE){
			thumb.style.top = tmplItem.top + "px";
			thumb.style.left = tmplItem.left + "px";
		}
		else {
			thumb.style.left = tmplItem.left + "px";
		}
		Img.rotate(thumb, 0);
	}
	aLi[5].onmousedown = function(event){//不解除苏生限制
		var tmplItem = $(thumb).tmplItem().data;
		tmplItem.card_info.disable_revivelimit = false;
	}
	aLi[6].onmousedown = function(event){//解除苏生限制
		var tmplItem = $(thumb).tmplItem().data;
		tmplItem.card_info.disable_revivelimit = true;
	}
	aLi[7].onmousedown = function(event){//设置永续效果对象
		thumb_continuous = thumb;
		selectingContinuous = true;
		var fields = document.getElementById("fields").getElementsByTagName("div");
		for(var i=0; i< fields.length;i++){
			var tmplItem = $(fields[i]).tmplItem().data;
			var location = tmplItem.location;
			if(location == 'mzone' || location == 'szone'){
				var thumbs = fields[i].getElementsByClassName("thumb");
				if(thumbs.length != 0){
					var card_info = $(thumbs[thumbs.length-1]).tmplItem().data.card_info;
					card_info.IsSelectable = true;
				}
			}
		}
	}
	aLi[8].onmousedown = function(event){//设置装备对象
		thumb_equip = thumb;
		selectingEquip = true;
		var fields = document.getElementById("fields").getElementsByTagName("div");
		for(var i=0; i< fields.length;i++){
			var tmplItem = $(fields[i]).tmplItem().data;
			var location = tmplItem.location;
			if(location == 'mzone'){
				var thumbs = fields[i].getElementsByClassName("thumb");
				if(thumbs.length != 0){
					var card_info = $(thumbs[thumbs.length-1]).tmplItem().data.card_info;
					card_info.IsSelectable = true;
				}
			}
		}
	}
	aLi[9].onmousedown = function(event){//放置指示物
		var tmplItem = $(thumb).tmplItem().data;
		var card_counters = tmplItem.card_info.card_counters;
		var counterSelectors = $('#counterSelectors');
		counterSelectors.empty();
		if(card_counters.length == 0){	
			addCounterSelector();//增加默认的指示物选择器
		}
		else {
			for(var i=0; i<card_counters.length; i++){//设置指示物选择器中已选中的项以及数量
				addCounterSelector(card_counters[i].code, card_counters[i].number);
			}
		}
		$('#add_counter_dialog').dialog('open');
		return false;
	}
	aLi[10].onmousedown = function(event){//调整顺序
		var field = thumb.parentNode;
		var sortable = $('#sortable');
		sortable.empty();
		var card_list = $.data(field, 'card_list');
		for(var i in card_list){
			$("#sortable-tmpl").tmpl({
				card_info: card_list[i],
				card_img_thumb_url: card_img_thumb_url
			}).appendTo(sortable);
		}
		sortable.sortable();
		sortable.disableSelection();
		$('#show_list_dialog').dialog('open');
		return false;
	}
	
	this.show = function (event){
		var event = event || window.event;
		thumb = event.target;
		var tmplItem = $(thumb).tmplItem().data;
		var card_info = tmplItem.card_info;
		var location = card_info.location;
		var menuItems = 0;
		if(location == 'mzone'){
			if(!card_info.IsXYZmaterial){
				menuItems = menu_position + menu_pos_faceup_attack + menu_pos_faceup_defence + menu_pos_facedown_defence + menu_pos_facedown_attack
				+ menu_target + menu_counter;
			}
			if(card_info.disable_revivelimit){
				menuItems += menu_enable_revivelimit;
			}
			else {
				menuItems += menu_disable_revivelimit;
			}
		}
		else if(location == 'szone'){
			menuItems = menu_position + menu_pos_faceup_attack + menu_pos_facedown_attack + menu_target + menu_equip + menu_counter;
		}
		else if(location == 'field'){
			menuItems = menu_position + menu_pos_faceup_attack + menu_pos_facedown_attack + menu_target + menu_counter;
		}
		else if(location == 'grave'){
			if(card_info.disable_revivelimit){
				menuItems += menu_enable_revivelimit;
			}
			else {
				menuItems += menu_disable_revivelimit;
			}
		}
		else if(location == 'hand'){
			menuItems = 0;
		}
		else if(location == 'deck'){
			menuItems = 0;
		}
		else if(location == 'extra'){
			menuItems = 0;
		}
		else if(location == 'removed'){
			menuItems = 0;
		}
		menuItems += menu_show_list;
		if(menuItems == 0) return false;
		setMenu(menuItems);
		for(var i=1;i<5;i++){
			aLi[i].className = aLi[i].className.replace(/\s?check/,"");
		}
		if(card_info.position == "POS_FACEUP_ATTACK"){
			aLi[1].className += " check";
		}
		else if(card_info.position == "POS_FACEUP_DEFENCE"){
			aLi[2].className += " check";
		}
		else if(card_info.position == "POS_FACEDOWN_DEFENCE"){
			aLi[3].className += " check";
		}
		else if(card_info.position == "POS_FACEDOWN_ATTACK"){
			aLi[4].className += " check";
		}
		
		popMenu.style.display = "block";
		popMenu.style.top = getMousePos(event).y + "px";
		popMenu.style.left = getMousePos(event).x + "px";
		setWidth(aUl[0]);
		//最大显示范围
		maxWidth = aDoc[0] - popMenu.offsetWidth;
		maxHeight = aDoc[1] - popMenu.offsetHeight;
		//防止菜单溢出
		popMenu.offsetTop > maxHeight && (popMenu.style.top = maxHeight + "px");
		popMenu.offsetLeft > maxWidth && (popMenu.style.left = maxWidth + "px");
		return false;
	};

	this.hide = function (){
		popMenu.style.display = "none" 
	};
	
	function setMenu(menuItems){
		for(var i=0; i<aLi.length; i++){
			if(menuItems & 1)
				aLi[i].style.display = 'block';
			else
				aLi[i].style.display = 'none';
			menuItems = menuItems >> 1;
		}
	}

	function setWidth(obj){
		maxWidth = 0;
		for (var i = 0; i < obj.children.length; i++){
			var oLi = obj.children[i];   
			var iWidth = oLi.clientWidth - parseInt(oLi.currentStyle ? oLi.currentStyle["paddingLeft"] : getComputedStyle(oLi,null)["paddingLeft"]) * 2;
			if (iWidth > maxWidth)
				maxWidth = iWidth;
		}
		if(maxWidth > 0){
			for (i = 0; i < obj.children.length; i++)
				obj.children[i].style.width = maxWidth + "px";
		}
	}
	
	$("#add_counter_dialog").dialog({
		autoOpen: false,
		resizable: false,
		show: "clip",
		hide: "puff",
		modal: true,
		width: 450,
		buttons: {
			"确定": function() {
				addCounter(this, thumb);
				$( this ).dialog({hide: "clip"});
				$( this ).dialog( "close" );
				$( this ).dialog({hide: "puff"});
			},
			"取消": function() {
				$( this ).dialog( "close" );
			}
		}
	});
	$("#show_list_dialog").dialog({
		autoOpen: false,
		resizable: false,
		show: "clip",
		hide: "puff",
		modal: true,
		width: 450,
		buttons: {
			"确定": function() {
				sort(this, thumb.parentNode);
				$( this ).dialog({hide: "clip"});
				$( this ).dialog( "close" );
				$( this ).dialog({hide: "puff"});
			},
			"取消": function() {
				$( this ).dialog( "close" );
			}
		}
	});
}
function delCounterSelector(ev){//删除同一行的选择器
	ev         = ev || window.event;
	var target = ev.target || ev.srcElement;
	var div = target.parentNode;
	div.parentNode.removeChild(div);
}
function addCounterSelector(code, number){//添加选择器
	$("#CounterSelector-tmpl").tmpl({
		counters: counters,
		_code: code || "0x3001",
		_number: number || 1
	}).appendTo($('#counterSelectors'));
	$('.spinner').spinner({//设置指示物的数量不能小于1
		spin: function( event, ui ) {
			if ( ui.value < 1 ) {
				return false;
			}
		}
	});
}
function addCounter(dialog, thumb){//根据dialog的内容更新thumb
	var tmplItem = $(thumb).tmplItem().data;
	var card_info = tmplItem.card_info;
	card_info.card_counters = [];
	var CounterSelectors = dialog.getElementsByClassName("CounterSelector");
	for(var i=0; i<CounterSelectors.length; i++){
		var select = CounterSelectors[i].getElementsByTagName("select")[0];
		var input = CounterSelectors[i].getElementsByTagName("input")[0];
		var code = select.value;
		var number = input.value;
		card_info.card_counters[i] = {code : code , number : number};
	}
}
function sort(dialog, field){//根据dialog的顺序更新field
	var thumbs = dialog.getElementsByClassName("thumb");
	var card_list = [];
	for(var i =0; i < thumbs.length; i++){
		var tmplItem = $(thumbs[i]).tmplItem().data;
		var card_info = tmplItem.card_info;
		card_list[i] = card_info;
	}
	$.data(field, 'card_list', card_list);
	updateField(field);
}
var getOffset = {
	top: function (obj) {
		return obj.offsetTop + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0) 
	},
	left: function (obj) {
		return obj.offsetLeft + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0) 
	} 
};
var speed = 1;
var Img = function() {
	var rotate = function(thumb, degree, immediatily) {
		if(immediatily){
			run(degree);
			return false;
		}
		if(isIE){
			run(degree);
			return false;
		}
		var i = 0, timer = null ;
		var deg_begin = $.data(thumb, "degree");
		clearInterval(timer);

		timer = setInterval(function() {
			if(deg_begin < degree){
				i += 1;
				run(deg_begin + i);
				if (deg_begin + i >= degree) {
					i = 0;
					clearInterval(timer);
				}
			}
			else if(deg_begin > degree){
				i -= 1;
				run(deg_begin + i);
				if (deg_begin + i <= degree) {
					i = 0;
					clearInterval(timer);
				}
			}
		}, speed);
		function run(angle) {
			if (isIE) { // IE
				var Matrix; 
				for(p in thumb.filters) {
					if(p=="DXImageTransform.Microsoft.Matrix")Matrix=thumb.filters["DXImageTransform.Microsoft.Matrix"];
				}
				if(!Matrix) {
					thumb.style.filter+="progid:DXImageTransform.Microsoft.Matrix(enabled=true,SizingMethod=clip to original,FilterType=nearest neighbor)";
				}
				Matrix=thumb.filters["DXImageTransform.Microsoft.Matrix"];
				Matrix.SizingMethod = "auto expand";//Notice this code,it's very important
				thumb.Matrix=Matrix;
				var t=Math.PI*angle/180;
				var c=Math.cos(t);
				var s=Math.sin(t);
				with(thumb.Matrix){Dx=0; M11=c; M12=-1*s; M21=s; M22=c;}
			} else if (thumb.style.MozTransform !== undefined) {  // Mozilla
				thumb.style.MozTransform = 'rotate(' + angle + 'deg)';
			} else if (thumb.style.OTransform !== undefined) {   // Opera
				thumb.style.OTransform = 'rotate(' + angle + 'deg)';
			} else if (thumb.style.webkitTransform !== undefined) { // Chrome Safari
				thumb.style.webkitTransform = 'rotate(' + angle + 'deg)';
			} else {
				thumb.style.transform = "rotate(" + angle + "deg)";
			}
			
			$.data(thumb, "degree", angle);
		}
	}
	
	
	return {rotate: rotate}
}();
