class Fps {
  constructor() {
    // The higher this value, the less the fps will reflect temporary variations
    // A value of 1 will only keep the last value
    this.filterStrength = 20;
    this.frameTime = 0;
    this.lastLoop = new Date();
    this.thisLoop = null;
    this.value = 0;
    this.oldValue = 0;
  }

  setFps(now) {
    const thisFrameTime = (this.thisLoop = now) - this.lastLoop;
    this.frameTime += (thisFrameTime - this.frameTime) / this.filterStrength;
    this.lastLoop = this.thisLoop;
  }

  getFps() {
    const fps = 1000 / this.frameTime;
    if (fps < 70) {
      return fps.toFixed(0);
    }
    return '';
  }

  startServer() {
    setInterval(() => {
      this.value = Math.ceil(1000 / this.frameTime);
      if (this.value !== this.oldValue) {
        console.info(`${this.value} FPS`);
        this.oldValue = this.value;
      }
    }, 1000);
  }
}

module.exports = Fps;
