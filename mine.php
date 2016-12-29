<?php
$lx = $_POST['x'];
$ly = $_POST['y'];
$playerid = $_POST['playerid'];
$contentd = file_get_contents('savedmap.json');
$map = json_decode($contentd);
$size = count($map)-1;
$retu = [];
$res = $map[$lx][$ly][5];
//food
if ($map[$lx][$ly][5][0] > 1) {
    $map[$lx][$ly][5][0] -= 2;
    array_push($retu, [0,2,-2]);
} elseif ($map[$lx][$ly][5][0] == 0) {
    $map[$lx][$ly][5][0] = 1;
    array_push($retu, [0,1,1]);
} elseif ($map[$lx][$ly][5][0] == 1) {
    array_push($retu, [0,1,0]);
}
//production
if ($map[$lx][$ly][5][1] >= 10) {
    $map[$lx][$ly][5][1] += 1;
    array_push($retu, [1,1,1]);
} elseif ($map[$lx][$ly][5][1] >= 0) {
    $map[$lx][$ly][5][1] += 2;
    array_push($retu, [1,2,2]);
}
//culture
$map[$lx][$ly][5][2] += 1;
array_push($retu, [2,1,1]);
//gold
if ($map[$lx][$ly][5][3] > 0) {
    $map[$lx][$ly][5][3] -= 1;
    array_push($retu, [3,1,-1]);
}
$re = json_encode($retu);
$save = json_encode($map);
echo $re;
file_put_contents('savedmap.json', $save);
