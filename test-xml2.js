var parseString = require('xml2js').parseString;

var xml = "<fruits shop='AAA'>" +
	"<item price='140'>Banana</item>" +
	"<item price='200'>Apple</item>" +
	"</fruits>";
// XMLパースする
parseString(xml, function (err, result) {
	//console.log(JSON.stringify(result));
	var shop = result.fruits.$.shop;
	console.log(shop);
	var items = result.fruits.item;
	for (var i in items) {
		var item = items[i];
		console.log("-- name=" + item._);
		console.log("   price=" + item.$.price);
	}
});