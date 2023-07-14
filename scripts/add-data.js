country = countryName = "";
function addRow(cols,p,w,d,l,f,a) {
    pts = ((w*3)+d);
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
        addRow(cols,p,w,d,l,f,a);
    } else {
        teamURL = prompt("Can't find " + teamName + ", provide URL:").toLowerCase();
        row = Array.from(document.querySelectorAll('.division tbody tr a')).find(el => {
            h = el.getAttibute("href");
            isC = h.indexOf("/"+country+"/");
            isH = h.indexOf(teamURL+".html") !== -1;
            isAltH = el.getAttribute("data-althref").indexOf(teamURL) !== -1;
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
            addRow(cols,p,w,d,l,f,a);
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
            addRow(cols,p,w,d,l,f,a);
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