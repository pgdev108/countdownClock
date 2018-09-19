import React from "react";
import "./clock.css";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      hourInput: "00",
      minInput: "05",
      secInput: "00",
      hour: "00",
      minutes: "05",
      seconds: "00",
      format: "hrminsec"
    };

    this.timer = 0;
  }

  chanegHour(event) {
    this.setState({ hourInput: event.target.value });
  }

  chanegMinutes(event) {
    this.setState({ minInput: event.target.value });
  }

  chanegSecond(event) {
    this.setState({ secInput: event.target.value });
  }

  startTimer() {
    let remainingHours = 0,
      remainingMinutes = 0,
      remainingSeconds = 0;
    let countDownHourInSec = parseInt(this.state.hour) * 60 * 60;
    let countDownMinutesInSec = parseInt(this.state.minutes) * 60;
    let countDownSeconds = parseInt(this.state.seconds);
    let countDownTimer =
      countDownHourInSec + countDownMinutesInSec + countDownSeconds;
    let targetTime = new Date().getTime() + 1000 * countDownTimer;
    console.log("targetTime ", targetTime);
    let that = this;
    let timer = setInterval(function() {
      let now = new Date().getTime();
      let remainingTime = targetTime - now;

      if (remainingTime < 0) {
        clearInterval(timer);
      }

      remainingHours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      remainingMinutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      that.setState({
        hour: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds
      });
    }, 1000);

    this.timer = timer;
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  setTime() {
    clearInterval(this.timer);
    this.setState({
      hour: this.state.hourInput,
      minutes: this.state.minInput,
      seconds: this.state.secInput
    });
  }

  changeTimerFormat(event) {
    this.setState({ format: event.target.value });
  }

  resetTimer() {
    clearInterval(this.timer);
    this.setState({
      hour: "00",
      minutes: "05",
      seconds: "00"
    });
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <div className="timerInputFieldRow">
          <div className="timeInputFieldSection">
            <input
              type="text"
              className="timeInputField"
              id="hourField"
              onChange={e => this.chanegHour(e)}
              value={this.state.hourInput}
            />
            <div className="timeLabel">Hour</div>
          </div>
          <div className="timeInputFieldSection">
            <input
              className="timeInputField"
              id="hourField"
              onChange={e => this.chanegMinutes(e)}
              value={this.state.minInput}
            />
            <div className="timeLabel">Minutes</div>
          </div>
          <div className="timeInputFieldSection">
            <input
              className="timeInputField"
              id="hourField"
              onChange={e => this.chanegSecond(e)}
              value={this.state.secInput}
            />
            <div className="timeLabel">Seconds</div>
          </div>
        </div>
        <div className="timerFormatSection">
          <select onChange={e => this.changeTimerFormat(e)}>
            <option value="hrminsec">Select Timer Format</option>
            <option value="hrminsec">hr:min:sec (Default)</option>
            <option value="secminhr">sec:min:hr</option>
          </select>
        </div>
        <div className="setTimeButtonSection">
          <button onClick={() => this.setTime()}>Set Time</button>
        </div>
        <div className="timerDisplaySection">
          {this.state.format === "hrminsec" && (
            <div>
              <div className="timerValueSection">
                <span className="timerVaue">{this.state.hour} </span>
                <span className="timerLabelDisplay"> hr </span>
              </div>
              <div className="timerValueSection">
                <span className="timerVaue">{this.state.minutes} </span>
                <span className="timerLabelDisplay"> min </span>
              </div>
              <div className="timerValueSection">
                <span className="timerVaue">{this.state.seconds} </span>
                <span className="timerLabelDisplay"> sec </span>
              </div>
            </div>
          )}
          {!(this.state.format === "hrminsec") && (
            <div>
              <div className="timerValueSection">
                <span className="timerVaue">{this.state.seconds} </span>
                <span className="timerLabelDisplay"> sec </span>
              </div>
              <div className="timerValueSection">
                <span className="timerVaue">{this.state.minutes} </span>
                <span className="timerLabelDisplay"> min </span>
              </div>
              <div className="timerValueSection">
                <span className="timerVaue">{this.state.hour} </span>
                <span className="timerLabelDisplay"> hr </span>
              </div>
            </div>
          )}
          <div>
            <button onClick={() => this.startTimer()}>Start</button>
            <button onClick={() => this.stopTimer()}>Stop</button>
            <button onClick={() => this.resetTimer()}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Clock;
