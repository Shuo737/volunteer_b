<?php
// require_once('../backend/handle_data.php');
require 'db.php';
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->get('/managements','get_management');
$app->get('/pictures','get_pictures');
$app->get('/past_events','get_past_events');
$app->get('/upcoming_events','get_upcoming_events');
$app->get('/recent_events','get_recent_events');
$app->get('/sponsors','get_sponsors');
$app->get('/sponsor/:name','get_sponsor');
$app->get('/host_events/:name','get_host_events');
$app->get('/event_detail/:name/:stime','get_event_detail');
$app->get('/event_members/:name/:stime','get_event_members');
$app->get('/event_location/:name/:stime','get_event_location');

$app->run();

function get_pictures() {
    $sql = "select * from pictures order by pictures.picname ASC";

    try {
        $db = getDB();
        $stmt = $db->query($sql); 
        $pictures = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        // json_encode($sponsors)
        echo '{"pictures": ' . json_encode($pictures) . '}';
    } catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function get_sponsors() {
    $sql = "select * from sponsors";

    try {
        $db = getDB();
        $stmt = $db->query($sql); 
        $sponsors = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        // json_encode($sponsors)
        echo '{"sponsors": ' . json_encode($sponsors) . '}';
    } catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function get_sponsor($sponsor){
    $sql = "select * from sponsors where sponsors.spsname = '".$sponsor."'";

    try {
        $db = getDB();
        $stmt = $db->query($sql); 
        $sponsor = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"sponsor": ' . json_encode($sponsor) . '}';
    } catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function get_management() {
    $sql = "select mb.mbname, mt.mtposition, mb.mdesc from members mb, management mt where mt.mtid = mb.mbid and mt.mtacronym = mb.mbacronym";

    try {
        $db = getDB();
        $stmt = $db->query($sql); 
        $management = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"management": ' . json_encode($management) . '}';
    } catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function get_past_events() {
    $sql = "select * from events where current_date > events.evstime order by events.evstime DESC";

    try {
        $db = getDB();
        $stmt = $db->query($sql); 
        $past_events = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"past_events": ' . json_encode($past_events) . '}';
    } catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function get_upcoming_events() {
    $sql = "select * from events where current_date < events.evstime order by events.evstime ASC limit 1";

    try {
        $db = getDB();
        $stmt = $db->query($sql); 
        $upcoming_events = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"upcoming_events": ' . json_encode($upcoming_events) . '}';
    } catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function get_recent_events() {
    $sql = "select * from events where current_date > events.evstime order by events.evstime DESC limit 3";

    try {
        $db = getDB();
        $stmt = $db->query($sql); 
        $events = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"events": ' . json_encode($events) . '}';
    } catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function get_event_location($name, $stime) {
    $sql = "select loc.locaddr, loc.loccity, loc.locprov, loc.locnation from locations loc, events_locations el where el.evename = '".$name."' and el.evstime = '".$stime."' and el.spsname = loc.spsname and el.locaddr = loc.locaddr and el.loccity = loc.loccity";

    try {
        $db = getDB();
        $stmt = $db->query($sql); 
        $event_location = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"event_location": ' . json_encode($event_location) . '}';
    } catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function get_event_detail($name, $stime) {
    $sql = "select * from events ev where ev.evename = '".$name."' and ev.evstime = '".$stime."'";

    try {
        $db = getDB();
        $stmt = $db->query($sql); 
        $event_detail = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"event_detail": ' . json_encode($event_detail) . '}';
    } catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function get_event_members($name, $stime) {
    $sql = "select mb.mbname from members mb, members_events me where me.evename = '".$name."' and me.evstime = '".$stime."' and mb.mbid = me.mbid and mb.mbacronym = me.mbacronym";

    try {
        $db = getDB();
        $stmt = $db->query($sql); 
        $event_members = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"event_members": ' . json_encode($event_members) . '}';
    } catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function get_host_events($name){
    $sql = "select el.evename, el.evstime from events_locations el, sponsors sp where sp.spsname = '".$name."' and el.spsname = sp.spsname order by el.evstime DESC";

    try {
        $db = getDB();
        $stmt = $db->query($sql); 
        $host_events = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"host_events": ' . json_encode($host_events) . '}';
    } catch(PDOException $e) {
    //error_log($e->getMessage(), 3, '/var/tmp/phperror.log'); //Write error log
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
?>