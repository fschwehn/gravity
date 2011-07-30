var AudioSampler;
AudioSampler = (function() {
  function AudioSampler(numVoices) {
    if (numVoices == null) {
      numVoices = 4;
    }
    this.channels = [];
    this.numVoices = 0;
    this.setNumVoices(numVoices);
    this.nextChannel = 0;
  }
  AudioSampler.prototype.setNumVoices = function(numVoices) {
    if (this.numVoices > numVoices) {
      this.channels.splice(numVoices);
    } else {
      while (this.channels.length < numVoices) {
        this.channels.push(new Audio);
      }
    }
    this.numVoices = numVoices;
    return this;
  };
  AudioSampler.prototype.play = function(url) {
    var c;
    c = this.channels[this.nextChannel];
    c.src = url;
    c.play();
    return this.nextChannel = (this.nextChannel + 1) % this.numVoices;
  };
  return AudioSampler;
})();