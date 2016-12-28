var appmain = new Vue({
    el: '#appmain',
    data: {
        message: 'Hello Vue!'
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
                    data = JSON.parse(data);
                    appbfgen.length = [];
                    for (i = 0; i < data.length; i++) {
                        appbfgen.length.push(i);
                    }
                    appbfgen.battlefield = data;
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
                },
                error: function() {
                    console.log("ERROR with failed REQUEST");
                }
            });
        }
    }
})
var appdetails = new Vue({
    el: '#appdetails',
    data: {
        display: 'Ready',
        type: '',
        building: '',
        unit: '',
        bandn: '',
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
            appdetails.seleted = true;
            // appdetails.display = appbfgen.battlefield[x][y];
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
            appdetails.type = 'Block type: ' + type;
            appdetails.building = 'Building: ';
            appdetails.unit = 'Unit: ';
            appdetails.bandn = 'Buff/Nerfs: ';
        },
        mouseout: function(x, y) {
            if (appdetails.seleted) {
                appdetails.seleted = false;
                appdetails.display = 'Ready';
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
