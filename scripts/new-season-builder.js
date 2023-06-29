divisions = document.querySelectorAll("table.division");
divisions.forEach(function(d,dIndex){
	rows = d.querySelectorAll("tbody tr");
	rows.forEach(function(r,rIndex){
		cols = r.querySelectorAll("td");
		newRow = "<td>" + cols[0].innerHTML + "</td>";
		newRow += "<td>" + cols[1].innerHTML + "</td>";  
		if ( ! r.classList.contains("removed") ) { 
			r.innerHTML = newRow;
			r.classList.remove("champion");
			r.classList.remove("newclub");
			r.classList.remove("returning");
		} else {
			d.deleteRow(r.rowIndex);
		}
		if ( r.classList.contains("relegated") ) {
			relegatedTeam = divisions[dIndex+1].querySelectorAll("tbody")[0].insertRow(0);
			c1 = relegatedTeam.insertCell(0);
			c1.innerHTML = cols[0].innerHTML;
			c2 = relegatedTeam.insertCell(1);
			c2.innerHTML = cols[1].innerHTML;
			d.deleteRow(r.rowIndex);
		} else if ( r.classList.contains("promoted") ) {
			relegatedTeam = divisions[dIndex-1].querySelectorAll("tbody")[0].insertRow(-1);
			c1 = relegatedTeam.insertCell(0);
			c1.innerHTML = cols[0].innerHTML;
			c2 = relegatedTeam.insertCell(1);
			c2.innerHTML = cols[1].innerHTML;
			d.deleteRow(r.rowIndex);
		}
	});
});
y1 = prompt("FIRST YEAR");
y2 = prompt("SECOND YEAR");
document.getElementsByTagName("title")[0].innerHTML = "UEFA Super League / 19"+ y1 + "/" + y2;
document.querySelectorAll(".nav-table a")[0].setAttribute("href",window.location.href.split("/").pop());
document.getElementsByTagName("h1")[0].innerHTML = "UEFA Super League 19"+ y1 + "/" + y2;
s = [];
s.push('<!doctype html>\n<html lang="en">\n\t<head>\n\t\t<meta charset="utf-8" />\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1" />\n\t\t<title>UEFA Super League / 19'+y1+'/'+y2+'</title>');
s.push('\t\t<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />\n\t\t<link rel="stylesheet" href="../../styles.css" />\n\t</head>\n\t<body>');
s.push('\t\t<table class="nav-table">\n\t\t\t<tbody>\n\t\t\t\t<tr>\n\t\t\t\t\t<td><a href="'+window.location.href.split("/").pop()+'">Previous Season</a></td>\n\t\t\t\t\t<td><a href="../../index.html">Home</a></td>');
s.push('\t\t\t\t\t<td></td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<h1>UEFA Super League 19'+y1+'/'+y2+'</h1>\n\t\t<!--<ul><li></li></ul>-->\n\t\t<hr />\n');
divisions.forEach(function(d) {
	s.push('\t\t<table class="division">\n\t\t\t<thead>'+d.querySelectorAll("thead")[0].innerHTML+'</thead>\n\t\t\t<tbody>\n');
	rows = d.querySelectorAll("tbody tr");
	rows.forEach(function(r){
		s.push('\t\t\t\t<tr>');
		s.push('\t\t\t\t\t'+r.innerHTML);
		s.push('\t\t\t\t</tr>\n');
	});
	s.push('\t\t\t</tbody>\n\t\t</table>\n');
})
s.push('\t</body>\n<html>');
console.log(s.join("\n"));