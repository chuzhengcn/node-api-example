var stream  = require('stream'),
    request = require('request'),
    http    = require('http'),
    fs      = require('fs'),
    should  = require('should');

describe('Stream', function () {

    // #Event readable
    describe('#Event readable', function() {
        it('should emit readable event', function(done) {
            var readable = fs.createReadStream(__dirname + '/events.js')

            var readable_event_fired = false

            readable.on('readable', function() {
                readable_event_fired = true
            })

            readable.on('data', function() {})

            readable.on('end', function() {
                readable_event_fired.should.be.true
                done()
            })
        })
    })

    // 'data and end events'
    describe('#Event: "data", #Event: "end"', function() {
        it('should emit data event', function(done) {
            var readable = fs.createReadStream(__dirname + '/events.js')
            readable.on('data', function(chunk) {
                chunk.should.an.instanceof(Buffer)
            })

            readable.on('end', function() {
                ('data end fired').should.be.type('string')
                done()
            })
        })
    })

    describe("#Event: 'close'", function() {
        it('should emit close event', function(done) {
            var readable = fs.createReadStream(__dirname + '/events.js')
            readable.on('data', function(chunk) {
                chunk.should.an.instanceof(Buffer)
            })

            readable.on('end', function() {
                ('data end fired').should.be.type('string')
            })

            readable.on('close', function() {
                ('file closed').should.be.type('string')
                done()
            })
        })
    })

    describe("#Event: 'error'", function() {
        it('should not emit err event', function(done) {
            var readable = fs.createReadStream(__dirname + '/events.js'),
                error_occured = false
            readable.on('data', function(chunk) {
                chunk.should.an.instanceof(Buffer)
            })

            readable.on('error', function() {
                error_occured = true
            })

            readable.on('end', function() {
                error_occured.should.be.false
                done()
            })
        })
    })

    describe("#readable.read([size])", function() {
        it('chunk should return all buffer length', function(done) {
            var readable = fs.createReadStream(__dirname + '/events.js');

            readable.on('readable', function() {
                var chunk = readable.read();

                while (null !== chunk) {
                    chunk.length.should.exactly(5657)
                    chunk = readable.read()
                    should.strictEqual(chunk, null)
                    done()
                }
            })
        })
    })

    describe("#readable.setEncoding(encoding)", function() {
        it('chunk should be string', function(done) {
            var readable = fs.createReadStream(__dirname + '/events.js');

            readable.setEncoding('utf8');

            var events_str = ''

            readable.on('data', function(chunk) {
                events_str += chunk
            })

            readable.on('end', function() {
                events_str.should.be.type('string')
                done()
            })
        })
    })

    describe("#readable.resume()", function() {
        it('can use end event even no data event', function(done) {
            var readable = fs.createReadStream(__dirname + '/events.js');

            readable.resume();

            readable.on('end', function() {
                ('end event fired').should.type('string')
                done()
            })
        })
    })

    describe("#readable.pause()", function() {
        it('can pause data event', function(done) {
            var readable = fs.createReadStream(__dirname + '/../src/breaking-bad.jpg');

            readable.on('data', function(chunk) {
                chunk.length.should.be.type('number');
                readable.pause();
                setTimeout(function() {
                    readable.resume();
                }, 50);
            })

            readable.on('end', function() {
                done()
            })
        })
    })

    describe("#readable.pipe(destination, [options])", function() {
        it('can use pipe to generate a big file', function(done) {
            var readable = fs.createReadStream(__dirname + '/../src/breaking-bad.jpg'),
                writeable = fs.createWriteStream(__dirname + '/../src/breaking-bad2.jpg');

            readable.pipe(writeable)

            writeable.on('finish', function() {
                done()                
            })
        })
    })

    describe("#readable.unpipe([destination])", function() {
        it('can pause data event', function(done) {
            var readable = fs.createReadStream(__dirname + '/../src/breaking-bad.jpg'),
                writeable = fs.createWriteStream(__dirname + '/../src/breaking-bad2.jpg');

            readable.pipe(writeable)

            setTimeout(function () {
                readable.unpipe()
                writeable.end()
                fs.statSync(__dirname + '/../src/breaking-bad2.jpg').size.should.below(1000000)
                done()
            }, 50)
        })
    })

    // todo : #readable.unshift(chunk)

    // info : #readable.warp(stream)
})


