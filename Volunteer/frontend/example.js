function GET(url) {
	var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText; 
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
