# XML/RSSの解析
XMLを扱う際に便利なモジュールとして`xml2js`をインストールして
プログラムを作成していきます。
```bash
npm i cheerio-httpcli request xml2js
```
## Node.js でXMLを扱う方法
簡単なXMLを解析するプログラムを`test-xml.js`として作成します
```javascript
var parseString = require('xml2js').parseString;

var xml = "<fruits shop='AAA'>" +
	"<item price='140'>Banana</item>" +
	"<item price='200'>Apple</item>" +
	"</fruits>";
// XMLパースする
parseString(xml, function (err, result) {
	console.log(JSON.stringify(result));
})
```

```bash
node test-xml.js
```

```json
{"fruits":{"$":{"shop":"AAA"},"item":[{"_":"Banana","$":{"price":"140"}},{"_":"Apple","$":{"price":"200"}}]}}
```

## JavaScript のオブジェクトからXMLを作成する場合
逆に、JavaScriptのオブジェクトからXMLを作成するプログラムを`test-xml-builder.js`として作成します
```javascript
var xml2js = require('xml2js');

var obj = {
	item: { name: "Banana", price: 150 }
};
var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);
console.log(xml);
```

```bash
node test-xml.js
```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<item>
  <name>Banana</name>
  <price>150</price>
</item>
```

## Yahoo!天気予報RSSを読み込もう
Yahoo!天気予報のRSSを読み込むプログラムを`tenki.js`を作成します

```javascript
// Yahoo!天気予報RSS
var RSS = "https://rss-weather.yahoo.co.jp/rss/days/6200.xml";

var parseString = require("xml2js").parseString;
var client = require('cheerio-httpcli');

client.fetch(RSS, {}, function (err, $, res) {
	if (err) { console.log("error"); return; }
	// 必要な項目を抽出して表示
	$("item > title").each(function (idx) {
		var title = $(this).text();
		console.log(title);
	});
});
```

```bash
node tenki.js
```

```bash
【 12日（水） 大阪（大阪） 】 雪のち曇 - 7℃/2℃ - Yahoo!天気・災害
【 13日（木） 大阪（大阪） 】 曇時々晴 - 8℃/2℃ - Yahoo!天気・災害
【 14日（金） 大阪（大阪） 】 雪のち曇 - 7℃/1℃ - Yahoo!天気・災害
【 15日（土） 大阪（大阪） 】 晴時々曇 - 9℃/1℃ - Yahoo!天気・災害
【 16日（日） 大阪（大阪） 】 曇時々晴 - 11℃/2℃ - Yahoo!天気・災害
【 17日（月） 大阪（大阪） 】 曇時々晴 - 9℃/2℃ - Yahoo!天気・災害
【 18日（火） 大阪（大阪） 】 晴時々曇 - 9℃/1℃ - Yahoo!天気・災害
【 19日（水） 大阪（大阪） 】 曇時々晴 - 8℃/1℃ - Yahoo!天気・災害
【 大阪市 】注意報があります - Yahoo!天気・災害
【 北大阪 】注意報があります - Yahoo!天気・災害
【 東部大阪 】注意報があります - Yahoo!天気・災害
【 南河内 】注意報があります - Yahoo!天気・災害
【 泉州 】注意報があります - Yahoo!天気・災害
```