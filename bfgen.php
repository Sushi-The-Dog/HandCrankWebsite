<?php
$Gmode = $_GET['mode'];
$Gsize = $_GET['size'];
$seares = [1,0,0,0,0];
$edgeres = [1,2,2,2,1];
$empty = [0,0,0];
function ranarea($ran)
{
    if ($ran == 0) {
        return 'muntion-meng';
    }
    if ($ran ==1) {
        return 'mud-meng';
    }
    if ($ran == 2) {
        return 'field-meng';
    }
    return 'n-meng';
}
function randres($ran, $limit, $leg)
{
    $leg -=1;
    $res = [0,0,0,0,0,0];
    $limit += $leg;
    switch ($ran) {
    case 0:
      $limit+=1;
    break;
    case 1:
      $limit += 3;
    break;
    case 2:
      $limit += 4;
    break;
    default:
      $limit +=2;
  }
    for ($x=0;$x<5;$x++) {
        $ran = mt_rand(0, $limit);
        $res[$x] = $ran;
        $res[5] += $ran;
    }

    return $res;
}
function rannum($ran)
{
    if ($ran == 0) {
        return 2;
    }
    if ($ran ==1) {
        return 3;
    }
    if ($ran == 2) {
        return 4;
    }
    return 1;
}
switch ($Gmode) {
  case 0:
  $grounds = 0;
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
          array_push($re[$x][0], '', 'y-meng', 0, $x, 0, $seares, $empty);
      } else {
          $rand = mt_rand(0, 6);
          $grounds ++;
          array_push($re[$x][0], '8', 'n-meng '.ranarea($rand), rannum($rand), $x, 0, $edgeres, $empty);
      }
      $ran = mt_rand(0, 6);
      if ($ran != 1) {
          array_push($re[0][$x+1], '', 'y-meng', 0, 0, $x+1, $seares, $empty);
      } else {
          $rand = mt_rand(0, 6);
          $grounds ++;
          array_push($re[0][$x+1], '8', 'n-meng '.ranarea($rand), rannum($rand), 0, $x+1, $edgeres, $empty);
      }
      $ran = mt_rand(0, 6);
      if ($ran != 1) {
          array_push($re[$Gsize-1][$x], '', 'y-meng', 0, $Gsize-1, $x, $seares, $empty);
      } else {
          $rand = mt_rand(0, 6);
          $grounds ++;
          array_push($re[$Gsize-1][$x], '8', 'n-meng '.ranarea($rand), rannum($rand), $Gsize-1, $x, $edgeres, $empty);
      }
      $ran = mt_rand(0, 6);
      if ($ran != 1) {
          array_push($re[$x+1][$Gsize-1], '', 'y-meng', 0, $x+1, $Gsize-1, $seares, $empty);
      } else {
          $rand = mt_rand(0, 6);
          $grounds ++;
          array_push($re[$x+1][$Gsize-1], '8', 'n-meng '.ranarea($rand), rannum($rand), $x+1, $Gsize-1, $edgeres, $empty);
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
              $rand = mt_rand(0, 6);
              $grounds ++;
              $res = randres($rand, 2, $percent);
              $rescount = $res[5];
              array_pop($res);
              array_push($re[$x][$y], $rescount, 'n-meng '.ranarea($rand), rannum($rand), $x, $y, $res, $empty);
          } else {
              array_push($re[$x][$y], '', 'y-meng', 0, $x, $y, $seares, $empty);
          }
      }
  }
  $output = json_encode($re);
  echo $output;
  array_push($re, [$grounds,0,0,0]);
  $save = json_encode($re);
  file_put_contents('savedmap.json', $save);
  break;
  case 1:
  $contentd = file_get_contents('savedmap.json');
  $edit = json_decode($contentd);
  array_pop($edit);
  $contentd = json_encode($edit);
  echo $contentd;
  break;
  case 2:
  break;
}
