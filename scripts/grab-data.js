if ( typeof deduct === "undefined" ) {
    deduct = [];
}
header = false;
champion = true;
s = []
flag = prompt("Country code");
switch (flag.toLowerCase()) {
    case "aut": country = "Austria"; break;
    case "bel": country = "Belgium"; break;
    case "che": country = "Switzerland"; break;
    case "csk": country = "Czechoslovakia"; break;
    case "deu": country = "Germany"; break;
    case "dnk": country = "Denmark"; break;
    case "eir": country = "Ireland"; break;
    case "eng": country = "England"; break;
    case "esp": country = "Spain"; break;
    case "est": country = "Estonia"; break;
    case "fin": country = "Finland"; break;
    case "grc": country = "Greece"; break;
    case "hrv": country = "Croatia"; break;
    case "hun": country = "Hungary"; break;
    case "irl": country = "Republic of Ireland"; break;
    case "isl": country = "Iceland"; break;
    case "ita": country = "Italy"; break;
    case "ltu": country = "Lithuania"; break;
    case "lux": country = "Luxembourg"; break;
    case "lva": country = "Latvia"; break;
    case "mlt": country = "Malta"; break;
    case "nir": country = "Northern Ireland"; break;
    case "nld": country = "Netherlands"; break;
    case "pol": country = "Poland"; break;
    case "rou": country = "Romania"; break;
    case "sco": country = "Scotland"; break;
    case "swe": country = "Sweden"; break;
    case "yug": country = "Yugoslavia"; break;
    default: country = prompt("Country name");
}
remove = prompt("Which positions are relegated?").split(",");
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
            additional = "";
            if ( champion ) { champion = false; additional = ",['champion']"; }
            if ( remove.indexOf(cols[0].innerHTML.trim()) !== -1 ) { additional = ",['removed']";}
            if ( deduct.indexOf(parseInt(cols[0].innerHTML.trim())) !== -1 ) {
                if ( additional === "" ) {
                    additional = ",[]";
                }
                deduction = prompt("How many points deducted from " + clubName.trim());
                additional = additional + "," +deduction;
            }
            s.push( "club('"+
                   clubName.trim()+"',"+
                   cols[2].innerHTML.trim()+","+
                   cols[3].innerHTML.trim()+","+
                   cols[4].innerHTML.trim()+","+
                   cols[5].innerHTML.trim()+","+
                   cols[6].innerHTML.trim()+","+
                   cols[7].innerHTML.trim()+""+
                   additional+
                   ");");
        }
    } else {
        header = true;
    }
});
console.log(s.join("\n"));