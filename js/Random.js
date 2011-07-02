var Random;
Random = (function() {
  function Random(value) {
    if (value == null) {
      value = 0;
    }
    this.ceiling = 1073741824;
    this.seed(value);
  }
  Random.prototype.seed = function(value) {
    return this.value = parseInt(value);
  };
  Random.prototype.uInt = function() {
    this.value *= 1103515245;
    this.value += 12345;
    return this.value %= this.ceiling;
  };
  return Random;
})();