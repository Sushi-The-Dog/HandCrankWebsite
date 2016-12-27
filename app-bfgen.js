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
        greet: function(items) {
            console.log('Hello ' + items + '!')
        },
        getmap: function() {
            $.ajax({
                url: 'bfgen.php',
                type: 'GET',
                data: {
                    'mode': 0,
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
        }
    }
})
