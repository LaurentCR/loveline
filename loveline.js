
var categories = {single: new Category("Single",'#a23c7a'),
                  fz: new Category("Friendzone",'#40a67d'),
                  pq: new Category(2, "Plan cul",'#5581b4')}

function Category(label, color){
  var label = label;
  var color = color;
}

function getLovelines(){
  return null;
}

function createLoveline(){
  var lovelines = getLovelines();
  var dataTable = createDataTable(lovelines);
  drawChart(dataTable);
}

function createDataTable(lovelines){

  var rows = [['Category', 'Name', {role: 'style'}, 'Start', 'End']];
  rows.push(['Foo', categories.single.label, categories.single.color, new Date(2010, 7, 1), new Date(2014, 7, 5)]);
  rows.push(['Foo', 'Qud', '#40a67d', new Date(2014, 7, 6), new Date(2015, 7, 8)]);
  rows.push(['Bar', 'Fiz', '#5581b4', new Date(2008, 7, 2), new Date(2014, 7, 9)]);

  return google.visualization.arrayToDataTable(rows);

}

function drawChart(dataTable) {

  var container = document.getElementById('loveline');
  var chart = new google.visualization.Timeline(container);

  var dataTable = dataTable;

  chart.draw(dataTable);
}