<?php
// require 'common.php';
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM game';
$vars = [];

if (isset($_GET['game'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT r.refID, r.fName, r.lName, a.status from referee as r, assignment as a, game as g where g.gameID = ? and r.refID = a.refID and g.gameID = a.gameID';
  $vars = [ $_GET['game'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($games, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
