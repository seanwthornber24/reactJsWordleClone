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
      letterStates: [[{backgroundColor: "black", transition: "1s", border: "4px solid #565656"}, {backgroundColor: "black", transition: "1s", border: "4px solid #565656"}, {backgroundColor: "black", transition: "1s", border: "4px solid #565656"}, {backgroundColor: "black", transition: "1s", border: "4px solid #565656"}, {backgroundColor: "black", transition: "1s", border: "4px solid #565656"}],
                      [{backgroundColor: "black", transition: "1s", border: "4px solid #565656"}, {backgroundColor: "black", transition: "1s", border: "4px solid #565656"}, {backgroundColor: "black", transition: "1s", border: "4px solid #565656"}, {backgroundColor: "black", transition: "1s", border: "4px solid #565656"}, {backgroundColor: "black", transition: "1s", border: "4px solid #565656"}]
                    ]
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.animateLetterInput = this.animateLetterInput.bind(this);
    this.handleWordEnter = this.handleWordEnter.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
    // console.log(e.key);
    let thisRow = "row" + this.state.currentRow;
    let updateObj = {};
    if (e.key.match(/^[A-Za-z]$/) && this.state[thisRow].length < 5) {
      updateObj[thisRow] = this.state[thisRow] + e.key.toUpperCase()
      this.setState(updateObj);
      this.animateLetterInput(false);
    }
    else if (e.key === "Backspace") {
      this.animateLetterInput(true);
      updateObj[thisRow] = this.state[thisRow].slice(0, -1);
      this.setState(updateObj);
    }
    else if (e.key === "Enter" && this.state[thisRow].length === 5) {
      this.handleWordEnter();
      this.setState({
        currentRow: this.state.currentRow + 1
      });
    }
  }

  animateLetterInput(isBackspace) {
    let thisRow = "row" + this.state.currentRow;
    let x = this.state.letterStates;
    // console.log(x[this.state.currentRow - 1][this.state[thisRow].length - 1]);
    if (!isBackspace) {
      x[this.state.currentRow - 1][this.state[thisRow].length - 1] = {transition: "0.2s", transform: "scale(1.07)", border: "4px solid #565656"};
    }
    else {
      x[this.state.currentRow - 1][this.state[thisRow].length - 1] = {transition: "0.5s", transform: "scale(1)", border: "4px solid #565656"};
    }
    this.setState({
      letterStates: x
    })
  }

  handleWordEnter() {
    let thisRow = "row" + this.state.currentRow;
    console.log(this.state[thisRow]);
    let x = this.state.letterStates;
    for (let i = 0; i < 5; i++) {
      if (this.state[thisRow][i] == this.state.answer[i]) {
        x[this.state.currentRow - 1][i] = {transition: "0.5s", transform: "scale(1.07)", border: "4px solid #1a5408", backgroundColor: "#236e0c"};
        this.setState({
          letterStates: x
        })
      }
      else if (this.state.answer.includes(this.state[thisRow][i])) {
        x[this.state.currentRow - 1][i] = {transition: "0.5s", transform: "scale(1.07)", border: "4px solid #ba980d", backgroundColor: "#deb510"};
        this.setState({
          letterStates: x
        })
      }
      else {
        x[this.state.currentRow - 1][i] = {transition: "0.5s", transform: "scale(1.07)", border: "4px solid #565656", backgroundColor: "#262626"};
        this.setState({
          letterStates: x
        })
      }
    }
  }

  render() {

    return (
      <div id="main-container">
        
        <div id="title">
          <h1>Wordle</h1>
        </div>
        
        <div className="row">
          <div className="letter-box" style={this.state.letterStates[0][0]}>{this.state.row1[0]}</div>
          <div className="letter-box" style={this.state.letterStates[0][1]}>{this.state.row1[1]}</div>
          <div className="letter-box" style={this.state.letterStates[0][2]}>{this.state.row1[2]}</div>
          <div className="letter-box" style={this.state.letterStates[0][3]}>{this.state.row1[3]}</div>
          <div className="letter-box" style={this.state.letterStates[0][4]}>{this.state.row1[4]}</div>
        </div>

        <div className="row">
          <div className="letter-box" style={this.state.letterStates[1][0]}>{this.state.row2[0]}</div>
          <div className="letter-box" style={this.state.letterStates[1][1]}>{this.state.row2[1]}</div>
          <div className="letter-box" style={this.state.letterStates[1][2]}>{this.state.row2[2]}</div>
          <div className="letter-box" style={this.state.letterStates[1][3]}>{this.state.row2[3]}</div>
          <div className="letter-box" style={this.state.letterStates[1][4]}>{this.state.row2[4]}</div>
        </div>

      </div>
      
    );
  }
}

export default App;
