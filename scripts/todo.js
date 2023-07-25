year = prompt("What year are we looking for?");
links = document.querySelectorAll(".navbox-inner")[0].querySelectorAll("th.navbox-group")[0].nextElementSibling.querySelectorAll("a");
goodCountries = ["Austria","Belgium","Czechoslovakia","England","Hungary","Luxembourg","Malta","Northern Ireland","Republic of Ireland","Scotland","Sweden","Spain"];
badCountries = ["Denmark","Italy","Switzerland","Romania","Turkey","Netherlands","Greece","Germany"];
oneYearCountriesGood = ["Latvia","Poland","Yugoslavia"];
oneYearCountriesBad = ["Iceland","Bulgaria","Estonia","Lithuania"];
toOpen = [];
links.forEach(function(l){
    if ( goodCountries.indexOf(l.innerHTML) !== -1 ) {
        toOpen.push( l.getAttribute("href") );
        l.innerHTML = "";
    } else if ( badCountries.indexOf(l.innerHTML ) !== -1 ) {
        l.innerHTML = "";
    } else if ( l.innerHTML === "'"+year ) {
        c = l.parentNode.innerHTML.replace(/<[^>]+>[\s\S]*?<\/[^>]+>/g, '').trim();
        if ( oneYearCountriesGood.indexOf(c) !== -1 ) {
            toOpen.push( l.getAttribute("href") );
            l.parentNode.innerHTML = "";
        } else if ( oneYearCountriesBad.indexOf(c) !== -1 ) {
            l.parentNode.innerHTML = "";
        }         
    }
});
i = 250;
for (const link of toOpen) {
    setTimeout(() => {
        window.open(link, '_blank','noopener');
    }, i);
    i = i + 250;
}