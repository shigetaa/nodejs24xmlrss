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