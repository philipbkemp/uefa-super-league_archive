function newSeason() {
	seasonBuilder();
	tableSorter(false);
	divisions = document.querySelectorAll("table.division");
	newDivisionSize = [];
	divisions.forEach(function(d){
		newDivisionSize.push(d.querySelectorAll("tbody tr").length);
	});
	alert(newDivisionSize);
	dumpAll();
}

function numberTeams() {
	divs = [];
	divisions = document.querySelectorAll("table.division");
	divisions.forEach(function(d,dIndex){
		divs[dIndex] = 0;
		rows = d.querySelectorAll("tbody tr");
		rows.forEach(function(r,rIndex){
			p = r.querySelectorAll("td");
			p[0].innerHTML = rIndex+1;
			divs[dIndex]++;
		});
	});
	newclubs = divs.pop();
	alert(divs);
}

function dumpAll(includeNewClubs=true) {
	divisions = document.querySelectorAll("table.division");
	s = [];
	s.push('<!doctype html>\n<html lang="en">\n\t<head>\n\t\t<meta charset="utf-8" />\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1" />\n\t\t<title>'+document.getElementsByTagName("title")[0].innerHTML+'</title>');
	s.push('\t\t<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />\n\t\t<link rel="stylesheet" href="../../styles.css" />\n\t\t<script src="../../scripts/factory.js"></script>\n\t</head>\n\t<body>');
	s.push('\t\t<table class="nav-table">\n\t\t\t<tbody>\n\t\t\t\t<tr>\n\t\t\t\t\t<td><a href="'+document.querySelectorAll(".nav-table a")[0].getAttribute("href")+'">Previous Season</a></td>\n\t\t\t\t\t<td><a href="../../index.html">Home</a></td>');
	ul = "";
	if ( document.getElementsByTagName("ul").length !== 0 ) {
		ul = '<ul>'+document.getElementsByTagName("ul")[0].innerHTML+'</ul>';
	} else {
		ul = '<!--<ul><li></li></ul>-->';
	}
	s.push('\t\t\t\t\t<td></td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<h1>'+document.getElementsByTagName("h1")[0].innerHTML+'</h1>\n\t\t'+ul+'\n\t\t<hr />\n');
	doneNewClubDiv = false;
	divisions.forEach(function(d) {
		s.push('\t\t<table class="division">\n\t\t\t<thead>'+d.querySelectorAll("thead")[0].innerHTML+'</thead>\n\t\t\t<tbody>\n');
		if ( d.querySelectorAll("thead")[0].innerHTML.indexOf("NEWCLUB") !== -1 ) {
			doneNewClubDiv = true;
		}
		rows = d.querySelectorAll("tbody tr");
		rows.forEach(function(r){
			s.push('\t\t\t\t<tr class="'+r.classList+'">'+r.innerHTML.trim()+'</tr>');
		});
		s.push('\t\t\t</tbody>\n\t\t</table>\n');
	})
	if ( ! doneNewClubDiv && includeNewClubs ) {
		s.push('\t\t<table class="division">\n\t\t\t<thead>'+divisions[0].querySelectorAll("thead")[0].innerHTML.replace("Division A","Division NEWCLUB")+'</thead>\n\t\t\t<tbody>\n\t\t\t</tbody>\n\t\t</table>\n');
	}
	s.push('\t</body>\n<html>');
	console.log(s.join("\n"));
}

/* TABLE SORTER */
function sortTable(index) {
  var table = document.querySelectorAll("table.division")[index];
  var tbody = table.querySelector("tbody");
  var rows = Array.from(tbody.rows);

  rows.sort(function (a, b) {
    if ( a.cells.length < 10 || b.cells.length < 10 ) {
      return 0;
    }
    var valueA_PPG = parseFloat(a.cells[12].textContent);
    var valueB_PPG = parseFloat(b.cells[12].textContent);

    if (valueA_PPG !== valueB_PPG) {
      return valueB_PPG - valueA_PPG; // Sort by column 5, highest value first
    } else {
      var valueA_GPG = parseFloat(a.cells[11].textContent);
      var valueB_GPG = parseFloat(b.cells[11].textContent);

      if (valueA_GPG !== valueB_GPG) {
        return valueB_GPG - valueA_GPG; // Sort by column 4, highest value first
      } else {
        var valueA_GD = parseFloat(a.cells[10].textContent);
        var valueB_GD = parseFloat(b.cells[10].textContent);
        if ( valueB_GD === valueA_GD ) {
          alert("NEED ANOTHER SORTING LEVEL");
          console.log(a.cells,b.cells);
        }

        return valueB_GD - valueA_GD; // Sort by column 3, highest value first
      }
    }
  });

  // Reattach sorted rows to the table body
  rows.forEach(function (row) {
    tbody.appendChild(row);
  });
}
function tableSorter(print=true) {
	divisions = document.querySelectorAll("table.division");
	divisions.forEach(function(d,dIndex) {
	  sortTable(dIndex);
	});
	s = [];
	divisions.forEach(function(d) {
	  s.push('\t\t<table class="division">\n\t\t\t<thead>'+d.querySelectorAll("thead")[0].innerHTML+'</thead>\n\t\t\t<tbody>\n');
	  rows = d.querySelectorAll("tbody tr");
	  pos = 1;
	  rows.forEach(function(r){
	    s.push('\t\t\t\t<tr class="'+r.classList+'">');
	    r.querySelectorAll("td")[0].innerHTML = pos;
	    pos++;
	    s.push('\t\t\t\t\t'+r.innerHTML.trim());
	    s.push('\t\t\t\t</tr>\n');
	  });
	  s.push('\t\t\t</tbody>\n\t\t</table>\n');
	})
	divisions = document.querySelectorAll("table.division");
	newDivisionSize = [];
	divisions.forEach(function(d){
		newDivisionSize.push(d.querySelectorAll("tbody tr").length);
	});
	alert(newDivisionSize);
	if ( print ) {
		dumpAll();
	}
}

/* SEASON BUILDER */
function seasonBuilder() {
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
}

/* ADD DATA */
country = countryName = "";
function addRow(cols,p,w,d,l,f,a,deduct=0) {
    pts = ((w*3)+d);
    if ( deduct !== 0 ) {
    	pts = pts + deduct;
    }
    cols[2].innerHTML = p;
    cols[3].innerHTML = w;
    cols[4].innerHTML = d;
    cols[5].innerHTML = l;
    if ( f !== "-" ) { cols[6].innerHTML = f; } else { cols[6].innerHTML = "-"; }
    if ( a !== "-" ) { cols[7].innerHTML = a; } else { cols[7].innerHTML = "-"; }
    cols[8].innerHTML = pts;
    cols[9].innerHTML = ((w/p)*100).toFixed(1);
    if ( f !== "-" && a !== "" ) { cols[10].innerHTML = (f-a); } else { cols[10].innerHTML = "-"; }
    if ( f !== "-" ) { cols[11].innerHTML = (f/p).toFixed(2); } else { cols[11].innerHTML = "-"; }
    cols[12].innerHTML = (pts /p).toFixed(2);
}
function club(teamName,p,w,d,l,f,a,flags=[],deduct=0) {
    row = Array.from(document.querySelectorAll('.division tbody tr a')).find(el => el.textContent === teamName && el.getAttribute("href").indexOf("/"+country+"/") !== -1);
    if ( row ) {
        row = row.parentNode.parentNode;
        for ( i=0 ; i!==11 ; i++ ) {
            row.appendChild( document.createElement("TD") );
        }
        cols = row.querySelectorAll("td");
        if ( flags.indexOf("champion") !== -1 ) {
            row.classList.add("champion");
        }
        if ( flags.indexOf("removed") !== -1 ) {
            row.classList.add("removed");
        }
        addRow(cols,p,w,d,l,f,a,deduct);
    } else {
        teamURL = prompt("Can't find " + teamName + ", provide URL:").toLowerCase();
        row = Array.from(document.querySelectorAll('.division tbody tr a')).find(el => {
            h = el.getAttribute("href");
            isC = h.indexOf("/"+country+"/");
            isH = h.indexOf(teamURL+".html") !== -1;
            isAltH = el.getAttribute("data-althref");
            isAltH = isAltH ? isAltH.indexOf(teamURL) !== -1 : false;
            return isC && (isH || isAltH);
        });
        if ( row ) {
            row = row.parentNode.parentNode;
            for ( i=0 ; i!==11 ; i++ ) {
                row.appendChild( document.createElement("TD") );
            }
            cols = row.querySelectorAll("td");
            pts = ((w*3)+d);
            cols[1].querySelector("a").innerHTML = teamName;
            if ( flags.indexOf("champion") !== -1 ) {
                row.classList.add("champion");
            }
            if ( flags.indexOf("removed") !== -1 ) {
                row.classList.add("removed");
            }
            addRow(cols,p,w,d,l,f,a,deduct);
        } else {
            newRet = prompt("Is "+teamURL+" a 'newclub' or 'returning' club?").toLowerCase();
            lastLeague = document.querySelectorAll('.division');
            lastLeague = lastLeague[lastLeague.length-1];
            lastLeague = lastLeague.querySelector("tbody");
            newRow = document.createElement("TR");
            for ( i=0 ; i!==13 ; i++ ) {
                newRow.appendChild( document.createElement("TD") );
            }
            cols = newRow.querySelectorAll("td");
            cols[0].append(lastLeague.querySelectorAll("tr").length+1);
            flag = document.createElement("IMG");
            flag.setAttribute("src","../../f/"+country.toUpperCase()+".png");
            flag.setAttribute("title",countryName);
            cols[1].appendChild(flag);
            link = document.createElement("A");
            link.setAttribute("href","../../c/"+country.toLowerCase()+"/"+teamURL+".html");
            link.innerHTML = teamName;
            cols[1].appendChild(link);
            if ( flags.indexOf("champion") !== -1 ) {
                newRow.classList.add("champion");
            }
            if ( flags.indexOf("removed") !== -1 ) {
                newRow.classList.add("removed");
            }
            addRow(cols,p,w,d,l,f,a,deduct);
            if ( newRet === "newclub" ) {
                newRow.classList.add("newclub");
                lastLeague.appendChild(newRow);
            } else if ( newRet === "returning" ) {
                newRow.classList.add("returning");
                lastLeague.appendChild(newRow);
            } else {
                alert("Could not add team " + teamName);
            }
        }
    }
        
}

/* PROMOTE AND RELEGATE */
function upDown() {
	divisions = document.querySelectorAll("table.division");
	oldCount = [];
	oldCount[0] = 0;
	newCount = [];
	newCount[0] = 0;
	relegation = false;
	promotion = false;
	removedCount = 0;
	divisions.forEach(function(d,dIndex){
	    newCount[dIndex+1] = 0;
	    oldCount[dIndex+1] = 0;
		rows = d.querySelectorAll("tbody tr");
		rows.forEach(function(r,rIndex){
	        oldCount[dIndex]++;
	        if ( r.classList.contains("promoted") ) {
	            newCount[dIndex-1]++;
	            promotion = true;
	        } else if ( r.classList.contains("relegated") ) {
	            newCount[dIndex+1]++;
	            relegation = true;
	        } else if ( ! r.classList.contains("removed") ) {
	            newCount[dIndex]++;
	        } else if ( r.classList.contains("removed") ) {
	            removedCount++;
	        }
	    });
	});
	divNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	if ( newCount[0] === 40 && !relegation ) {
	    console.log("Division A should relegated 5 team(s)");
	} else {
	    for ( i=0 ; i!==newCount.length ; i++ ) {
	        if ( newCount[i] > 35 && newCount[i] !== 40 ) {
	            console.log("Division " + divNames[i] + " should relegate " + (newCount[i]-35) + " team(s)");
	            break;
	        } else if ( newCount[i] <= 35 && newCount[i+1] !== 0 && newCount[i] !== 0 ) {
	            console.log("Division " + divNames[i+1] + " should promote " + (40-newCount[i]) + " team(s)");
	            break;
	        } else if ( newCount[i] === 40 && !relegation && !promotion ) {
	            console.log("Division " + divNames[i] + " should relegate " + (newCount[i]-35) + " team(s)");
	            break;
	        } else {
	            console.log("Division " + divNames[i] + " has " + newCount[i] + " team(s)");
	        }
	    }
	}
	console.log(removedCount + " team(s) have left the league",newCount);
}

/* SEASON RECORDING */
function record() {
	ss = [];
	divisions = document.querySelectorAll("table.division");
	year = document.querySelector("h1").innerHTML.split(" ").pop();
	u = window.location.href.split("/")
	yearLink = "../../"+u[7]+"/"+u[8]+"/"+u[9];
	divisions.forEach(function(d){
	    leagueName = d.querySelector("thead th").innerHTML.split(" ")[1];
	    rows = d.querySelectorAll("tbody tr");
	    rows.forEach(function(r){
	        s = "";
	        cols = r.querySelectorAll("td");
	        s += "<tr>";
	        link = cols[1].querySelectorAll("a")[0];
	        clubUrl = link.getAttribute("href").split("/");
	        clubName = clubUrl.pop();
	        country = clubUrl.pop();
	        clubLabel = link.innerHTML;
	        s += "<td>"+country+"</td>";
	        s += "<td>"+clubName+"</td>";
	        s += "<td>"+u[8]+"/"+u[9]+"</td>";
	        s += "<td>"+clubLabel+"</td>";
	        s += "<td>"+leagueName+"."+cols[0].innerHTML+"</td>";
	        rowData = r.dataset;
	        dataVals = [];
	        isJointChampion = false;
	        for(var data in rowData) {
	            switch ( data ) {
	                case "champion":
	                    switch (rowData[data]) {
	                        case "joint":
	                            dataVals.push("Joint National Champion");
	                            isJointChampion = true;
	                            break;
	                        default:
	                            alert("UNSUPPORTED DATASET['champion'] VALUE: "+rowData[data]);
	                    }
	                    break;
	                case "deduction":
	                    dataVals.push("-"+rowData[data]+"pts");
	                    break;
	                case "note":
	                    dataVals.push(rowData[data]);
	                    break;
	                default:
	                    alert("UNSUPPORTED DATASET VALUE: "+data+" / "+rowData[data]);
	            }
	        }
	        rowClasses = [];
	        if ( r.classList.contains("newclub") ) { rowClasses.push("newclub"); }
	        if ( leagueName === "A" && cols[0].innerHTML === "1" ) { rowClasses.push("champion"); }
	        if ( r.classList.contains("champion") && !isJointChampion ) { dataVals.push("National Champion"); }
	        if ( r.classList.contains("promoted") ) { rowClasses.push("promoted"); }
	        if ( r.classList.contains("relegated") ) { rowClasses.push("relegated"); }
	        if ( r.classList.contains("removed") ) { rowClasses.push("removed"); }
	        if ( r.classList.contains("returning") ) { rowClasses.push("returning"); }
	        s += "<td>" + dataVals.join("; ") + "</td>";
	        s += "<td>" + rowClasses.join(" ") + "</td>";
	        for ( i=2 ; i!=13 ; i++ ) {
	            s += "<td>"+cols[i].innerHTML+"</td>";
	        }
	        s += "</tr>";
	        ss.push(s);
	    });
	});
	ss.sort();
	console.log(ss.join("\n"));
}