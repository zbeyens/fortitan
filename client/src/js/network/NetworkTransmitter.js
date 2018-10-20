


export default class NetworkTransmitter {

	constructor(serializer) {
        this.serializer = serializer;
    }

    serializePayload() {
        // if (this.networkedEventCollection.events.length === 0)
        //     return null;

        // let dataBuffer = this.networkedEventCollection.serialize(this.serializer);

        // return dataBuffer;
    }

    deserializePayload(payload) {
        // return this.serializer.deserialize(payload.dataBuffer).obj;
    }


}