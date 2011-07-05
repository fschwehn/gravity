var Resources;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Resources = (function() {
  function Resources() {
    this.imageHash = {};
    this.audioHash = {};
    this.incomplete = 0;
    this.completedListeners = [];
    this.audioTypeInfo = this.createAudioTypeInfo();
  }
  Resources.prototype.createAudioTypeInfo = function() {
    var audio, info, typeInfos, _i, _len;
    typeInfos = [
      {
        type: 'audio/ogg',
        extension: 'ogg'
      }, {
        type: 'audio/mpeg',
        extension: 'mp3'
      }, {
        type: 'audio/wav',
        extension: 'wav'
      }
    ];
    audio = new Audio();
    for (_i = 0, _len = typeInfos.length; _i < _len; _i++) {
      info = typeInfos[_i];
      if (audio.canPlayType(info.type)) {
        return info;
      }
    }
    alert('Audio playback is supported by your browser!');
    return null;
  };
  Resources.prototype.addCompletedListener = function(callback) {
    return this.completedListeners.push(callback);
  };
  Resources.prototype.getImage = function(subPath) {
    var img;
    img = this.imageHash[subPath];
    if (!img) {
      this.imageHash[subPath] = img = new Image;
      $(img).bind('load', __bind(function() {
        return this.onLoad();
      }, this));
      img.src = '/images/' + subPath;
      ++this.incomplete;
    }
    return img;
  };
  Resources.prototype.getAudio = function(fileName) {
    var audio;
    audio = this.audioHash[fileName];
    if (!audio) {
      this.audioHash[fileName] = audio = new Audio();
      audio.src = "/audio/" + fileName + "." + this.audioTypeInfo.extension;
      $(audio).bind('canplay', __bind(function() {
        return this.onLoad();
      }, this));
      ++this.incomplete;
    }
    return audio;
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