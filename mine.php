<?php
$lx = $_POST['x'];
$ly = $_POST['y'];
$contentd = file_get_contents('savedmap.json');
$map = json_decode($contentd);
$size = count($map)-1;
$res = $map[$x][$y][5];
