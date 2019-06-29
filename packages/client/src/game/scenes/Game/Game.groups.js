export default class GameGroupManager {
  constructor(scene) {
    this.scene = scene;

    scene.groups = [];

    scene.backgroundGroup = this.addGroup();
    scene.resourceGroup = this.addGroup();
    scene.buildingGroup = this.addGroup();
    scene.platformGroup = this.addGroup();
    scene.playerGroup = this.addGroup();
    scene.itemGroup = this.addGroup();
    scene.hudGroup = this.addGroup();
  }

  addGroup(config) {
    const group = this.scene.add.group(config);
    this.scene.groups.push(group);
    return group;
  }

  update() {
    this.setDepths();
  }

  setDepths() {
    this.scene.groups.forEach((group, i) => {
      group.setDepth(i);
    });
  }
}
