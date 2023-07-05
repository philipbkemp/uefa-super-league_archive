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