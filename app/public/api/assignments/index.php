<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT g.title, g.field, g.gDate, g.time, CONCAT(r.fName," ",r.lName) as ref FROM game as g, referee as r, 
assignment as a WHERE a.refID = r.refID and a.gameID = g.gameID';
$vars = [];

// if (isset($_GET['student'])) {
//   // This is an example of a parameterized query
//   $sql = 'SELECT * FROM student WHERE studentID = ?';
//   $vars = [ $_GET['student'] ];
// }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($games, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
