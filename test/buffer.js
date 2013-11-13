var should = require('should');

describe('Buffer', function () {
    describe('#new Buffer(size)', function() {
        it('should be an new buffer with (size) byte', function() {
            var buf = new Buffer(1024)
            buf.should.be.an.instanceof(Buffer)
        })
    })

    describe('#new Buffer(array)', function() {
        it('should be an new buffer with (array) byte', function() {
            var buf = new Buffer([0, 1, 255])
            should.strictEqual(buf[2], 255)
        })
    })

    describe('new Buffer(str, [encoding])', function() {
        it('should be an new buffer with str with [encoding] default to "utf-8" ', function() {
            var buf = new Buffer('深圳')
            buf.should.be.an.instanceof(Buffer)
        })
    })

    describe('Buffer.isEncoding(encoding)', function() {
        it('should be true if accept an valid encoding', function() {
            Buffer.isEncoding('hex').should.be.true
        })
    })

    describe('buf.write(string, [offset], [length], [encoding])', function() {
        it('should return wirtten length', function() {
            var buf = new Buffer(256)
            var len = buf.write('chu zheng', 0);
            len.should.exactly(9)
        })
    })

    describe('buf.toString([encoding], [start], [end])', function() {
        it('should return string', function() {
            var buf = new Buffer(256);
            var len = buf.write('\u00bd + \u00bc = \u00be', 0);
            buf.toString('utf8', 0, len).should.be.type('string');
        })
    })

    describe('buf.toJSON()', function() {
        it('should return JSON-representation === array', function() {
            var buf = new Buffer('bad');
            var json_buf = buf.toJSON();
            json_buf.should.be.an.instanceof(Array);
        })
    })

    describe('buf[index]', function() {
        it('should can set buf byte with 0x00 0xFF 0 255', function() {
            var str = 'breaking bad',
                buf = new Buffer(str.length);

            for (var i = 0; i < str.length; i++) {
                buf[i] = str.charCodeAt(i)
            }

            buf.toString().should.be.exactly('breaking bad');
        })
    })
})
