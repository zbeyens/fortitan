import Canvas from 'canvas';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

const { document } = dom.window;
const { window } = dom;

global.document = document;
global.window = window;
global.Image = Canvas.Image;
global.window.Element = undefined;
global.navigator = { userAgent: 'node' };
global.XMLHttpRequest = () => {};
global.HTMLCanvasElement = window.HTMLCanvasElement;
window.focus = () => {};

const animationFrame = cb => {
  if (typeof cb !== 'function') return 0; // this line saves a lot of cpu
  window.setTimeout(() => cb(0), 1000 / 60);
  return 0;
};

window.requestAnimationFrame = cb => {
  return animationFrame(cb);
};
