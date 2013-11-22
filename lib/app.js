var events = require('events'),
    EventEmitter = events.EventEmitter,
    should = require('should'),
    stream  = require('stream'),
    fs      = require('fs'),
    u = require('util');

process.stdin.on('readable', function (argument) {
    console.log('ddd')
})
