const { Readable } = require("stream");

module.exports = class BufferReader extends Readable {
  constructor(opts) {
    super(opts);

    if (typeof opts.buffer !== undefined) {
      this.buffer = Buffer.from(opts.buffer);

      this.offset = 0;
    } else {
      throw new Error("opts.buffer is required for BufferReader");
    }
  }

  _read(size) {
    if (this.offset > this.buffer.length) {
      // End reading
      this.push(null);
    } else {
      // Reading
      this.push(this.buffer.slice(this.offset, size));

      this.offset += size;
    }
  }
};