(function() {
  var Random;
  Random = (function() {
    function Random(value) {
      if (value == null) {
        value = 0;
      }
      this.ceiling = 0x8FFFFFFF;
      this.seed(value);
    }
    Random.prototype.seed = function(value) {
      return this.value = Math.abs(Math.floor(value));
    };
    Random.prototype.uInt = function(max) {
      if (max == null) {
        max = this.ceiling;
      }
      this.value *= 1103515245;
      this.value += 12345;
      this.value %= this.ceiling;
      return this.value % max;
    };
    Random.prototype.intRange = function(min, max) {
      return this.uInt(max - min) + min;
    };
    Random.prototype.uFloat = function(max) {
      if (max == null) {
        max = 1.0;
      }
      return (this.uInt() / this.ceiling) * max;
    };
    Random.prototype.floatRange = function(min, max) {
      return this.uFloat(max - min) + min;
    };
    return Random;
  })();
  this.Random = Random;
}).call(this);
