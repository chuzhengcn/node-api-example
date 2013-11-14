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

    describe('Buffer.isBuffer(obj)', function() {
        it('should be true if obj is a Buffer object', function() {
            var buf = new Buffer('breaking bad');

            Buffer.isBuffer(buf).should.be.true;

        })
    })

    describe('Class Method: Buffer.byteLength(string, [encoding])', function() {
        it('should return actual byte length of a string', function() {
            var byte_length = Buffer.byteLength('楚正')

            byte_length.should.exactly(6);

        })
    })

    describe('Class Method: Buffer.concat(list, [totalLength])', function() {
        var buf1 = new Buffer('Pinkman'),
            buf2 = new Buffer('breakingbad'); 

        it('should return Pinkman, If the list has exactly one item', function() {
            Buffer.concat([buf1]).should.exactly(buf1)     
        })

        it('should return new Buffer inclued breaking bad Pinkman', function() {
            Buffer.concat([buf2,buf1], 18).toString().should.exactly('breakingbadPinkman')     
        })

    })

    describe('buf.length', function() {
        var buf = new Buffer(256)

        it('should always equal amount of memory allocated for the buffer object', function() {
            buf.length.should.exactly(256)   
        })

    })

    describe('buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])', function() {
        var buf     = new Buffer('Pinkman'),
            target  = new Buffer(7); 

        it('target should be Pinkman', function() {
            buf.copy(target)
            target.toString().should.exactly('Pinkman')   
        })
    })

    describe('buf.slice([start], [end])', function() {
        it('should be !bc which come from abc', function() {
            var buf1 = new Buffer(26);

            for (var i = 0 ; i < 26 ; i++) {
                buf1[i] = i + 97; // 97 is ASCII a
            }

            var buf2 = buf1.slice(0, 3);
            buf1[0] = 33;
            buf2.toString('ascii', 0, buf2.length).should.exactly('!bc');
        })
    })

















})
