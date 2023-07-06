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
            relegation = true;
            removedCount++;
        }
    });
});
divNames = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
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
console.log(removedCount + " team(s) have left the league",newCount);