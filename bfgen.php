<?php
$Gmode = $_GET['mode'];
$Gsize = $_GET['size'];


switch ($Gmode) {
  case 0:
  $re = array();
  for ($x = 0;$x<$Gsize;$x++) {
      array_push($re, []);
      for ($y = 0;$y<$Gsize;$y++) {
          array_push($re[$x], []);
      }
  }
  for ($x = 0;$x<$Gsize-1;$x++) {
      $ran = mt_rand(0, 6);
      if ($ran != 1) {
          array_push($re[$x][0], '', 'y-meng', 0, $x, 0);
      } else {
          array_push($re[$x][0], $ran, 'n-meng', 1, $x, 0);
      }
      $ran = mt_rand(0, 6);
      if ($ran != 1) {
          array_push($re[0][$x+1], '', 'y-meng', 0, 0, $x+1);
      } else {
          array_push($re[0][$x+1], $ran, 'n-meng', 1, 0, $x+1);
      }
      $ran = mt_rand(0, 6);
      if ($ran != 1) {
          array_push($re[$Gsize-1][$x], '', 'y-meng', 0, $Gsize-1, $x);
      } else {
          array_push($re[$Gsize-1][$x], $ran, 'n-meng', 1, $Gsize-1, $x);
      }
      $ran = mt_rand(0, 6);
      if ($ran != 1) {
          array_push($re[$x+1][$Gsize-1], '', 'y-meng', 0, $x+1, $Gsize-1);
      } else {
          array_push($re[$x+1][$Gsize-1], $ran, 'n-meng', 1, $x+1, $Gsize-1);
      }
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
              array_push($re[$x][$y], $percent-1, 'n-meng', 1, $x, $y);
          } else {
              array_push($re[$x][$y], '', 'y-meng', 0, $x, $y);
          }
      }
  }
  $re = json_encode($re);
  echo $re;
  file_put_contents('savedmap.json', $re);
  break;
  case 1:
  $contentd = file_get_contents('savedmap.json');
  echo $contentd;
  break;
  case 2:
  break;
}
