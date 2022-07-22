//【メッセージ縁取りプラグイン】
// Ver.3.03 2022/7/22
// by hororo https://memocho.no-tenki.me/

(function(){
	
	const message_edge = {
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
			let edge = [];
			let shadow = "";
			let layer;

			//縁取り
			if(pm.edge){
				pm.edge = $.convertColor(pm.edge);
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
			if(pm.shadow) {
				pm.shadow = $.convertColor(pm.shadow);
				//edge併用の場合edge_offset値分ずらす
				if(pm.edge) pm.shadow_offset = parseInt(pm.shadow_offset) + parseInt(pm.edge_offset);
				//縦書きか
				if(pm.vertical == "true"){
					shadow = pm.shadow + ' -' + pm.shadow_offset + 'px ' + pm.shadow_offset + 'px ' + pm.shadow_blur + 'px';
				}else{
					shadow = pm.shadow + ' ' + pm.shadow_offset + 'px ' + pm.shadow_offset + 'px ' + pm.shadow_blur + 'px';
				}
				edge.push(shadow);
			}

			//クリア
			if(pm.clear == "true") edge = "";

			//スタイル指定
			if(pm.layer){
				layer = pm.layer.match(/message|[0-9]/) ? $("."+pm.layer+"_fore") : $("."+pm.layer);
				if(pm.layer.match(/message/)){
					message_style();
				} else {
					if(pm.find) layer = layer.find("."+pm.find);
					layer.css("text-shadow",edge);
				}
			}else{
				const num = parseInt(TYRANO.kag.config.numMessageLayers);
				for(let i=0; i< num ; i++) {
					layer = $(".message"+ i +"_fore");
					message_style();
				}
			}

			function message_style(){
				const find = {
					"chara_name" : ".chara_name_area",
					"message" : ".message_inner"
				};
				for(let key in find) {
					if(!pm.find || pm.find == key){
						layer.find(find[key]).css("text-shadow",edge);
					}
				}
			}

			TYRANO.kag.ftag.nextOrder();
		}
	};

	//ティラノスクリプトにタグを定義
	TYRANO.kag.ftag.master_tag.message_edge = object(message_edge);
	TYRANO.kag.ftag.master_tag.message_edge.kag = TYRANO.kag;

}());
