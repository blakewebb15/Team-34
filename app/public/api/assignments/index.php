
<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
<<<<<<< Updated upstream
$sql = 'SELECT g.title, g.field, CONCAT(g.gDate,", ",g.time) as date, CONCAT(r.fName," ",r.lName) as ref FROM game as g, referee as r, 
assignment as a WHERE a.refID = r.refID and a.gameID = g.gameID';
=======
$sql = 'SELECT * FROM assignment';
>>>>>>> Stashed changes
$vars = [];

if (isset($_GET['game'])) {
  // This is an example of a parameterized query
  $sql = 'SELECT a.assignmentID, a.gameID, r.fName, r.lName, a.status FROM assignment as a, referee as r WHERE a.gameID = ?';

  //NOT THIS WAY
  // $sql = 'SELECT * FROM offer WHERE studentId = ' . $_GET['student'];

  $vars = [ $_GET['game'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$offers = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($offers, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
