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
        parttwomessage: 'and GO'
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
        build: function(){
          console.log("build");
        },
        train: function(){
          console.log("tarin");
        },
        mine: function(){
          console.log("mine");
        }
    }
})
var appcontrolpanel = new Vue({
    el: '#appcontrolpanel',
    data: {},
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
            if (appturn.currentmode == 0) {
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
                switch (appbfgen.battlefield[x][y][6][0]) {
                    case 0:
                        appdetails.building = 'Field';
                        break;
                    case 1:
                        appdetails.building = 'City';
                        break;
                    default:
                        appdetails.building = 'None';
                }
                switch (appbfgen.battlefield[x][y][6][1]) {
                    case 0:
                        appdetails.unit = 'Field';
                        break;
                    case 1:
                        appdetails.unit = 'Bow';
                        break;
                    default:
                        appdetails.unit = 'None';
                }
                switch (appbfgen.battlefield[x][y][6][2]) {
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
            appdetails.seleted = false;
            appdetails.display = 'clicked: ' + x + ':' + y;
        },
        greet: function() {
            console.log("GOODJOB");
        }

    }
})
