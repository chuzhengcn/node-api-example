var events = require('events'),
    EventEmitter = events.EventEmitter,
    should = require('should'),
    stream  = require('stream'),
    fs      = require('fs'),
    u = require('util'),
    request = require('request');

var writeable = fs.createWriteStream(__dirname + '/../src/write-stream.text');

function writeOneMillionTimes(writer, data, encoding, callback) {
    var i = 100000;

    write();

    function write() {
        var ok = true;
        do {
            i -= 1;
            if (i === 0) {
                // last time!
                console.log('last time')
                writer.write(data, encoding, callback);
            } else {
                // see if we should continue, or wait
                // don't pass the callback, because we're not done yet.
                ok = writer.write(data, encoding);
                console.log(ok)
            }
        } while (i > 0 && ok);
        if (i > 0) {
            // had to stop early!
            // write some more once it drains
            writer.once('drain', write);
        }
    }
}

writeOneMillionTimes(writeable, '1', 'utf8', function() {
    console.log('done')
})
