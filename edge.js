//【メッセージ縁取りプラグイン Ver.3.00】2021/02/23
// by hororo http://hororo.wp.xdomain.jp/

function message_edge(pm) {
	//初期値設定 *flagはビルダー用
	if(pm.edge_flag != "true") pm.edge = "";
	if(pm.shadow_flag != "true") pm.shadow = "";
	if(pm.edge && pm.edge.match(/0x/)) pm.edge = $.convertColor(pm.edge);
	if(pm.shadow && pm.shadow.match(/0x/)) pm.shadow = $.convertColor(pm.shadow);
	if(!pm.edge_blur) pm.edge_blur = "0";
	if(!pm.edge_offset) pm.edge_offset = "1";
	if(!pm.shadow_blur) pm.shadow_blur = "0";
	if(!pm.shadow_offset) pm.shadow_offset = "1";
	if (pm.edge && pm.shadow){
		pm.shadow_offset = parseInt(pm.shadow_offset) + parseInt(pm.edge_offset); //edge併用の場合edge_offset値分ずらす
	}
	var edge = "";
	var shadow = "";
	var layer;

	if(pm.edge){
		edge = [];
		edge[0] = pm.edge + ' ' + pm.edge_offset + 'px ' + pm.edge_offset + 'px ' + pm.edge_blur + 'px'; //上右
		edge[1] = pm.edge + ' ' + pm.edge_offset + 'px -' + pm.edge_offset + 'px ' + pm.edge_blur + 'px'; //上左
		edge[2] = pm.edge + ' -' + pm.edge_offset + 'px -' + pm.edge_offset + 'px ' + pm.edge_blur + 'px'; //下右
		edge[3] = pm.edge + ' -' + pm.edge_offset + 'px ' + pm.edge_offset + 'px ' + pm.edge_blur + 'px'; //下左
		edge[4] = pm.edge + ' ' + pm.edge_offset + 'px 0 ' + pm.edge_blur + 'px'; //上
		edge[5] = pm.edge + ' -' + pm.edge_offset + 'px 0 ' + pm.edge_blur + 'px'; //下
		edge[6] = pm.edge + ' 0 ' + pm.edge_offset + 'px ' + pm.edge_blur + 'px'; //右
		edge[7] = pm.edge + ' 0 -' + pm.edge_offset + 'px ' + pm.edge_blur + 'px'; //左
	}
	if (pm.shadow) {
		if(pm.vertical=="true"){
			shadow = pm.shadow + ' -' + pm.shadow_offset + 'px ' + pm.shadow_offset + 'px ' + pm.shadow_blur + 'px';
		}else{
			shadow = pm.shadow + ' ' + pm.shadow_offset + 'px ' + pm.shadow_offset + 'px ' + pm.shadow_blur + 'px';
		}
		if(pm.edge) edge = edge + ',' + shadow;
		else  edge = shadow;
	}

	if(pm.layer){
		if(pm.layer.match(/message/) || $.isNumeric(pm.layer)){
			layer = $("."+pm.layer+"_fore");
			if(pm.find == "chara_name") layer = layer.find(".chara_name_area");
			else if(pm.find == "message") layer = layer.find(".message_inner");
		}else{
			layer = $("."+pm.layer);
			if(pm.find) layer = layer.find("."+pm.find);
		}
		if(pm.clear!="false") layer.css("text-shadow","initial");
		else layer.css("text-shadow",edge);
	}else{
		var num = parseInt(TYRANO.kag.config.numMessageLayers);
		for (var i=0; i< num ; i++) {
			layer = $(".message"+ i +"_fore");
			if(pm.find == "chara_name") layer = layer.find(".chara_name_area");
			else if(pm.find == "message") layer = layer.find(".message_inner");
			if(pm.clear!="false") layer.css("text-shadow","initial");
			else layer.css("text-shadow",edge);
		}
	}
};
