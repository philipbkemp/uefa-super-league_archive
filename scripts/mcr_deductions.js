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
    s += "<td>" + (f/p).toFixed(2) + "</td>";
    s += "<td>" + (pts /p).toFixed(2) + "</td>";
    console.log(s);
}