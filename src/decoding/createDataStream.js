import dissolve from 'dissolve'

export default function createDataStream() {
  return dissolve()
    .loop(function() {
      this
        .uint32("length")
        .int8("type")
        .tap(function() {
          if (this.vars.length) {
            this.buffer("payload", this.vars.length);
          }
        })
        .tap(function() {
          this.push(this.vars);
          this.vars = {};
        });
    });
}
