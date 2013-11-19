var events = require('events'),
    EventEmitter = events.EventEmitter,
    should = require('should');

describe('Events', function () {
    describe('#Class: events.EventEmitter', function() {
        it('should return error msg if error event occur', function(done) {
            var emitter = new EventEmitter()
            emitter.on('error', function(msg) {
                msg.should.exactly('oh my God!')
                done()
            })
            emitter.emit('error', 'oh my God!')
        })

        it('should return tell me new listener name', function(done) {
            var emitter = new EventEmitter()
            emitter.on('newListener', function(evt_str, listener) {
                evt_str.should.exactly('something_happen')
                listener.should.be.an.instanceof(Function)
                done()
            })

            emitter.on('something_happen', function(){})
        })

        it('should return tell me listener be removed', function(done) {
            var emitter = new EventEmitter()
            emitter.on('removeListener', function(evt_str, listener) {
                evt_str.should.exactly('something_happen')
                listener.should.be.an.instanceof(Function)
                done()
            })
            emitter.on('something_happen', function(){})
            emitter.removeAllListeners('something_happen')
        })
    })

    describe('#emitter.addListener(event, listener), emitter.on(event, listener)', function() {
        it('should make sure listener attched to EventEmitter', function() {
            var emitter = new EventEmitter()
            emitter.on('something_happen', function(){})
            emitter.addListener('another_thing_happen', function(){})
            EventEmitter.listenerCount(emitter, 'something_happen').should.exactly(1)
            EventEmitter.listenerCount(emitter, 'another_thing_happen').should.exactly(1)
        })
    })

    describe('#emitter.once(event, listener)', function() {
        it('should make sure event only occur once', function(done) {
            var emitter = new EventEmitter()
            emitter.once('something_happen', function(msg){
                msg.should.exactly('wow')
                EventEmitter.listenerCount(emitter, 'something_happen').should.exactly(0)
                done()
            })
            emitter.emit('something_happen', 'wow')
        })
    })

    describe('#emitter.removeListener(event, listener)', function() {
        it('should no listeners', function() {
            var emitter = new EventEmitter()
            var callback = function(){}
            emitter.on('something_happen', callback)
            emitter.removeListener('something_happen', callback)
            emitter.listeners('something_happen').length.should.exactly(0)
        })
    })

    describe('#emitter.removeAllListeners([event])', function() {
        it('should no listeners', function() {
            var emitter = new EventEmitter()
            var callback = function(){}
            emitter.on('something_happen', callback)
            emitter.removeAllListeners('something_happen')
            emitter.listeners('something_happen').length.should.exactly(0)
        })
    })

    describe('#emitter.setMaxListeners(n)', function() {
        it('should no warning', function() {
            var emitter = new EventEmitter()
            var callback = function(){}
            emitter.setMaxListeners(100)
            for (var i = 0; i < 100; i++) {
                emitter.on('something_happen', callback)
            }
            emitter.listeners('something_happen').length.should.exactly(100)
        })
    })

    describe('#emitter.listeners(event)', function() {
        it('should return listeners array', function() {
            var emitter = new EventEmitter()
            var callback = function(){}
            for (var i = 0; i < 10; i++) {
                emitter.on('something_happen', callback)
            }
            emitter.listeners('something_happen').should.be.an.Array
        })
    })

    describe('#emitter.listeners(event)', function() {
        it('should return listeners array', function() {
            var emitter = new EventEmitter()
            var callback = function(){}
            for (var i = 0; i < 10; i++) {
                emitter.on('something_happen', callback)
            }
            emitter.listeners('something_happen').should.be.an.Array
        })
    })

    describe('#emitter.emit(event, [arg1], [arg2], [...])', function() {
        it('should return true if had listeners', function() {
            var emitter = new EventEmitter()
            var callback = function(){}
            emitter.on('something_happen', callback)

            emitter.emit('something_happen').should.exactly(true)

            emitter.removeAllListeners()

            emitter.emit('something_happen').should.exactly(false)
        })
    })

    describe('#emitter.emit(event, [arg1], [arg2], [...])', function() {
        it('should return true if had listeners', function() {
            var emitter = new EventEmitter()
            var callback = function(){}
            emitter.on('something_happen', callback)
            emitter.on('something_happen', callback)
            emitter.on('something_happen2', callback)

            EventEmitter.listenerCount(emitter, 'something_happen').should.exactly(2)
            EventEmitter.listenerCount(emitter, 'something_happen2').should.exactly(1)
        })
    })
})