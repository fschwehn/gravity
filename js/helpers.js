var log;
log = function(x) {
  if (console) {
    console.log(typeof x.toString === 'function' ? x.toString() : x);
  }
  return x;
};