
var categories = {single: new Category("Single",'#a23c7a'),
                  fz: new Category("Friendzone",'#40a67d'),
                  pq: new Category(2, "Plan cul",'#5581b4')}

function Category(label, color){
  var label = label;
  var color = color;
}


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
	return new Date(dateTable[0], dateTable[1], dateTable[2]);
}

function createDataTable(lovelines){

	var rows = [['Category', 'Name', {role: 'style'}, 'Start', 'End']];

	for(var i=0; i<lovelines.length; i++){
		var line = lovelines[i];
		for(var j=0; j<line.objects.length; j++){
			var object = line.objects[j];
			// if(object.end){
				var begin = parseDate(object.begin);
				if(!object.end){
					end = new Date(begin);
					end = end.setDate(begin.getDate()+1);
				}
				else{

					var end = parseDate(object.end);
				}
				var row = [line.name, object.type, '#40a67d', begin, end];
				rows.push(row);
			// }
		}
	}

  
  // rows.push(['Foo', categories.single.label, categories.single.color, new Date(2010, 7, 1), new Date(2014, 7, 5)]);
  // rows.push(['Foo', 'Qud', '#40a67d', new Date(2014, 7, 6), new Date(2015, 7, 8)]);
  // rows.push(['Bar', 'Fiz', '#5581b4', new Date(2008, 7, 2), new Date(2014, 7, 9)]);

  return google.visualization.arrayToDataTable(rows);

}

function drawChart(dataTable) {

  var container = document.getElementById('loveline');
  var chart = new google.visualization.Timeline(container);

  var dataTable = dataTable;

  chart.draw(dataTable);
}
