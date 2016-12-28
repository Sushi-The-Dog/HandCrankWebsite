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
                    console.log(data);
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
        seleted: false
    },
    methods: {

    }
})
var appbfgen = new Vue({
    el: '#appbfgen',
    data: {
        battlefield: [
            [
                ['test', 'y-meng'],
                ['test', 'n-meng']
            ],
            [
                ['test', 'y-meng'],
                ['test', 'n-meng']
            ]
        ],
        length: [0, 1]
    },
    methods: {
        mousein: function(x, y) {
            appdetails.seleted = true;
            appdetails.display = 'Coordinate: ' + x + ':' + y;
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
