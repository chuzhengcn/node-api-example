var assert = require('assert'),
    should = require('should');

describe('Assert', function () {
    describe('#assert.fail(actual, expected, message, operator)', function() {
        it('should throw an error', function() {
            try {
                assert.fail('chuzheng', 'chuzheng1', 'chuzheng !== chuzheng1', '+')
            } catch(err) {
                err.should.be.an.instanceOf(Error)
            }
        })

        it('should have message property', function() {
            try {
                assert.fail('chuzheng', 'chuzheng1', 'chuzheng !== chuzheng1', '+')
            } catch(err) {
                err.should.have.property('message', 'chuzheng !== chuzheng1')
            }
        })
    })

    describe('#assert(value, message)', function() {
        it('should throw error if value is false', function() {
            try {
                assert(0, '0 == false')
            } catch(err) {
                err.should.be.an.instanceOf(Error)
            }
        })

        it('should be undefined if value is true', function() {
            should.strictEqual(undefined, assert(1,'1 == true'))
        })
    })

    describe('#assert.ok(value, [message])', function() {
        it('should throw error if value is false and no message can be accecpted', function() {
            try {
                assert.ok(null)
            } catch(err) {
                err.should.be.an.instanceOf(Error)
            }
        })

        it('should be undefined if value is true', function() {
            should.strictEqual(undefined, assert.ok(0.1,'0.1 == true'))
        })
    })

    describe('assert.equal(actual, expected, [message])', function() {
        it('should throw error if actual !== expected and no message can be accecpted', function() {
            try {
                assert.equal(1, false, '1 != false')
            } catch(err) {
                err.should.be.an.instanceOf(Error)
            }
        })

        it('should be undefined if actual == expected', function() {
            should.strictEqual(undefined, assert.equal(0, false, '0 == false'))
        })
    })

    describe('assert.notEqual(actual, expected, [message])', function() {
        it('should throw error if actual == expected and no message can be accecpted', function() {
            try {
                assert.notEqual(0, false, '0 == false')
            } catch(err) {
                err.should.be.an.instanceOf(Error)
            }
        })

        it('should be undefined if actual !== expected', function() {
            should.strictEqual(undefined, assert.notEqual(1, false, '1 != false'))
        })
    })

    describe('assert.deepEqual(actual, expected, [message])', function() {
        it('should throw error if actual object not deep equal expected object and no message can be accecpted', function() {
            try {
                assert.deepEqual(['1','2'], ['1'], '["1","2"] not equal ["1"]')
            } catch(err) {
                err.should.be.an.instanceOf(Error)
            }
        })

        it('should be undefined if actual object deep equal expected object', function() {
            var a = {a : '1'},
                b = {a : '1'};

            should.strictEqual(undefined, assert.deepEqual(a, b))
        })
    })

    describe('assert.notDeepEqual(actual, expected, [message])', function() {
        it('should throw error if actual object deep equal expected object and no message can be accecpted', function() {
            try {
                var a = ['1','2'],
                    b = ['1','2'];

                assert.notDeepEqual(a, b, '["1","2"] not equal ["1", "2"]')
            } catch(err) {
                err.should.be.an.instanceOf(Error)
            }
        })

        it('should be undefined if actual object not deep equal expected object', function() {
            var a = {a : '1'},
                b = {b : '1'};

            should.strictEqual(undefined, assert.notDeepEqual(a, b))
        })
    })

    describe('assert.strictEqual(actual, expected, [message])', function() {
        it('should throw error if actual !== expected object and no message can be accecpted', function() {
            try {
                var a = ['1','2'],
                    b = ['1','2'];

                assert.strictEqual(a, b, '["1","2"] !== ["1", "2"]')
            } catch(err) {
                err.should.be.an.instanceOf(Error)
            }
        })

        it('should be undefined if actual === expected object', function() {
            var a = {a : '1'},
                b = a;

            should.strictEqual(undefined, assert.strictEqual(a, b))
        })
    })

    describe('assert.notStrictEqual(actual, expected, [message])', function() {
        it('should throw error if actual === expected object and no message can be accecpted', function() {
            try {
                var a = ['1','2'],
                    b = a;

                assert.notStrictEqual(a, b)
            } catch(err) {
                err.should.be.an.instanceOf(Error)
            }
        })

        it('should be undefined if actual !== expected object', function() {
            var a = {a : '1'},
                b = {a : '1'};

            should.strictEqual(undefined, assert.notStrictEqual(a, b))
        })
    })

    describe('assert.throws(block, [error], [message])', function() {
        it('[error] should be constructor if block throw a error', function() {
            assert.throws(
                function() {
                    throw new Error("Wrong value");
                },
                Error
            )
        })

        it('[error] should be RegExp include "value" if block throw a error', function() {
            assert.throws(
                function() {
                    throw new Error("Wrong value");
                },
                /value/
            )
        })

        it('[error] should be return true if block throw a error', function() {
            assert.throws(
                function() {
                    throw new Error("Wrong value");
                },
                function(err) {
                    if ( (err instanceof Error) && /value/.test(err) ) {
                        return true;
                    }
                },
                "unexpected error"
            );
        })
    })

    describe('assert.doesNotThrow(block, [message])', function() {
        it('should be error if block throw a error', function() {
            try {
                assert.doesNotThrow(
                    function() {
                        throw new Error("Wrong value");
                    },
                    'throw a error'
                )
            } catch(err) {
                err.should.be.an.instanceof(Error)
            }
        })

        it('should be undefined if block doesnot throw a error', function() {
            try {
                assert.doesNotThrow(
                    function() {
                        return true
                    },
                    'throw a error'
                )
            } catch(err) {
                should.strictEqual(undefined, err)
            }
        })
    })

    describe('assert.ifError(value)', function() {
        it('should be error if value is an err', function() {
            try {
                assert.ifError(new Error('bad bad bad!'))
            } catch(err) {
                err.should.be.an.instanceof(Error)
            }
        })

        it('should be undefined if value is a false value', function() {
            should.strictEqual(undefined, assert.ifError(null))
        })

        it('should be thrown if value is a true value', function() {
            try {
                assert.ifError(1)
            } catch (thrown) {
                thrown.should.be.ok
            }
        })
    })
})