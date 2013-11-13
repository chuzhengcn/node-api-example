buf = new Buffer(1);
len = buf.write('sq', 0);
console.log(len + " bytes: " + buf.toString('utf8', 0, len));
