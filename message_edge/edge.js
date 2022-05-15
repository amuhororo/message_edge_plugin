//【メッセージ縁取りプラグイン】
// Ver.3.01 2022/5/15
// by hororo https://memocho.no-tenki.me/

if(typeof memocho === 'undefined') {
	var memocho = {};
	memocho.tag = {};
};

memocho.tag.message_edge = {
	pm : {
		edge_flag : "true",
		shadow_flag : "true",
		edge_blur : "1",
		edge_offset : "1",
		shadow_blur : "1",
		shadow_offset : "1",
		clear : "false",
		vertical : "false"
	},
	start : function(pm) {
		//初期値設定 *flagはビルダー用
		if(pm.edge_flag == "false") pm.edge = "";
		if(pm.shadow_flag == "false") pm.shadow = "";
		if(pm.edge) pm.edge = $.convertColor(pm.edge);
		if(pm.shadow) pm.shadow = $.convertColor(pm.shadow);
		if (pm.edge && pm.shadow){
			pm.shadow_offset = parseInt(pm.shadow_offset) + parseInt(pm.edge_offset); //edge併用の場合edge_offset値分ずらす
		}
		let edge = "";
		let shadow = "";
		let layer;
		const find = {
			"chara_name" : ".chara_name_area",
			"message" : ".message_inner"
		};

		//縁取り
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

		//影
		if (pm.shadow) {
			if(pm.vertical == "true"){
				shadow = pm.shadow + ' -' + pm.shadow_offset + 'px ' + pm.shadow_offset + 'px ' + pm.shadow_blur + 'px';
			}else{
				shadow = pm.shadow + ' ' + pm.shadow_offset + 'px ' + pm.shadow_offset + 'px ' + pm.shadow_blur + 'px';
			}
			if(pm.edge) edge = edge + ',' + shadow;
			else  edge = shadow;
		}

		if(pm.layer){
			if(pm.layer.match(/message/) || $.isNumeric(pm.layer)){
				for (let key in find) {
					if(!pm.find || pm.find == key){
						layer = $("."+pm.layer+"_fore").find(find[key]);
						if(pm.clear == "true") layer.css("text-shadow","");
						else layer.css("text-shadow",edge);
					}
				}
			}else{
				layer = $("."+pm.layer);
				if(pm.find) layer = layer.find("."+pm.find);
				if(pm.clear == "true") layer.css("text-shadow","");
				else layer.css("text-shadow",edge);
			}
		}else{
			const num = parseInt(TYRANO.kag.config.numMessageLayers);
			for (let i=0; i< num ; i++) {
				for (let key in find) {
					if(!pm.find || pm.find == key){
						layer = $(".message"+ i +"_fore").find(find[key]);
						if(pm.clear == "true") layer.css("text-shadow","");
						else layer.css("text-shadow",edge);
					}
				}
			}
		}
		TYRANO.kag.ftag.nextOrder();
	}
}

//ティラノスクリプトにタグを定義
TYRANO.kag.ftag.master_tag.message_edge = object(memocho.tag.message_edge);
TYRANO.kag.ftag.master_tag.message_edge.kag = TYRANO.kag;
