import EventEmitter from "events";
import events from "../events/events";
const eventEmitter = new EventEmitter();

function cb() {
    console.log("yoo");

    eventEmitter.emit("end");
}

function cleanUp() {
    console.log("cleanUp");

    eventEmitter.removeListener(events.order.orderCreated, cb);
}

eventEmitter.on(events.order.orderCreated, cb);

eventEmitter.on("end", cleanUp);
