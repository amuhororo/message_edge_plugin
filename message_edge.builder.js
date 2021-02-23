/*
    ティラノビルダープラグイン開発用のテンプレート
    まず、このファイルを編集してプラグイン開発を試してみると良いでしょう。
*/

'use strict';
module.exports = class plugin_setting {

    constructor(TB) {

        /* TBはティラノビルダーの機能にアクセスするためのインターフェスを提供する */
        this.TB = TB;

        /* プラグイン名を格納する */
        this.name= TB.$.s("メッセージ縁取りプラグイン");

        /*プラグインの説明文を格納する*/
        this.plugin_text= TB.$.s("全てのメッセージエリア・キャラ名に、縁取り・影設定を有効にするプラグインです。<br>影と縁取りを同時に付けられます。");

        /*プラグイン説明用の画像ファイルを指定する。プラグインフォルダに配置してください*/
        this.plugin_img = "message_edge.jpg";

    }


    /* プラグインをインストールを実行した時１度だけ走ります。フォルダのコピーなどにご活用ください。*/
    triggerInstall(){

        /*
        //プラグインからプロジェクトにファイルをコピーするサンプルです
        var project_path = TB.getProjectPath() ;
        var from_path = project_path + "data/others/plugin/plugin_template/copy_folder";
        var to_path = project_path + "data/image/copy_folder";
        TB.io.copy(from_path,to_path);
        */

    }

    /*
        追加するコンポーネントを定義します。
    */

    defineComponents(){

        var cmp = {};
        var TB = this.TB;


        /*
            cmp配列
            cmpにプラグイン用のコンポーネントを定義していきます。
            配列名にはタグ名を指定してください。
            他のタグと被らないように世界で一つだけの名称になるように工夫してください。
            （自分の所持しているドメイン名を含めるなど）
        */

        /*
            sample_component_1
            次のパラメータのサンプルを設置
            Image:イメージ選択

        */

        cmp["message_edge"] = {

            "info":{

                "default":true, /*trueを指定するとコンポーネントがデフォルトで配置されます。*/
                "name":TB.$.s("メッセージ縁取り"), /* コンポーネント名称 */
                "help":TB.$.s("メッセージエリア・キャラ名に、縁取り・影設定を有効にするプラグインです。影と縁取りを同時に付けられます。"), /* コンポーネントの説明を記述します */
                "icon":TB.$.s("s-icon-star-full") /* ここは変更しないでください */

            },

            /* コンポーネントの情報の詳細を定義します */

            "component":{

                name : TB.$.s("メッセージ縁取り"), /* コンポーネント名称 */
                component_type : "Simple", /*タイムラインのコンポーネントタイプ Simple Movie Image Text Soundが指定可能 */

                /*ビューに渡す値*/
                default_view : {
                    base_img_url : "data/bgimage/",  /*画像選択のベースとなるフォルダを指定*/
                    icon : "s-icon-star-full", /*変更しない*/
                    icon_color : "#FFFF99", /*変更しない*/
                    category : "plugin" /*変更しない*/
                },
								header:function(e){
									var edge_find="";
									var edge_clear="";
									if(e.data.pm.find=="")edge_find="全て";
									else if(e.data.pm.find=="chara_name")edge_find="キャラ名のみ";
									else if(e.data.pm.find=="message")edge_find="メッセージのみ";
									//if(e.data.pm.vertical==true)edge_clear="縦書き";
									//if(e.data.pm.clear==true)edge_clear="削除";
									return edge_find //+ " " + edge_clear
								},
                /*変更しない*/
                param_view : {
                },

                /* コンポーネントのパラメータを定義していきます */
                param:{

									/*セレクトボックス形式 */
									"find" : {
										type : "Select",
										select_list : [
										{
											name : TB.$.s("全て"),
											val : ""
										}, {
											name : TB.$.s("キャラ名のみ"),
											val : "chara_name"
										}, {
											name : TB.$.s("メッセージのみ"),
											val : "message"
										}],
										default_val : "",
										name : TB.$.s("縁取りするエリアを指定します"),
										//help : TB.$.s("切り替え中にクリックすることで演出をスキップできるようにするか否か"),
									},

									"clear" : {
											type : "Check",   /*パラメータのタイプです。これは画像選択の場合*/
											text : TB.$.s("削除 ※優先"),
											/*name : TB.$.s("削除"),*/
											help : TB.$.s("チェックが入っている場合は「削除」が優先されます。"),
											default_val : false
									},

									"vertical" : {
											type : "Check",   /*パラメータのタイプです。これは画像選択の場合*/
											text : TB.$.s("縦書き"),
											/*name : TB.$.s("縦書き"),*/
											help : TB.$.s("縦書きの場合はチェックを入れてください。影の付く方向が変わります。"),
											default_val : false
									},

                    /*画像選択の例*/
                    "edge_flag" : {
                        type : "Check",   /*パラメータのタイプです。これは画像選択の場合*/
                        text : TB.$.s("縁取りをする"),
												/*name : TB.$.s("縁取り"),*/
												help : TB.$.s("チェックが入ってないと縁取りは付きません。"),
                        default_val : true
                    },

                    /*カラー選択の形式*/
                    "edge" : {
                        type : "Color",
                        name : TB.$.s("縁取りの色"),
                        default_val : "0x000000",
                        validate : {
                            required : true
                        }
                    },

                    /*数値入力の例*/
                    "edge_blur" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "縁取りのぼかし値", /*パラメータ名*/
                        unit : "px", /*単位を表示できます*/
                        help : TB.$.s("指定したpx分ぼかします。"),

                        default_val : 1, /*初期値*/

                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : 0, /*入力の最小値*/
                            max : 10, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },

                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    },

                    /*数値入力の例*/
                    "edge_offset" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "縁取りのサイズ", /*パラメータ名*/
                        unit : "px", /*単位を表示できます*/
                        help : TB.$.s("指定したpx分縁取りします。フォントによっては乱れます"),

                        default_val : 1, /*初期値*/

                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : 1, /*入力の最小値*/
                            max : 10, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },

                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    },

                    /*チェックボックス形式*/
                    "shadow_flag" : {
                        type : "Check",
                        text : TB.$.s("影を付ける"),
												/*name : TB.$.s("影"),*/
												help : TB.$.s("チェックが入ってないと影は付きません。"),
                        default_val : true
                    },

                    /*カラー選択の形式*/
                    "shadow" : {
                        type : "Color",
                        name : TB.$.s("影の色"),
                        default_val : "0x000000",
                        validate : {
                            required : true
                        }
                    },

                    /*数値入力の例*/
                    "shadow_blur" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "影のぼかし値", /*パラメータ名*/
                        unit : "px", /*単位を表示できます*/
                        help : TB.$.s("指定したpx分ぼかします。"),

                        default_val : 1, /*初期値*/

                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : 0, /*入力の最小値*/
                            max : 10, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },

                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    },

                    /*数値入力の例*/
                    "shadow_offset" : {
                        type : "Num", /*Numは数字入力を設定できます*/
                        name : "影の位置", /*パラメータ名*/
                        unit : "px", /*単位を表示できます*/
                        help : TB.$.s("指定したpx分右下に影をつけます。"),

                        default_val : 1, /*初期値*/

                        /*spinnerは数値をスピナー形式で表現します*/
                        spinner : {
                            min : 1, /*入力の最小値*/
                            max : 10, /*入力の最大値*/
                            step : 1 /*スピナーを１回動かした時のステップ値*/
                        },

                        validate : {
                            number : true /*数値か否かのチェックを有効化*/
                        }

                    },

                },

                /*
                    途中からプレビューの時に実行するタグを返す。
                    例えば背景変更の機能をもったコンポーネントの場合、
                    途中からプレビューのときに背景変更のタグを実行しておかないと
                    途中からプレビューにこのコンポーネントが反映されません。
                    timeなどの時間は短くしておく必要があります。
                */
                /*
                preview_tag:function(preview,cmp){

                    var storage = cmp.data.pm["storage"];

                    //返却用のタグを設定
                    preview.code_current_bg ="[bg time=10 storage="+storage+" ] \n";

                },
                */

            }

        };

        return cmp;


    }

    test(){


    }

}
