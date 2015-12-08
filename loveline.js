
var categories = {single: new Category("Single",'#a23c7a'),
                  fz: new Category("Friendzone",'#40a67d'),
                  pq: new Category(2, "Plan cul",'#5581b4')}

function Category(label, color){
  var label = label;
  var color = color;
}

var EVENT_COLOR = '#666666';


function createLoveline(){
	$.getJSON("data.json", function(data){
		var dataTable = createDataTable(data.timelines);
  		drawChart(dataTable);
	});
// 	$.ajax({
//   dataType: "json",
//   url: "data.json",
//   success: function(data){console.log("success")},
//   error: function(a, b, c){console.log("failure"); console.log(a); console.log(b); console.log(c);}
// });
  
  
}

function parseDate(dateString){
	var dateTable = dateString.split('-');
	return new Date(dateTable[0], dateTable[1]-1, dateTable[2]);
}

function createDataTable(lovelines){

	var rows = [['Category', 'Name', {role: 'style'}, 'Start', 'End']];

	for(var i=0; i<lovelines.length; i++){
		var line = lovelines[i];
		for(var j=0; j<line.objects.length; j++){
			var object = line.objects[j];
			//var color;
			var label = labelRow(object.type);
			// if(object.end){
				var begin = parseDate(object.begin);
				if(!object.end){
					end = new Date(begin);
					end = end.setDate(begin.getDate()+1);
					//color = EVENT_COLOR;
				}
				else{
					var end = parseDate(object.end);
					//color = colorRow(object.type);
					}
				var row = [line.name, label.name, label.color, begin, end];
							console.log(row);

				rows.push(row);
			// }
		}
	}

/*
 * Determine color of a state based on his type
 * Color palette : http://www.colourlovers.com/palette/985632/Invisible_Look!
 */
function labelRow(rowType) {
	var color = "#E5D599";
	var name;
	if (rowType == "PQ") {
		name = "Plan cul";
		color = "#029DAF";
	}
	else if (rowType == "FZ") {
		name = "Friendzone";
		color = "#FFC219";
	}
	else if (rowType == "RR") {
		name = "Relation sentimentale";
		color = "#E32551";
	}
	else if (rowType == "Crush") {
		name = "Béguin";
	}
	else if (rowType == "Rake") {
		name = "Râteau";
	}
	else if (rowType == "ONS") {
		name = "Coup d'un soir";
	}
			
	return {name:name, color:color};
}
  
  // rows.push(['Foo', categories.single.label, categories.single.color, new Date(2010, 7, 1), new Date(2014, 7, 5)]);
  // rows.push(['Foo', 'Qud', '#40a67d', new Date(2014, 7, 6), new Date(2015, 7, 8)]);
  // rows.push(['Bar', 'Fiz', '#5581b4', new Date(2008, 7, 2), new Date(2014, 7, 9)]);

  return google.visualization.arrayToDataTable(rows);

}

function drawChart(dataTable) {

  var container = document.getElementById('loveline');
  var chart = new google.visualization.Timeline(container);
  google.visualization.events.addListener(chart, 'ready', drawEvents);
  chart.draw(dataTable);

}

function drawEvents(){
	console.log("events")
	$("rect[fill='" + EVENT_COLOR + "']").attr("class", "love_event");
	var x = $(".love_event").first().attr("x");
	var y = $(".love_event").first().attr("y");
	$(".overlay").css("top", y);
	$(".overlay").css("left", x);
}

function placeMarker(chart, dataTable) {
	// console.log(Object.getOwnPropertyNames(chart));
        var cli = chart.getChartLayoutInterface();
        var chartArea = cli.getChartAreaBoundingBox();
        // "Zombies" is element #5.
        document.querySelector('.overlay-marker').style.top = Math.floor(cli.getYLocation(dataTable.getValue(5, 1))) - 50 + "px";
        document.querySelector('.overlay-marker').style.left = Math.floor(cli.getXLocation(5)) - 10 + "px";
      };
