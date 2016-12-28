<?php
$mode = $_GET['mode'];
$contentd = file_get_contents('savedmap.json');
$map = json_decode($contentd);
$size = count($map);
for ($x=0;$x<$size;$x++) {
    for ($y=0;$y<$size;$y++) {
        if ($map[$x][$y][2]) {
        }
    }
}
