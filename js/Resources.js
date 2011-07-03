var Resources;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Resources = (function() {
  function Resources() {}
  Resources.prototype.hash = {};
  Resources.prototype.incomplete = 0;
  Resources.prototype.completedListeners = [];
  Resources.prototype.addCompletedListener = function(callback) {
    return this.completedListeners.push(callback);
  };
  Resources.prototype.getImage = function(url) {
    var img;
    img = this.hash[url];
    if (img) {
      return img;
    }
    img = new Image;
    this.hash[url] = img;
    ++this.incomplete;
    $(img).bind('load', __bind(function() {
      return this.onLoad();
    }, this));
    img.src = url;
    return img;
  };
  Resources.prototype.onLoad = function() {
    var callback, _i, _len, _ref, _results;
    --this.incomplete;
    if (this.incomplete === 0) {
      _ref = this.completedListeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback());
      }
      return _results;
    }
  };
  return Resources;
})();