# ティラノスクリプト用「メッセージ縁取りプラグイン」

## 概要

全てのメッセージエリアで、縁取り・影設定を有効にするプラグインです。
　
### できる事
- 縁取り・影を同時に両方付けられます。
- メッセージ、キャラ名は個別に指定できます。※v3.00
- 縦書き時も有効です（チェックボックスで指定が必要）

### できない事
- あんまり細かい指定はできません。
- FONTの種類によっては綺麗に縁取り出来ない場合があります。

## 使い方

1. data/others/plugin に 「message_edge」を入れてください。
　
2. first.ks でプラグインを呼び出してください。  
   ```
   [plugin name="message_edge"]
	 ```

3. `[message_edge]` タグで縁取りや影の指定をします。  


## パラメーター
| パラメータ | 必須 | 解説 |
|----|:----:|----|
| layer         | × | レイヤーを指定します。※省略時は全てのメッセージレイヤーに指定します。 |
| find          | × | メッセージエリアorキャラ名のみを指定できます。message/chara_name |
| edge          | × | 縁取りの色を指定します。※省略時は縁取りしません。 |
| edge_blur     | × | 縁取りのぼかし値を指定します。デフォルトは 1 |
| edge_offset   | × | 縁取りのサイズを指定します。デフォルトは 1<br>※数値を大きくし過ぎると綺麗になりません。 |
| shadow        | × | 影の色を指定します。※省略時は影を付けません。 |
| shadow_blur   | × | 影のぼかし値を指定します。デフォルトは 1 |
| shadow_offset | × | 影の位置を指定します。デフォルトは 1 |
| vertical      | × | 縦書きの場合は true |
| clear         | × | true にすると縁取りと影を消去します。デフォルトはfalse。レイヤー指定可能 |


## 記述例
- 例1：縁取りの色指定をする  
   ```
   [message_edge edge="0xFF0000"]
   ```
- 例2：影にぼかしも付ける。
   ```
   [message_edgr shadow="0xFF0000" shadow_blur="2"]
   ```

- 例3：message0レイヤーに全部指定する
   ```
   [message_edge layer=message0 edge="0xFF0000" edge_blur="2" edge_offset=2 shadow="0x00FF55" shadow_blur="1" shadow_offset="3"]
   ```
- 例4：message0レイヤーの指定を削除する
   ```
   [message_edge layer="message0" clear="true"]
   ```

## 余談
edgeは8方向指定にしているので、blurの値を大きくしても濃い色味を保ちます。  
shadowは1方向のみなので、blurの値を大きくすると薄くなります。  
細かく指定したい場合はCSSで直接指定した方が良いです。  


## 動作確認

ティラノスクリプト v513c


## 免責

このプラグインを使用したことにより生じた損害・損失に対して制作者は一切責任を負いません。


## 利用規約

 - 改造・再配布は自由です。ただし、有償での再配布は禁止します。  
 改造後データの配布も同様にお願いします。
 - 利用報告・クレジット表記は任意です。
 - このプラグインはドネーションウェア（カンパウェア）です。  
 もしよろしければ寄付をお願いいたします。（強制ではありません）


## 制作者

name    ： hororo  
site    ： めも調 [https://memocho.no-tenki.me/](https://memocho.no-tenki.me/)  
mail    ： ruru.amu@gmail.com  
twitter ： @hororo_memocho  


## 更新履歴

| 更新日 | Ver| 詳細 |
|--|--|-----|
| 2022/05/15 | ver3.01 | ティラノ513c対応。PC版でCSSが反映されない不具合修正。マクロからタグに変更。
| 2021/02/23 | ver3.00 | ティラノ506e対応。DOM要素に指定するよう変更。[message_edge]タグ追加。
| 2017/06/04 | ver2.00 | ティラノ454対応。edgeを8方向に変更。。
| 2016/05/02 | ver1.00 | 公開