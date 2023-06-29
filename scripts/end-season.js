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
        s += cols[1].querySelector("img").getAttribute("src").split("/").pop().split(".")[0].toLowerCase() + "/" + cols[1].querySelector("a").getAttribute("href").split("/").pop() + " / " + cols[1].querySelector("a").innerHTML + "\n";
        rowClasses = [];
        if ( r.classList.contains("newclub") ) {
            s = "NEW\n" + s;
        }
        if ( r.classList.contains("removed") ) {
            rowClasses.push("removed");
        }
        if ( leagueName === "A" && cols[0].innerHTML === "1" ) {
            rowClasses.push("champion");
        }
        if ( r.classList.contains("promoted") ) {
            rowClasses.push("promoted");
        }
        if ( r.classList.contains("relegated") ) {
            rowClasses.push("relegated");
        }
        s += "<tr class='"+rowClasses.join(" ")+"'>"+ "<td><a href='"+yearLink+"'>"+year+"</a></td>"+ "<td>"+leagueName+"."+cols[0].innerHTML+"</td>";
        if ( r.classList.contains("champion") ) {
            s += "<td>Domestic Champion</td>";
        } else if ( r.classList.contains("removed") ) {
            s += "<td>Relegated</td>";
        } else {
            s += "<td></td>";
        }
        for ( i=2 ; i!=13 ; i++ ) {
            s += "<td>"+cols[i].innerHTML+"</td>";
        }
        s += "</tr>";
        ss.push(s);
    });
});
ss.sort();
console.log(ss.join("\n\n"));