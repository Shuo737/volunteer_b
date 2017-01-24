present_sponsors();
present_events();

function GET(url) {
	var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText; 
}

function page_reload(){
	location.reload();
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function present_sponsors (){
	var url = "http://localhost/Volunteer/api/sponsors";
	var spon_obj = JSON.parse(GET(url));
	var size = Object.keys(spon_obj.sponsors).length;
	var content = "";

	for (i=0; i<size; i++){
		var name = spon_obj.sponsors[i].spsname;
		var desc = spon_obj.sponsors[i].spsdesc;

		content = content + "<div class=\"mdl-cell mdl-card mdl-shadow--4dp highlight-card\"><div class=\"mdl-card__media\">"+
		"<img class=\"article-image\" src=\"images/hosts/"+name+"1.jpg\" border=\"0\" alt=\"\"></div><div class=\"mdl-card__title\">"+
		"<h2 class=\"mdl-card__title-text\">"+name+"</h2></div><div class=\"mdl-card__supporting-text\">"+desc+"</div>"+
		"<div class=\"mdl-card__actions mdl-card--border\"><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent\""+
		"onclick=\"show_sponexample('"+name+"')\">Read more</a></div></div>";
	}

	try {
		if (document.getElementById("sponsors_content").innerHTML !== null){
			document.getElementById("sponsors_content").innerHTML = content;
		}		
	}catch(err){
		console.log(err);
	}
	return false;
}

function present_events (){
	var url = "http://localhost/Volunteer/api/recent_events";
	var rec_evobj = JSON.parse(GET(url));
	var size = Object.keys(rec_evobj.events).length;
	var desc = "";

	content = "<div class=\"mdl-grid mdl-cell mdl-cell--12-col mdl-cell--4-col-tablet mdl-card mdl-shadow--4dp\">"+
	"<div class=\"mdl-card__media mdl-cell mdl-cell--12-col-tablet\"><img class=\"article-image\" src=\"images/event_title.jpg\" "+
	"border=\"0\" alt=\"\"></div><div class=\"mdl-cell mdl-cell--8-col\"><h2 class=\"mdl-card__title-text\">"+rec_evobj.events[0].evename+
	"</h2><div class=\"mdl-card__supporting-text padding-top\">\<span>Date: "+rec_evobj.events[0].evstime+"</span><div id=\"tt1\" "+
	"class=\" icon material-icons highlight-share-btn\">share</div><div class=\"mdl-tooltip\" for=\"tt1\">Share via social media</div>"+
	"</div><div class=\"mdl-card__supporting-text no-left-padding\"><p>"+rec_evobj.events[0].evedesc+"</p><span>Category: Latest</span></div></div></div>";

	
	content = content + "<div class=\"mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-card mdl-shadow--4dp\">"+
	"<div class=\"mdl-card__title\"><h2 class=\"mdl-card__title-text\">"+rec_evobj.events[1].evename+"</h2></div><div class=\"mdl-card__media\">"+
	"<img class=\"article-image\" src=\" images/event2.jpg\" border=\"0\" alt=\"\"></div><div class=\"mdl-card__supporting-text no-bottom-padding\">"+
	"<span>Date: "+rec_evobj.events[1].evstime+"</span><div id=\"tt2\" class=\" icon material-icons highlight-share-btn\">share</div>"+
	"<div class=\"mdl-tooltip\" for=\"tt2\">Share via social media</div></div><div class=\"mdl-card__supporting-text\"><p>"+rec_evobj.events[1].evedesc+"</p></div></div>";
	

	pic_num = getRandomInt(1,10);
	console.log(pic_num);

	content = content + "<div class=\"mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-card mdl-card mdl-shadow--4dp \" "+
	"style=\"background: url(images/pictures/picture"+pic_num+".jpg) center / cover\"><div class=\"mdl-card__title mdl-card--expand \">"+
	"</div><div class=\"mdl-card__actions\"><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent\" "+
	"onclick=\"show_picexamples()\"><span class=\"demo-card-image__filename\">Pictures</span></a></div></div>";

	
	content = content + "<div class=\"mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-card mdl-shadow--4dp \"><div class=\"mdl-card__title mdl-card--expand \">"+
	rec_evobj.events[2].evename+"</div><div class=\"mdl-card__media\"><a href=\"#\"> <img class=\"article-image\" src=\" images/img_event_s1.jpg\" border=\"0\" alt=\"\"></a>"+
	"</div><div class=\"mdl-card__supporting-text\"><small>Date: "+rec_evobj.events[2].evstime+"</small></div><div class=\"mdl-card__supporting-text\">"+
	"<p></p>"+rec_evobj.events[2].evedesc+"</div></div>";
	
	var up_url = "http://localhost/Volunteer/api/upcoming_events";
	var up_evobj = JSON.parse(GET(up_url));
	var size1 = Object.keys(up_evobj.upcoming_events).length;
	if (size1 < 1) {
		date = "There is no upcoming events"
	}else{
		date = up_evobj.upcoming_events[0].evstime;
	}
	
	content = content + "<div class=\"demo-card-event mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-card mdl-card mdl-shadow--4dp highlight-event-card-event-bg mdl-color-text--white\">"+
	"<div class=\"mdl-card__title mdl-card--expand\"><h4 class=\"mdl-color-text--white\">Volunteer event:<br>"+date+
	"</h4></div><div class=\"mdl-card__actions mdl-card--border\"> <a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-color-text--white\">"+
	"Add to Calendar</a><div class=\"mdl-layout-spacer\"></div><i class=\"material-icons \">event</i></div></div>";
	
	
	content = content + "<div class=\"mdl-cell mdl-cell--5-col mdl-cell--4-col-tablet mdl-card  mdl-card mdl-shadow--4dp\">"+
	"<div class=\"mdl-card__title mdl-card--expand highlight-event-card-strip-bg mdl-color-text--black\">"+
	"<h2 class=\"mdl-card__title-text\">Upcoming Events</h2></div><div class=\"mdl-card__supporting-text\">Future events about Cornerstone Volunteer Group."+
	"</div><div class=\"mdl-card__actions mdl-card--border\"><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent\" "+
	"onclick=\"show_upcoming_events()\">View Updates</a></div></div>";


	content = content + "<div class=\"mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-card  mdl-card mdl-shadow--4dp highlight-event-card-compact\">"+
	"<div class=\"mdl-card__media\"><img class=\"article-image\" src=\" images/highlight2.jpg\" border=\"0\" alt=\"\"></div>"+
	"<div class=\"mdl-card__title \"><h2 class=\"mdl-card__title-text\">Past Events</h2></div><div class=\"mdl-card__supporting-text\">"+
	"Past events about Cornerstone Volunteer Group.</div><div class=\"mdl-card__actions mdl-card--border\">"+
	"<a onclick=\"show_past_events()\" class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent\">Read More</a></div></div>";

	content = content + "";

	try {
		if (document.getElementById("event_content").innerHTML !== null){
			document.getElementById("event_content").innerHTML = "" + content;
		}		
	}catch(err){
		console.log(err);
	}
	
	return false;
}

function show_sponexample(name) {
	console.log(name);
	// window.location.href = "http://localhost/Volunteer/demo0/example.html";
	var url = "http://localhost/Volunteer/api/sponsor/" + name;
	var spon_obj = JSON.parse(GET(url));

	var url = "http://localhost/Volunteer/api/host_events/" + name;
	var he_obj = JSON.parse(GET(url));
	var size = Object.keys(he_obj.host_events).length;

	var host_events_detail = "";
	for (i=0; i<size; i++){
		var date = new Date(he_obj.host_events[i].evstime)
		host_events_detail += "<b style=\"color:black\">Event Name: </b>" + he_obj.host_events[i].evename + 
		"<br><b style=\"color:black\">Date: </b>" + date.getFullYear()+'-'+(date.getMonth()+1)+'-'+ date.getDate()+ "<br><br>";
	}

	var content = "";
	var phone = "";
	var email = "";
	var fax = "";

	if(spon_obj.sponsor[0].spphone !== null){phone = spon_obj.sponsor[0].spphone;}
	if(spon_obj.sponsor[0].spemail !== null){email = spon_obj.sponsor[0].spemail;}
	if(spon_obj.sponsor[0].spfax !== null){fax = spon_obj.sponsor[0].spfax;}

	content = content + "<div class=\"mdl-card__title\"><h2 class=\"mdl-card__title-text\">"+spon_obj.sponsor[0].spsname+"</h2></div>"+
	"<div class=\"mdl-card__media\"><img class=\"article-image\" src=\"images/hosts/"+name+"-wide.jpg\" border=\"0\" alt=\"\"></div>"+
	"<div class=\"mdl-grid highlight-copy\"><h3 class=\"mdl-cell mdl-cell--12-col mdl-typography--headline\">Description</h3>"+
	"<div class=\"mdl-cell mdl-cell--12-col mdl-card__supporting-text no-padding \"><p>"+spon_obj.sponsor[0].spsdesc+"</p></div>"+
	"<h3 class=\"mdl-cell mdl-cell--12-col mdl-typography--headline\">Events</h3><div class=\"mdl-cell mdl-cell--12-col "+
	"mdl-card__supporting-text no-padding \"><p>"+host_events_detail+"</p></div><h3 class=\"mdl-cell mdl-cell--12-col mdl-typography--headline\">"+
	"Contact Information</h3><div class=\"mdl-cell mdl-cell--12-col mdl-card__supporting-text no-padding \">"+
	"<p><b style=\"color:black\">Phone: </b>"+phone+"<br><b style=\"color:black\">Email: </b>"+email+"<br><b style=\"color:black\">Fax: </b>"+fax+"</p></div>";

	try {
		if (document.getElementById("sponsors_content").innerHTML !== null){
			document.getElementById("sponsors_content").innerHTML = content;
		}		
	}catch(err){
		console.log(err);
	}
	 
	return false;
}

function show_upcoming_events (){
	var up_url = "http://localhost/Volunteer/api/upcoming_events";
	var up_evobj = JSON.parse(GET(up_url));
	var size = Object.keys(up_evobj.upcoming_events).length;
	var content = "";

	if (size < 1) {
		content = content + "<div class=\"mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp highlight-card\"><div class=\"mdl-card__media\">"+
		"<img class=\"article-image\" src=\"images/photo-wide.jpg\" border=\"0\" alt=\"\"></div><div class=\"mdl-card__title\">"+
		"<h2 class=\"mdl-card__title-text\"><b>There is no upcoming events<br><br></b></h2></div>";
	}else{
		for (i=0; i<size; i++){
			var name = up_evobj.upcoming_events[i].evename;
			var desc = up_evobj.upcoming_events[i].evedesc;
			var date = up_evobj.upcoming_events[i].evstime;

			content = content + "<div class=\"mdl-cell mdl-card mdl-shadow--4dp highlight-card\"><div class=\"mdl-card__media\">"+
			"<img class=\"article-image\" src=\"images/picture7.jpg\" border=\"0\" alt=\"\"></div><div class=\"mdl-card__title\">"+
			"<h2 class=\"mdl-card__title-text\">"+name+"</h2></div><div class=\"mdl-card__supporting-text\"><div class=\"mdl-card__supporting-text padding-top\">\<span>Date: "+
			date+"</span></div>"+desc+"</div>"+"<div class=\"mdl-card__actions mdl-card--border\"><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent\""+
			"onclick=\"show_eventexample('"+name+"')\">Read more</a></div></div>";
		}
	}

	try {
		document.getElementById("event_content").innerHTML = content;		
	}catch(err){
		console.log(err);
	}
}

function show_past_events (){
	var up_url = "http://localhost/Volunteer/api/past_events";
	var past_evobj = JSON.parse(GET(up_url));
	var size = Object.keys(past_evobj.past_events).length;
	var content = "";
	
	for (i=0; i<size; i++){
		var name = past_evobj.past_events[i].evename;
		var desc = past_evobj.past_events[i].evedesc;
		var date = past_evobj.past_events[i].evstime;

		content = content + "<div class=\"mdl-cell mdl-card mdl-shadow--4dp highlight-card\"><div class=\"mdl-card__media\">"+
		"<img class=\"article-image\" src=\"images/picture7.jpg\" border=\"0\" alt=\"\"></div><div class=\"mdl-card__title\">"+
		"<h2 class=\"mdl-card__title-text\">"+name+"</h2></div><div class=\"mdl-card__supporting-text\">"+
		"<div class=\"mdl-card__supporting-text padding-top\"><span>Date: "+date+"</span><br><br></div>"+desc+"</div>"+
		"<div class=\"mdl-card__actions mdl-card--border\"><a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent\""+
		"onclick=\"show_eventexample('"+name+"', '"+date+"')\">Read more</a></div></div>";
	}

	try {
		document.getElementById("event_content").innerHTML = content;		
	}catch(err){
		console.log(err);
	}
}

function show_eventexample (name, stime){
	var url_eve = "http://localhost/Volunteer/api/event_detail/" + name + "/" + stime;
	var event_obj = JSON.parse(GET(url_eve));
	var url_loc = "http://localhost/Volunteer/api/event_location/" + name + "/" + stime;
	var locobj = JSON.parse(GET(url_loc));
	var url_mb = "http://localhost/Volunteer/api/event_members/" + name + "/" + stime;
	var mb_obj = JSON.parse(GET(url_mb));
	var members = "";

	var size = Object.keys(mb_obj.event_members).length;
	for (i=0; i<size; i++){
		members = members + mb_obj.event_members[i].mbname + "&nbsp;&nbsp;&nbsp;&nbsp;";
	}

	var content = "<div class=\"mdl-card__title\"><h2 class=\"mdl-card__title-text\">"+event_obj.event_detail[0].evename+"</h2></div>"+
	"<div class=\"mdl-card__media\"><img class=\"article-image\" src=\" images/photo-wide.jpg\" border=\"0\" alt=\"\"></div>"+
	"<div class=\"mdl-grid highlight-copy\"><h3 class=\"mdl-cell mdl-cell--12-col mdl-typography--headline\">Description</h3>"+
	"<div class=\"mdl-cell mdl-cell--12-col mdl-card__supporting-text no-padding \"><p>"+event_obj.event_detail[0].evedesc+"</p></div>"+
	"<h3 class=\"mdl-cell mdl-cell--12-col mdl-typography--headline\">Location</h3><div class=\"mdl-cell mdl-cell--12-col mdl-card__supporting-text no-padding \">"+
	"<p>"+locobj.event_location[0].locaddr+", "+locobj.event_location[0].loccity+", "+locobj.event_location[0].locprov+", "+locobj.event_location[0].locnation+"</p></div>"+
	"<h3 class=\"mdl-cell mdl-cell--12-col mdl-typography--headline\">Participants</h3><div class=\"mdl-cell mdl-cell--12-col mdl-card__supporting-text no-padding \">"+
	"<p>"+members+"</p></div>";

	try {
		document.getElementById("event_content").innerHTML = content;		
	}catch(err){
		console.log(err);
	}

	return false;
}

function show_picexamples(){

	// window.location.href = "http://localhost/Volunteer/demo0/examples.html";
	var url = "http://localhost/Volunteer/api/pictures";
	var pic_obj = JSON.parse(GET(url));
	var size = Object.keys(pic_obj.pictures).length;
	content = "";
	name = "";

	for (i=0; i<size; i++){
		name = pic_obj.pictures[i].picname + "." + pic_obj.pictures[i].picform;

		content = content + "<div class=\"mdl-cell mdl-cell--4-col mdl-card mdl-card mdl-shadow--4dp \" "+
		"><div class=\"mdl-card__media\"></div><div class=\"mdl-card__title mdl-card--expand \">"+name+"</div>"+
		"<img class=\"article-image\" src=\" images/pictures/"+name+"\" border=\"0\" alt=\"\"><div class=\"mdl-card__actions\">"+
		"<a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent\" "+ 
		"href=\"images/"+name+"\" download><span class=\"demo-card-image__filename\">Download</span></a></div></div>";
	}

	try {
		document.getElementById("event_content").innerHTML = content;		
	}catch(err){
		console.log(err);
	}
	 
	return false;
}

function send_email(){
	var name = document.getElementById("Name").value+" ";
	var note = document.getElementById("note").value;
	var newwin = window.open('mailto:foster336699@gmail.com?subject='+name+'&body='+note);
}



