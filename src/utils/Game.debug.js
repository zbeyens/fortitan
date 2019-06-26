import Phaser from 'phaser';
import { gui, DEBUG } from 'config/debug.config';

export default class GameDebug {
  constructor(scene) {
    Object.assign(this, scene);

    this.pointer();
    this.cam();
  }

  pointer() {
    gui.p1 = gui.addFolder('Pointer');
    gui.p1.add(this.input, 'x').listen();
    gui.p1.add(this.input, 'y').listen();
    if (DEBUG.pointer) gui.p1.open();
  }

  cam() {
    const controlConfig = {
      camera: this.cameras.main,
      zoomIn: this.input.keyboard.addKey('Q'),
      zoomOut: this.input.keyboard.addKey('E'),
      acceleration: 0.06,
      drag: 0.0005,
      maxSpeed: 1.0,
    };

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    );

    gui.f1 = gui.addFolder('Camera');

    if (DEBUG.camPosition) this.camPosition();
    if (DEBUG.camZoom) this.camZoom();
    if (DEBUG.camRotation) this.camRotation();
    if (DEBUG.camHelp) this.camHelp();
    if (DEBUG.camera) gui.f1.open();
  }

  camPosition() {
    const cam = this.cameras.main;

    gui.f1.add(cam, 'scrollX').listen();
    gui.f1.add(cam, 'scrollY').listen();

    gui.f1.add(cam, 'displayWidth').listen();
    gui.f1.add(cam, 'displayHeight').listen();
  }

  camZoom() {
    const cam = this.cameras.main;

    gui.f1
      .add(cam, 'zoom', 0.1, 2)
      .step(0.1)
      .listen();
  }

  camRotation() {
    const cam = this.cameras.main;

    this.input.keyboard.on('keydown-Z', () => {
      cam.rotation += 0.01;
    });

    this.input.keyboard.on('keydown-X', () => {
      cam.rotation -= 0.01;
    });
    gui.f1
      .add(cam, 'rotation')
      .min(0)
      .step(0.01)
      .listen();
  }

  camHelp() {
    const help = {
      line1: 'Cursors to move',
      line2: 'Q & E to zoom',
      line3: 'Z & X to rotate',
    };
    gui.f1.add(help, 'line1');
    gui.f1.add(help, 'line2');
    gui.f1.add(help, 'line3');
  }

  update(t, dt) {
    this.controls.update(dt);

    // if (cfg.debug.cameraInfo) {
    //   this.scene.debug.cameraInfo(this.scene.camera, debugX, debugX);
    // }
    // if (cfg.debug.camera) {
    //   this.scene.debug.camera(this.scene.camera);
    // }
    // if (cfg.debug.inputInfo) {
    //   this.scene.debug.inputInfo(debugX, debugY);
    // }
    // if (cfg.debug.scale) {
    //   this.scene.debug.scale(debugX, debugY);
    // }
  }
}
