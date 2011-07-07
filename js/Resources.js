var Resources;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Resources = (function() {
  function Resources() {
    this.imageHash = {};
    this.audioHash = {};
    this.incomplete = 0;
    this.completedListeners = [];
    this.audioTypeInfos = this.createAudioTypeInfos();
  }
  Resources.prototype.createAudioTypeInfos = function() {
    var audio, i, info, infos, _ref;
    infos = [
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
    for (i = _ref = infos.length - 1; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
      info = infos[i];
      if (!audio.canPlayType(info.type)) {
        infos.splice(i, 1);
      }
    }
    if (infos.length === 0) {
      throw 'Audio playback is supported by your browser!';
    }
    return infos;
  };
  Resources.prototype.addCompletedListener = function(callback) {
    return this.completedListeners.push(callback);
  };
  Resources.prototype.loadImage = function(fileName, callback) {
    var img;
    img = this.imageHash[fileName];
    if (img) {
      callback(img);
      return this;
    }
    this.imageHash[fileName] = img = new Image;
    ++this.incomplete;
    $(img).bind('load', __bind(function() {
      callback(img);
      return this.onLoad();
    }, this));
    $(img).bind('error', __bind(function() {
      return error("The resource " + fileName + " could not be found!");
    }, this));
    img.src = '/images/' + fileName;
    return this;
  };
  Resources.prototype.loadAudio = function(fileName, callback) {
    var audio;
    audio = this.audioHash[fileName];
    if (audio) {
      return callback(audio);
    }
    ++this.incomplete;
    return this.tryLoadAudio(fileName, 0, callback);
  };
  Resources.prototype.tryLoadAudio = function(fileName, typeIndex, callback) {
    var audio, info;
    if (typeIndex >= this.audioTypeInfos.length) {
      return error("The resource " + fileName + " could not be found!");
    }
    audio = new Audio();
    this.audioHash[fileName] = audio;
    $(audio).bind('canplay', __bind(function() {
      $(audio).unbind('error');
      callback(audio);
      return this.onLoad();
    }, this));
    $(audio).bind('error', __bind(function() {
      return this.tryLoadAudio(fileName, ++typeIndex, callback);
    }, this));
    info = this.audioTypeInfos[typeIndex];
    audio.src = "/audio/" + fileName + "." + info.extension;
    return this;
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