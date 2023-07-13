header = false;
s = []
flag = prompt("Country code");
country = prompt("Country name");
s.push("country='"+flag+"';\ncountryName='"+country+"';");
document.querySelectorAll("table.superleague tr").forEach(function(row){
    if ( header ) {
        cols = row.querySelectorAll("td, th");
        if ( cols.length !== 0 ) {
            clubName = cols[1].querySelector("a");
            if ( clubName ) {
                clubName = clubName.innerHTML;
            } else {
                clubName = cols[1].innerHTML;
            }
            s.push( "club('"+
                   clubName.trim()+"',"+
                   cols[2].innerHTML.trim()+","+
                   cols[3].innerHTML.trim()+","+
                   cols[4].innerHTML.trim()+","+
                   cols[5].innerHTML.trim()+","+
                   cols[6].innerHTML.trim()+","+
                   cols[7].innerHTML.trim()+""+
                   ");");
        }
    } else {
        header = true;
    }
});
console.log(s.join("\n"));