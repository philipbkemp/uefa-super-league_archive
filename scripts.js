// https://en.wikipedia.org/wiki/Template:1890%E2%80%9391_in_European_football_(UEFA)

function mcr(p,w,d,l,f,a) {
    pts = ((w*3)+d);
    s = "";
    s += "<td>" + p + "</td>";
    s += "<td>" + w + "</td>";
    s += "<td>" + d + "</td>";
    s += "<td>" + l + "</td>";
    s += "<td>" + f + "</td>";
    s += "<td>" + a + "</td>";
    s += "<td>" + pts + "</td>";
    s += "<td>" + ((w/p)*100).toFixed(1) + "</td>";
    s += "<td>" + (f-a) + "</td>";
    s += "<td>" + (f/a).toFixed(2) + "</td>";
    s += "<td>" + (pts /p).toFixed(2) + "</td>";
    console.log(s);
}
function mcrd(p,w,d,l,f,a,deduction) {
    pts = ((w*3)+d);
    pts = pts - deduction;
    s = "";
    s += "<td>" + p + "</td>";
    s += "<td>" + w + "</td>";
    s += "<td>" + d + "</td>";
    s += "<td>" + l + "</td>";
    s += "<td>" + f + "</td>";
    s += "<td>" + a + "</td>";
    s += "<td>" + pts + "</td>";
    s += "<td>" + ((w/p)*100).toFixed(1) + "</td>";
    s += "<td>" + (f-a) + "</td>";
    s += "<td>" + (f/a).toFixed(2) + "</td>";
    s += "<td>" + (pts /p).toFixed(2) + "</td>";
    console.log(s);
}

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
console.log(ss.join("/n/n"));