var appmain = new Vue({
    el: '#appmain',
    data: {
        message: 'Hello Vue!',
        showing: true
    },
    methods: {
        ShowH: function() {
            if (appmain.showing) {
                appmain.showing = false;
                document.getElementById("appcontrolpanel").style.display = 'none';
                document.getElementById("appturn").style.display = '';
            } else {
                appmain.showing = true;
                document.getElementById("appcontrolpanel").style.display = '';
                document.getElementById("appturn").style.display = 'none';
            }
        }
    }
})
var appturn = new Vue({
    el: '#appturn',
    data: {
        actionneed: 1,
        currentmode: 0,
        nextmessage: 'SKIP',
        parttwomessage: 'and GO',
        currentcolored: []
    },
    methods: {
        nextturn: function() {
            console.log("NEXTTURN");
        },
        gonext: function() {
            appturn.actionneed -= 1;
            if (appturn.actionneed == 0) {
                appturn.nextmessage = 'READY';
                appturn.parttwomessage = 'for';
            }
        },
        build: function() {
            console.log("build");
        },
        train: function() {
            console.log("tarin");
        },
        mine: function() {
            var size = appbfgen.battlefield.length - 1;
            for (i = 0; i < size; i++) {
                for (j = 0; j < size; j++) {
                    for (k = 0; k < 3; k++) {
                        if (appbfgen.battlefield[i][j][6][k][0] != 0) {
                            $("#" + i + "_" + j).addClass("select-meng");
                            appturn.currentcolored.push([i + "_" + j, 1]);
                            console.log(appturn.currentcolored);
                            appturn.currentmode = 1;
                            appdetails.display = 'Pick Target';
                        }
                    }
                }
            }
        }
    }
})
var appcontrolpanel = new Vue({
    el: '#appcontrolpanel',
    data: {

    },
    methods: {
        loadmap: function(items) {
            $.ajax({
                url: 'bfgen.php',
                type: 'GET',
                data: {
                    'mode': 1,
                    'size': 20
                },
                success: function(data) {
                    appbfgen.length = [];
                    data = JSON.parse(data);
                    for (i = 0; i < data.length; i++) {
                        appbfgen.length.push(i);
                    }
                    appbfgen.battlefield = data;
                    appdetails.display = 'Load Complete';
                },
                error: function() {
                    console.log("ERROR with failed REQUEST");
                }
            });
        },
        genspawn: function() {
            $.ajax({
                url: 'Spawn.php',
                type: 'GET',
                data: {
                    'mode': 0
                },
                success: function(data) {
                    if (data.length > 5) {
                        data = JSON.parse(data);
                        console.log(data);
                        appbfgen.length = [];
                        for (i = 0; i < data.length; i++) {
                            appbfgen.length.push(i);
                        }
                        appbfgen.battlefield = data;
                        appdetails.display = 'Spawned';
                    } else {
                        appdetails.display = 'Already Spawned';
                    }
                },
                error: function() {
                    console.log("ERROR with failed REQUEST");
                }
            });
        },
        genmap: function() {
            $.ajax({
                url: 'bfgen.php',
                type: 'GET',
                data: {
                    'mode': 0,
                    'size': 24
                },
                success: function(data) {
                    data = JSON.parse(data);
                    appbfgen.length = [];
                    for (i = 0; i < data.length; i++) {
                        appbfgen.length.push(i);
                    }
                    appbfgen.battlefield = data;
                    appdetails.display = 'Generated';
                },
                error: function() {
                    console.log("ERROR with failed REQUEST");
                }
            });
        }
    }
})
var appplayer = new Vue({
    el: '#appplayer',
    data: {
        food: '',
        production: '',
        culture: '',
        gold: '',
        happiness: ''
    },
    methods: {}
})
var appdetails = new Vue({
    el: '#appdetails',
    data: {
        display: 'Ready',
        type: '',
        building: '',
        unit: '',
        bandn: '',
        rescoursef: '',
        rescoursep: '',
        rescoursec: '',
        rescourseg: '',
        rescourseh: '',
        seleted: false
    },
    methods: {

    }
})
var appbfgen = new Vue({
    el: '#appbfgen',
    data: {
        battlefield: [],
        length: [0, 1]
    },
    methods: {
        mousein: function(x, y) {
            switch (appturn.currentmode) {
                case 0:
                    appdetails.seleted = true;
                    var type = '';
                    switch (appbfgen.battlefield[x][y][2]) {
                        case 1:
                            type = 'Ground';
                            break;
                        case 2:
                            type = 'Mountain'
                            break;
                        case 3:
                            type = 'Mud';
                            break;
                        case 4:
                            type = 'Grass Field';
                            break;
                        default:
                            type = 'Sea';
                    }
                    appdetails.display = 'Coordinate: ' + x + ':' + y;
                    appdetails.type = type;
                    switch (appbfgen.battlefield[x][y][6][0][0]) {
                        case 0:
                            appdetails.building = 'Field';
                            break;
                        case 1:
                            switch (appbfgen.battlefield[x][y][6][0][1]) {
                                case 1:
                                    appdetails.building = 'Blue\'s ';
                                    break;
                                default:
                                    appdetails.building = 'Nobody\'s ';
                            }
                            appdetails.building += 'City';
                            break;
                        default:
                            appdetails.building = 'None';
                    }
                    switch (appbfgen.battlefield[x][y][6][1][0]) {
                        case 0:
                            appdetails.unit = 'Field';
                            break;
                        case 1:
                            appdetails.unit = 'Bow';
                            break;
                        default:
                            appdetails.unit = 'None';
                    }
                    switch (appbfgen.battlefield[x][y][6][2][0]) {
                        case 0:
                            appdetails.bandn = 'Field';
                            break;
                        case 1:
                            appdetails.bandn = 'Worker';
                            break;
                        default:
                            appdetails.bandn = 'None';
                    }
                    appdetails.rescoursef = appbfgen.battlefield[x][y][5][0];
                    appdetails.rescoursep = appbfgen.battlefield[x][y][5][1];
                    appdetails.rescoursec = appbfgen.battlefield[x][y][5][2];
                    appdetails.rescourseg = appbfgen.battlefield[x][y][5][3];
                    appdetails.rescourseh = appbfgen.battlefield[x][y][5][4];
                    break;
                case 1:
                    appdetails.seleted = true;
                    var type = '';
                    switch (appbfgen.battlefield[x][y][2]) {
                        case 1:
                            type = 'Ground';
                            break;
                        case 2:
                            type = 'Mountain'
                            break;
                        case 3:
                            type = 'Mud';
                            break;
                        case 4:
                            type = 'Grass Field';
                            break;
                        default:
                            type = 'Sea';
                    }
                    appdetails.type = type;
                    switch (appbfgen.battlefield[x][y][6][0][0]) {
                        case 0:
                            appdetails.building = 'Field';
                            break;
                        case 1:
                            switch (appbfgen.battlefield[x][y][6][0][1]) {
                                case 1:
                                    appdetails.building = 'Blue\'s ';
                                    break;
                                default:
                                    appdetails.building = 'Nobody\'s ';
                            }
                            appdetails.building += 'City';
                            break;
                        default:
                            appdetails.building = 'None';
                    }
                    switch (appbfgen.battlefield[x][y][6][1][0]) {
                        case 0:
                            appdetails.unit = 'Field';
                            break;
                        case 1:
                            appdetails.unit = 'Bow';
                            break;
                        default:
                            appdetails.unit = 'None';
                    }
                    switch (appbfgen.battlefield[x][y][6][2][0]) {
                        case 0:
                            appdetails.bandn = 'Field';
                            break;
                        case 1:
                            appdetails.bandn = 'Worker';
                            break;
                        default:
                            appdetails.bandn = 'None';
                    }
                    appdetails.rescoursef = appbfgen.battlefield[x][y][5][0];
                    appdetails.rescoursep = appbfgen.battlefield[x][y][5][1];
                    appdetails.rescoursec = appbfgen.battlefield[x][y][5][2];
                    appdetails.rescourseg = appbfgen.battlefield[x][y][5][3];
                    appdetails.rescourseh = appbfgen.battlefield[x][y][5][4];
                    break;
                default:
            }
        },
        mouseout: function(x, y) {
            if (appturn.currentmode == 0) {
                if (appdetails.seleted) {
                    appdetails.seleted = false;
                    appdetails.display = 'Ready';
                }
            }
        },
        clicked: function(x, y) {
            switch (appturn.currentmode) {
                case 0:
                    appdetails.display = 'Clicked' + x + ":" + y;
                    break;
                case 1:
                    appdetails.seleted = false;
                    for (i = 0; i < appturn.currentcolored.length; i++) {
                        target = appturn.currentcolored[i][0];
                        $("#" + target).removeClass("select-meng");
                    }
                    appturn.currentcolored = [];
                    $.ajax({
                        url: 'mine.php',
                        type: 'POST',
                        data: {
                            'location': target
                        },
                        success: function(data) {
                            data = JSON.parse(data);
                        },
                        error: function() {
                            console.log("ERROR with failed REQUEST");
                        }
                    });
                    appturn.currentmode = 0;
                    break;
                default:
                    appdetails.display = 'Clicked with UNBELIVEABLE ERROR';

            }

        },
        greet: function() {
            console.log("GOODJOB");
        }

    }
})
