<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM assignment';
$vars = [];

if (isset($_GET['ref'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT a.assignmentID, a.gameID, r.refID, g.title, a.status FROM assignment as a, referee as r, game as g WHERE a.refID = r.refID and a.gameID = g.gameID and a.refID = ?';

  //NOT THIS WAY
  // $sql = 'SELECT * FROM offer WHERE studentId = ' . $_GET['student'];

  $vars = [ $_GET['ref'],$_POST['startDate'],$_POST['endDate'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$offers = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($offers, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
