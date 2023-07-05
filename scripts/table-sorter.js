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
console.log(s.join("\n"));