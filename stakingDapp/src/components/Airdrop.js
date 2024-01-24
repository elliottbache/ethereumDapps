import React, {Component} from 'react';
import DecentralBank from '../truffle_abis/DecentralBank.json';

class Airdrop extends Component {
    // Airdrop to have a timer that counts down
    // initialize countdown after our customers have staked a certain amount.. 50
    // time functionality, countdown, startTime, state --for time to work..

    constructor() {
        super();
        this.state = {time: {}, seconds: 30};
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
    }

    startTimer() {
        if(this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }

    }

    async countDown() {
        // countdown one second at a time
        // stop counting when we hit zero
        let seconds = this.state.seconds - 1;
        
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds
        });

        if (seconds <= 0) {
            clearInterval(this.timer);
            this.props.issueSenderTokens();
        }

    }

    secondsToTime(secs) {
        let hours, seconds, minutes;
        hours = Math.floor(secs/(60*60));

        let divisor_for_minutes = secs % (60*60);
        minutes = Math.floor(divisor_for_minutes/60);

        seconds = secs - hours*3600 + minutes*60;

        let obj = {
            'h': hours,
            'm': minutes,
            's': seconds
        }

        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({time: timeLeftVar});
    }

    airdropReleaseTokens() {
        let stakingB = this.props.stakingBalance;
        if (stakingB >= '50000000000000000000') {
            this.startTimer();
        }
    }

    render() {
        this.airdropReleaseTokens();
        return (
            <div style={{color:'black'}}>
                {this.state.time.m}:{this.state.time.s}
            </div>
        )
    }
}

export default Airdrop;