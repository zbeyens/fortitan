import State from "iogine/world/State";

export default class PickaxeUseState extends State {
  enter() {
    this.timeElapsed = 0;
  }

  update(dt) {
    console.log("PickAXE USED!");

    this.timeElapsed += dt;

    // TODO: pickaxe use

    if (this.timeElapsed > 1000) {
      this.entity.enterUseIdleState();
    }
  }
}
