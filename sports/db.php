<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "skf_map";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT `id`, `name`, `address`, `lat`, `lng`, `type`,image FROM `markers`";
$result = $conn->query($sql);
$output=array();
if ($result->num_rows > 0) { 
  // output data of each row
  $i=0;
  while($row = $result->fetch_assoc()) {
    $output[$i]["id"]=$row["id"];
    $output[$i]["name"]=$row["name"];
    $output[$i]["address"]=$row["address"];
    $output[$i]["lat"]=$row["lat"];
    $output[$i]["lng"]=$row["lng"];
    $output[$i]["type"]=$row["type"];
    $output[$i]["image"]=$row["image"];
    $i++;
  }
  
} else {
  echo "0 results";
}
$conn->close();
echo json_encode($output);
?>