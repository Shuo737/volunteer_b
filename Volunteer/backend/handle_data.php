<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "volunteer";

require 'db.php';
/* create connect*/
function get_connection(){
    global $dbname, $servername, $username, $password;
    $conn = new mysqli($servername, $username, "",$dbname);
    if($conn->connect_error){
        die("Connection Failed: " . $conn->connect_error);
    }
    return $conn;
}

function add_members($name, $phone, $email, $desc) {
	$sql = "select max(mbid) from member";
	$result = get_connection()->query($sql);
	// auto generate member id
	$maxid = $result->fetch_assoc();
	$new_id = $maxid["max(mbid)"] + 1;
	// auto generate member acronym
	$pieces = explode(" ", string);
	$rest1 = substr($pieces[0], 0, 2);
	$rest2 = substr($pieces[0], 0, 2);
	$new_acronym = strtoupper(implode('', array($rest1, $rest2)));

	$insert_sql = "insert into members (mbid, mbacronym, mbname, mbphone, mbemail, mbmdesc) values ('".$new_id."', '".$new_acronym."', '".$name."', '".$phone."', '".$email."', '".$desc."')";

	try{
		get_connection()->query($insert_sql);	
		$str = "<br>New record created successfully! Welcome to Cornerstone Volunteer Group!!!<br>";
	}catch(PDOException $e){
		$str = "<br>" . $e->getMessage();
	}
}

function add_events ($name, $stime, $etime, $desc) {
	$insert_sql = "insert into events (evename, evstime, evetime, evedesc) values ('".$name."', '".$stime."', '".$etime."', '".$desc."')";

	try{
		get_connection()->query($insert_sql);	
		$str = "<br>New event created successfully!<br>";
	}catch(PDOException $e){
		$str = "<br>" . $e->getMessage();
	}
}

function add_locations ($locname, $addr, $city, $prov, $nation, $phone, $email, $fax) {
	$insert_sql = "insert into locations (loclname, locaddr, loccity, locprov, locnation, locphone, locemail, locfax) values ('".$locname."', '".$addr."', '".$city."', '".$prov."', '".$nation."', '".$phone."', '".$email."', '".$fax."')";

	try{
		get_connection()->query($insert_sql);	
		$str = "<br>New location created successfully!<br>";
	}catch(PDOException $e){
		$str = "<br>" . $e->getMessage();
	}
}


?>