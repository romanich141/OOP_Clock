export default class Clock {
  constructor(mountPoint = document.querySelector("body")) {
    this.mountPoint = mountPoint;
    this.activeMode = 0;
  }
  init() {
    console.log("init");
    this.render();
    this.renderBackground();
    this.setTime();
    this.attachEvents();
  }

  render() {
    this.wrapper = document.createElement("div");
    this.container = document.createElement("div");

    this.wrapper.classList.add("clock__wrapper");
    this.container.classList.add("clock__container");

    this.wrapper.appendChild(this.container);
    this.mountPoint.appendChild(this.wrapper);
  }

  getRandomNumber(max) {
    return Math.random() * max;
  }

  getRandomColor() {
    return `rgb(
      ${this.getRandomNumber(255)}
      ${this.getRandomNumber(255)}
      ${this.getRandomNumber(255)}
    )`;
  }

  normalizeTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
  }

  getFull() {
    const currentDate = new Date();
    const YYYY = currentDate.getFullYear();
    const MM = this.normalizeTime(currentDate.getMonth() + 1);
    const DD = this.normalizeTime(currentDate.getDate());
    const h = this.normalizeTime(currentDate.getHours());
    const m = this.normalizeTime(currentDate.getMinutes());
    const s = this.normalizeTime(currentDate.getSeconds());
    return `${YYYY}-${MM}-${DD} ${h}:${m}:${s}`;
  }

  getShort() {
    const currentDate = new Date();

    const h = this.normalizeTime(currentDate.getHours());
    const m = this.normalizeTime(currentDate.getMinutes());
    return `${h}:${m}`;
  }

  renderTime() {
    let content;
    switch (this.activeMode) {
      case 0:
        content = this.getFull();
        break;
      case 1:
        content = this.getShort();
        break;
      default:
        content = this.getShort();
        break;
    }
    this.container.textContent = content;
  }

  renderBackground() {
    this.container.style.backgroundColor = this.getRandomColor();
  }

  setTime() {
    setInterval(() => this.renderTime(), 500);
  }

  increaseActiveMode() {
    if (this.activeMode + 1 < 2) {
      this.activeMode++;
    } else {
      this.activeMode = 0;
    }
    this.renderBackground();
  }

  attachEvents() {
    this.container.addEventListener("click", () => this.switchMode());
  }

  switchMode() {
    this.increaseActiveMode();
    this.renderTime();
  }
}
