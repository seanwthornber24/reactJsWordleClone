import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      answer: "ALIEN",
      row1: "",
      row2: "",
      row3: "",
      row4: "",
      row5: "",
      row6: "",
      currentRow: 1,
      letterStates: [{backgroundColor: "grey", transition: "1s"}]
    };

    this.testFunc = this.testFunc.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.testFunc);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.testFunc);
  }

  testFunc(e) {
    console.log(e.key);
    let thisRow = "row" + this.state.currentRow;
    let updateObj = {};
    // let x = this.state.letterStates;
    // x[0] = {backgroundColor: "green", transition: "1s"};
    // this.setState({
    //   letterStates: x
    // })
    if (e.key.match(/^[A-Za-z]$/) && this.state[thisRow].length < 5) {
      updateObj[thisRow] = this.state[thisRow] + e.key.toUpperCase()
      this.setState(updateObj);
    }
    else if (e.key === "Backspace") {
      updateObj[thisRow] = this.state[thisRow].slice(0, -1);
      this.setState(updateObj);
    }
    else if (e.key === "Enter" && this.state[thisRow].length === 5) {
      this.setState({
        currentRow: this.state.currentRow + 1
      });
    }
  }

  render() {

    return (
      <div id="main-container">
        
        <div id="title">
          <h1>Wordle</h1>
        </div>
        
        <div className="row">
          <div className="letter-box" style={this.state.letterStates[0]}>{this.state.row1[0]}</div>
          <div className="letter-box">{this.state.row1[1]}</div>
          <div className="letter-box">{this.state.row1[2]}</div>
          <div className="letter-box">{this.state.row1[3]}</div>
          <div className="letter-box">{this.state.row1[4]}</div>
        </div>

        <div className="row">
          <div className="letter-box">{this.state.row2[0]}</div>
          <div className="letter-box">{this.state.row2[1]}</div>
          <div className="letter-box">{this.state.row2[2]}</div>
          <div className="letter-box">{this.state.row2[3]}</div>
          <div className="letter-box">{this.state.row2[4]}</div>
        </div>

      </div>
      
    );
  }
}

export default App;
