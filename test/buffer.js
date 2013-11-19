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

    describe('buf.readUInt8(offset, [noAssert])', function() {
        it('should return a number < 255, because read a byte', function() {
            var buf = new Buffer(4);

            buf[0] = 0xA;
            buf[1] = 0xB;
            buf[2] = 0x23;
            buf[3] = 0x42;

            buf.readUInt8(1).should.exactly(11)
        })
    })

    describe('buf.readUInt16LE(offset, [noAssert]), buf.readUInt16BE(offset, [noAssert])', function() {
        var buf = new Buffer(4);

        buf[0] = 0x3;
        buf[1] = 0x4;
        buf[2] = 0x23;
        buf[3] = 0x42;

        it('should return a number < 255 * 255 form right to left, because read 16 bit', function() {
            buf.readUInt16LE(0).should.exactly(0x403)
        })

        it('should return a number < 255 * 255 form left to right, because read 16 bit', function() {
            buf.readUInt16BE(0).should.exactly(0x304)
        })
    })

    describe('buf.readUInt32LE(offset, [noAssert]), buf.readUInt32BE(offset, [noAssert])', function() {
        var buf = new Buffer(4);

        buf[0] = 0x3;
        buf[1] = 0x4;
        buf[2] = 0x23;
        buf[3] = 0x42;

        it('should return a number < 255 * 255 * 255 * 255 form right to left, because read 16 bit', function() {
            buf.readUInt32LE(0).should.exactly(0x42230403)
        })

        it('should return a number < 255 * 255 * 255 * 255 form left to right, because read 16 bit', function() {
            buf.readUInt32BE(0).should.exactly(0x3042342)
        })
    })

    describe('buf.readInt8(offset, [noAssert])', function() {
        it('should return a negtive number except buffer contents are treated as two\'s complement signed values [补码]', function() {
            var buf = new Buffer(4);

            buf[0] = 0xff;
            buf[1] = 0xff;
            buf[2] = 0x23;
            buf[3] = 0x42;

            buf.readInt8(1).should.exactly(-1)
        })
    })

    describe('buf.readInt16LE(offset, [noAssert]), buf.readInt16BE(offset, [noAssert])', function() {
        var buf = new Buffer(4);

        buf[0] = 0xff;
        buf[1] = 0xff;
        buf[2] = 0x23;
        buf[3] = 0x42;

        it('should return a negtive number', function() {
            buf.readInt16BE(1).should.be.below(0)
        })

        it('should return a positive number', function() {
            buf.readInt16LE(1).should.be.above(0)
        })
    })

    describe('buf.readInt32LE(offset, [noAssert]), buf.readInt32BE(offset, [noAssert])', function() {
        var buf = new Buffer(4);

        buf[0] = 0xff;
        buf[1] = 0xff;
        buf[2] = 0x23;
        buf[3] = 0x42;

        it('should return a negtive number', function() {
            buf.readInt32BE(0).should.be.below(0)
        })

        it('should return a positive number', function() {
            buf.readInt32LE(0).should.be.above(0)
        })
    })

    describe('buf.readFloatLE(offset, [noAssert]), buf.readFloatBE(offset, [noAssert])', function() {
        var buf = new Buffer(4);

        buf[0] = 0xf0;
        buf[1] = 0x00;
        buf[2] = 0x80;
        buf[3] = 0x00;

        // 第一位表示正负，后八位表示指数，后23位表示精度

        it('should return a negtive float', function() {
            buf.readFloatBE(0).should.below(0)
            buf.readFloatBE(0).toString().indexOf('.').should.above(-1)
        })

        it('should return a positive float', function() {
            buf.readFloatLE(0).should.be.above(0)
            buf.readFloatLE(0).toString().indexOf('.').should.above(-1)
        })
    })

    describe('buf.readDoubleLE(offset, [noAssert]), buf.readDoubleBE(offset, [noAssert])', function() {
        var buf = new Buffer(8);

        buf[0] = 0xf5;
        buf[1] = 0x55;
        buf[2] = 0x55;
        buf[3] = 0x55;
        buf[4] = 0x55;
        buf[5] = 0x55;
        buf[6] = 0xd5;
        buf[7] = 0x3f;

        // 第一位表示正负， 后面11位表示次方数， 最后52位表示精度

        it('should return a negtive float', function() {
            buf.readDoubleBE(0).should.below(0)
            buf.readDoubleBE(0).toString().indexOf('.').should.above(-1)
        })

        it('should return a positive float', function() {
            buf.readDoubleLE(0).should.be.above(0)
            buf.readDoubleLE(0).toString().indexOf('.').should.above(-1)
        })
    })

    describe('buf.writeUInt8(value, offset, [noAssert])', function() {
        var buf = new Buffer(4);
        buf.writeUInt8(0x3, 0);
        buf.writeUInt8(0x4, 1);
        buf.writeUInt8(0x23, 2);
        buf.writeUInt8(0x42, 3);

        it('should return a Buffer', function() {
            buf.toJSON()[1].should.exactly(4)
        })
    })

    describe('buf.writeUInt16LE(value, offset, [noAssert]), buf.writeUInt16BE(value, offset, [noAssert])', function() {
        it('should return a hex', function() {
            var buf = new Buffer(4);
            buf.writeUInt16BE(0xdead, 0);
            buf.writeUInt16BE(0xbeef, 2);

            buf.toJSON()[0].toString(16).should.exactly('de')
            buf.toJSON()[1].toString(16).should.exactly('ad')
        })

        it('should return a hex', function() {
            var buf = new Buffer(4);
            buf.writeUInt16LE(0xdead, 0);
            buf.writeUInt16LE(0xbeef, 2);
            
            buf.toJSON()[0].toString(16).should.exactly('ad')
            buf.toJSON()[1].toString(16).should.exactly('de')
        })
    })

    describe('buf.writeUInt32LE(value, offset, [noAssert]), buf.writeUInt32BE(value, offset, [noAssert])', function() {
        it('should return a hex', function() {
            var buf = new Buffer(4);
            buf.writeUInt32BE(0xfeedface, 0);

            buf.toJSON()[0].toString(16).should.exactly('fe')
            buf.toJSON()[3].toString(16).should.exactly('ce')
        })

        it('should return a hex', function() {
            var buf = new Buffer(4);
            buf.writeUInt32LE(0xfeedface, 0);
            
            buf.toJSON()[0].toString(16).should.exactly('ce')
            buf.toJSON()[1].toString(16).should.exactly('fa')
        })
    })

    describe('buf.writeFloatLE(value, offset, [noAssert]), buf.writeFloatBE(value, offset, [noAssert])', function() {
        it('should write float success', function() {
            var buf = new Buffer(4);
            buf.writeFloatBE(0xcafebabe, 0);

            buf.toJSON()[0].toString(16).should.exactly('4f')
        })
    })

    describe('buf.writeDoubleLE(value, offset, [noAssert]), buf.writeDoubleBE(value, offset, [noAssert])', function() {
        it('should write double success', function() {
            var buf = new Buffer(8);
            buf.writeDoubleBE(0xdeadbeefcafebabe, 0);

            buf.toJSON()[0].toString(16).should.exactly('43')
        })
    })

    describe('buf.fill(value, [offset], [end])', function() {
        it('should return all ccccc', function() {
            var buf = new Buffer(5);
            buf.fill('c')

            buf.toString().should.exactly('ccccc')
        })
    })

    describe('buffer.INSPECT_MAX_BYTES', function() {
        it('should return buffer string default 50 bytes', function() {
            var buffer = require('buffer')           
            buffer.INSPECT_MAX_BYTES.should.exactly(50)
            buffer.INSPECT_MAX_BYTES = 60
            buffer.INSPECT_MAX_BYTES.should.exactly(60)
        })
    })

    // todo : Class: SlowBuffer
})
