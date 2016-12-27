<?php
$Gmode = $_GET['mode'];
$Gsize = $_GET['size'];

$re = array();
for ($x = 0;$x<$Gsize;$x++) {
    array_push($re, []);
    for ($y = 0;$y<$Gsize;$y++) {
        array_push($re[$x], []);
    }
}
switch ($Gmode) {
  case 0:
  for ($x = 0;$x<$Gsize-1;$x++) {
      array_push($re[$x][0], $x, 'y-meng', 0);
      array_push($re[0][$x+1], $x, 'y-meng', 0);
      array_push($re[$Gsize-1][$x], $x, 'y-meng', 0);
      array_push($re[$x+1][$Gsize-1], $x, 'y-meng', 0);
  }
  for ($x =1;$x<$Gsize-1;$x++) {
      for ($y =1;$y<$Gsize-1;$y++) {
          $percent = 1;
          if ($re[$x-1][$y-1][2] == 0) {
              $percent++;
          }
          if ($re[$x-1][$y][2] == 0) {
              $percent++;
          }
          if ($re[$x][$y-1][2] == 0) {
              $percent++;
          }
          $ran  = mt_rand(0, $percent);
          if ($ran == 0) {
              array_push($re[$x][$y], $percent-1, 'n-meng', 1);
          } else {
              array_push($re[$x][$y], $percent-1, 'y-meng', 0);
          }
      }
  }
  break;
  case 1:
  break;
}

$re = json_encode($re);
echo $re;
