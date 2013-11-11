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
})
