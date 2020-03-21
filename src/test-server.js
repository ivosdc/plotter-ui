var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors({
    origin: '*'
}));

app.get('/config', function (req, res) {
        const data = [
            {
            zoomFactor: 1
            }];
        res.contentType("application/json");
        res.end(JSON.stringify(data));
})

var testServer = app.listen(8081, function () {
    var host = testServer.address().address;
    var port = testServer.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
})
