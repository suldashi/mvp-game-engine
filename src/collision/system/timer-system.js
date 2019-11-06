const TimerComponent = require("../component/timer-component");

class TimerSystem {
    constructor() {
        this.timers = [];
    }

    createTimerComponent() {
        let timer = new TimerComponent();
        this.timers.push(timer);
        return timer;
    }

    update(deltaInMilliseconds) {
        for(var i in this.timers) {
            this.timers[i].update(deltaInMilliseconds);
        }
    }
}

module.exports = TimerSystem;