class TimerComponent {
    constructor() {
        this.accumulatedTime = 0;
        this.started = false;
        this.ended = false;
        this.repeating = false;
        this.tasks = [];
        this.taskTimeOffset = 0;
        this.taskIndex = 0;
    }

    update(deltaInMilliseconds) {
        if(this.started && !this.ended) {
            this.accumulatedTime+=deltaInMilliseconds;
            if(this.accumulatedTime>this.tasks[this.taskIndex].time) {
                this.tasks[this.taskIndex].callback();
                this.taskIndex++;
                if(this.taskIndex===this.tasks.length) {
                    if(this.repeating) {
                        this.taskIndex = 0;
                        this.accumulatedTime-=this.taskTimeOffset;
                    }
                    else {
                        this.ended = true;
                    }
                }
            }
        }
    }

    addTask(timeInMilliseconds,callback) {
        this.tasks.push({
            time:timeInMilliseconds+this.taskTimeOffset,callback:callback
        });
        this.taskTimeOffset+=timeInMilliseconds;
    }

    start() {
        if(this.tasks.length>0 && !this.started) {
            this.started = true;
            return true;
        }
        return false;
    }

    startAndRepeat() {
        let started = this.start();
        if(started) {
            this.repeating = true;
        }
        return started;
    }

    stop() {
        if(this.started && !this.ended) {
            this.ended = true;
            return true;
        }
        return false;
    }

    
}

module.exports = TimerComponent;