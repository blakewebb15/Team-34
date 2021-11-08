<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT title, field, gDate, time
FROM game
WHERE gameID NOT IN (SELECT gameID FROM assignment)';
$vars = [];

// if (isset($_GET['student'])) {
//   // This is an example of a parameterized query
//   $sql = 'SELECT * FROM student WHERE studentID = ?';
//   $vars = [ $_GET['student'] ];
// }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$game = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format'] == 'csv' ) {
    header('Content-Type: text/csv');
    echo "Title,Field,Date,Time\r\n";

    foreach($game as $g) {
        echo $g['title'] . "," .$g['field'].','.$g['gDate'].','.$g['time']
          ."\r\n";
    }

} else {
    $json = json_encode($game, JSON_PRETTY_PRINT);

    header('Content-Type: application/json');
    echo $json;
}