(function() {
  this.log = function(x) {
    if (console) {
      console.log(x);
    }
    return x;
  };
}).call(this);
