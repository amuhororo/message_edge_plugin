;【メッセージ縁取りプラグイン Ver.2】2017/6/8
; by hororo http://hororo.wp.xdomain.jp/
;
[iscript]
//初期値設定
mp.edge = mp.edge || TG.config.defaultEdge;
mp.shadow = mp.shadow || TG.config.defaultShadow;
mp.edge_color = mp.edge_color || TG.config.defaultEdgeColor;
mp.shadow_color = mp.shadow_color || TG.config.defaultShadowColor;
mp.edge_blur = mp.edge_blur || "0"; 
mp.edge_offset = mp.edge_offset || "1";
mp.shadow_blur = mp.shadow_blur || "0"; 
mp.shadow_offset = mp.shadow_offset || "1"; 
//カラー値変換
var edge_color = mp.edge_color.replace("0x","#");
var shadow_color = mp.shadow_color.replace("0x","#");
if (mp.edge == "true"){
	var edge = [];
	edge[0] = edge_color + ' ' + mp.edge_offset + 'px ' + mp.edge_offset + 'px ' + mp.edge_blur + 'px'; //上右
	edge[1] = edge_color + ' ' + mp.edge_offset + 'px -' + mp.edge_offset + 'px ' + mp.edge_blur + 'px'; //上左
	edge[2] = edge_color + ' -' + mp.edge_offset + 'px -' + mp.edge_offset + 'px ' + mp.edge_blur + 'px'; //下右
	edge[3] = edge_color + ' -' + mp.edge_offset + 'px ' + mp.edge_offset + 'px ' + mp.edge_blur + 'px'; //下左
	edge[4] = edge_color + ' ' + mp.edge_offset + 'px 0 ' + mp.edge_blur + 'px'; //上
	edge[5] = edge_color + ' -' + mp.edge_offset + 'px 0 ' + mp.edge_blur + 'px'; //下
	edge[6] = edge_color + ' 0 ' + mp.edge_offset + 'px ' + mp.edge_blur + 'px'; //右
	edge[7] = edge_color + ' 0 -' + mp.edge_offset + 'px ' + mp.edge_blur + 'px'; //左
	if (mp.shadow == "true") {
		var shadow_offset = parseInt(mp.shadow_offset) + parseInt(mp.edge_offset); //edge併用の場合edge_offset値分ずらす
		var shadow = edge + ',' + shadow_color + ' ' + shadow_offset + 'px ' + shadow_offset + 'px ' + mp.shadow_blur + 'px';
		var shadow_v = edge + ',' + shadow_color + ' -' + shadow_offset + 'px ' + shadow_offset + 'px ' + mp.shadow_blur + 'px';
	} else {
		var shadow = edge;
		var shadow_v = edge;
	}
}
else if(mp.shadow == "true"){
	var shadow = shadow_color + ' ' + mp.shadow_offset + 'px ' + mp.shadow_offset + 'px ' + mp.shadow_blur + 'px';
	var shadow_v = shadow_color + ' -' + mp.shadow_offset + 'px ' + mp.shadow_offset + 'px ' + mp.shadow_blur + 'px';
};
var style = '<style>.shadow p {text-shadow:' + shadow + '}.shadow p.vertical_text {text-shadow:' + shadow_v + '}.shadow p span{text-shadow:' + shadow + ' !important}.shadow p.vertical_text span{text-shadow:' + shadow_v + ' !important}</style>';
$('head link:last').after(style);
//すべてのメッセージレイヤーにclassを追加
var num = parseInt(TG.config.numMessageLayers);
for (var i=0; i< num ; i++) {
	$(".message"+ i +"_fore").addClass("shadow");
}
[endscript]
[return]
