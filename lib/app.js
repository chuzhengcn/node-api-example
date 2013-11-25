var events = require('events'),
    EventEmitter = events.EventEmitter,
    should = require('should'),
    stream  = require('stream'),
    fs      = require('fs'),
    u = require('util'),
    request = require('request');

var readable = fs.createReadStream(__dirname + '/../src/breaking-bad.jpg'),
    writeable = fs.createWriteStream(__dirname + '/../src/breaking-bad2.jpg');

readable.pipe(writeable)

setTimeout(function () {
    readable.unpipe()
}, 50)


