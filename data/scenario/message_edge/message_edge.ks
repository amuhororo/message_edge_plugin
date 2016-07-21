;【メッセージ縁取りプラグイン】2016/7/21
; by hororo http://hororo.wp.xdomain.jp/
;
; ＜機能＞
;　　Config.tjs にある、影や縁取り機能を有効にします。
;　　縁取りと影、両方有効になります。
;　　CSSで設定するのが面倒な方に…私です。
;
; ＜注意点＞
;　　縁取りはtext-shadowを4方向に指定してるだけです。
;　　フォントの種類、ブラウザなど、環境によっては綺麗に縁取られない場合があります。
;　　全てのメッセージレイヤーに適応されます。
;
;　　ティラノスクリプトVer420 で動作確認。
;
; ＜使い方＞
;  　最初に、message_edge.ksを読み込んでください。
;  　[call storage="message_edge/message_edge.ks"]
;
;　　影、縁取りの使用切り替え、色指定はCinfig.tsjで設定してください。
;
[iscript]
//設定
//◆縁取りぼかし値
var blur = '1px';
//◆縁取りサイズ値
var offset = '1px';
//◆影ぼかし値
var shadow_blur = '1px';
//◆影位置
var shadow_offset = '1px';

//////以下変更不可/////////////////////////////////////////////////

var color = TG.config.defaultEdgeColor;
color = color.replace("0x","#");

var shadow_color = TG.config.defaultShadowColor;
shadow_color = shadow_color.replace("0x","#");

if (TG.config.defaultEdge == "true"){
	var edge = [];
	edge[0] = color + ' ' + offset + ' ' + offset + ' ' + blur;
	edge[1] = color + ' ' + offset + ' -' + offset + ' ' + blur;
	edge[2] = color + ' -' + offset + ' -' + offset + ' ' + blur;
	edge[3] = color + ' -' + offset + ' ' + offset + ' ' + blur;

	if (TG.config.defaultShadow == "true") {
		var shadow_offset = (parseInt(shadow_offset) + 1 ) + 'px';

		var shadow = edge + ',' + shadow_color + ' ' + shadow_offset + ' ' + shadow_offset + ' ' + shadow_blur;
		var shadow_v = edge + ',' + shadow_color + ' -' + shadow_offset + ' ' + shadow_offset + ' ' + shadow_blur;
	} else {
		var shadow = edge;
		var shadow_v = edge;
	}
}
else if(TG.config.defaultShadow == "true"){
	var shadow = shadow_color + ' ' + shadow_offset + ' ' + shadow_offset + ' ' + shadow_blur;
	var shadow_v = shadow_color + ' -' + shadow_offset + ' ' + shadow_offset + ' ' + shadow_blur;
};

var style = '<style>.shadow p {text-shadow:' + shadow + '}.shadow p.vertical_text {text-shadow:' + shadow_v + '}</style>';
$('head link:last').after(style);

//すべてのメッセージレイヤーにclassを追加
var num = parseInt(TG.config.numMessageLayers);
for (var i=0; i< num ; i++) {
	$(".message"+ i +"_fore").addClass("shadow");
}
[endscript]
[return]
