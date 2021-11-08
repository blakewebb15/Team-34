<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM assignment';
$vars = [];

if (isset($_GET['ref'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT g.title, g.field, g.gDate, g.time
  FROM game AS g, assignment AS a, referee AS r
  WHERE g.gameID = a.gameID
  AND r.refID = a.refID and a.refID = ? and g.gDate BETWEEN ? and ?';

  //NOT THIS WAY
  // $sql = 'SELECT * FROM offer WHERE studentId = ' . $_GET['student'];

  $vars = [ $_GET['ref'],$_GET['startDate'],$_GET['endDate']];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();


if (isset($_GET['format']) && $_GET['format'] == 'csv' ) {
    header('Content-Type: text/csv');
    echo "Title,Field,Date,Time\r\n";

    foreach($games as $g) {
        echo $g['title'] . "," .$g['field'].','.$g['gDate'].','.$g['time']
          ."\r\n";
    }

} else {
    $json = json_encode($games, JSON_PRETTY_PRINT);

    header('Content-Type: application/json');
    echo $json;
}