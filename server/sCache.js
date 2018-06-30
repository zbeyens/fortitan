/* 
  * Setting up block level variable to store class state
  * , set's to null by default.
*/
let instance = null;

class Cache {
	constructor() {
		if (!instance) {
			instance = this;
		}

		return instance;
	}
}

module.exports = Cache;