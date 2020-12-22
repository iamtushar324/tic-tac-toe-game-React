import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#bbb',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white',
  'cursor':'pointer',
  'border-radius':'10px',
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

class Square extends React.Component {
  
  render() {
    const x = this.props.pos[0]
    const y = this.props.pos[1]
    return (
      <div
        className="square"
        style={squareStyle} onClick={()=>{this.props.updateValue(this.props.pos)}} >
        {this.props.arr[x][y]==1 &&"X"}
        {this.props.arr[x][y]==0 && "O"}
      </div>
    );
  }
}

class Board extends React.Component {
  
updateValue = ([x,y]) =>{
  if(this.state.currentPlayer==2){return}
  if(this.state.arr[x][y]!=2){return}
  if(this.state.winner != 'None'){return}

  let tempArr = this.state.arr
  tempArr[x][y] = this.state.currentPlayer;
this.setState({arr:tempArr , currentPlayer:this.state.currentPlayer==0 ? 1 :0})
this.checkForWinner()
}

reset = () =>{
  let tempArr = [[2,2,2],[2,2,2],[2,2,2]]
  this.setState({arr:tempArr , currentPlayer:1 , winner:"None"})
}

checkForWinner =()=>{
  let x = false;
  let o = false;
  let arr = this.state.arr

  for(let i = 0 ; i <= 2 ; i++){
    let xx = true;
    let oo = true;
    for(let j = 0 ; j <= 2 ; j++){
      if(arr[i][j]!=0 ) oo=false;
      if(arr[i][j]!=1 ) xx=false;
     }
    if(xx){this.setState({winner:"X"}); return }
    if(oo){this.setState({winner:"O"}); return }
  }
  for(let i = 0 ; i <= 2 ; i++){
    let xx = true;
    let oo = true;
    for(let j = 0 ; j <= 2 ; j++){
     
      if(arr[j][i]!=0 ) oo=false;
      if(arr[j][i]!=1 ) xx=false;
     }
    if(xx){this.setState({winner:"X"}); return }
    if(oo){this.setState({winner:"O"}); return }
  }
  
   let xx = true;
    let oo = true;
    for(let j = 0 ; j <= 2 ; j++){
     
      if(arr[j][j]!=0 ) oo=false;
      if(arr[j][j]!=1 ) xx=false;
     }
    if(xx){this.setState({winner:"X"}); return }
    if(oo){this.setState({winner:"O"}); return }
  
    xx = true;
    oo = true;

   for(let j = 0 ; j <= 2 ; j++){
     
      if(arr[j][2-j]!=0 ) oo=false;
      if(arr[j][2-j]!=1 ) xx=false;
     }
    if(xx){this.setState({winner:"X"}); return }
    if(oo){this.setState({winner:"O"}); return }






}

  constructor(props){
    super(props)
    this.state = {
      currentPlayer:1,
      arr:[[2,2,2],[2,2,2],[2,2,2]],
      winner:"None"
    }
  }
  
  render() {
    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>Next player: {this.state.currentPlayer==0?"O":"X"}</div>
        <div className="winner" style={instructionsStyle}>Winner: {this.state.winner}</div>
        <button style={buttonStyle} onClick={this.reset}>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square arr={this.state.arr} currentPlayer={this.state.currentPlayer} updateValue={this.updateValue} pos={[0,0]} />
            <Square arr={this.state.arr} currentPlayer={this.state.currentPlayer} updateValue={this.updateValue} pos={[0,1]} />
            <Square arr={this.state.arr} currentPlayer={this.state.currentPlayer} updateValue={this.updateValue} pos={[0,2]} />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square arr={this.state.arr} currentPlayer={this.state.currentPlayer}  updateValue={this.updateValue} pos={[1,0]} />
            <Square arr={this.state.arr} currentPlayer={this.state.currentPlayer}  updateValue={this.updateValue} pos={[1,1]} />
            <Square arr={this.state.arr} currentPlayer={this.state.currentPlayer}  updateValue={this.updateValue} pos={[1,2]}/>
          </div>
          <div className="board-row" style={rowStyle}>
            <Square arr={this.state.arr} currentPlayer={this.state.currentPlayer}  updateValue={this.updateValue} pos={[2,0]} />
            <Square arr={this.state.arr} currentPlayer={this.state.currentPlayer}  updateValue={this.updateValue} pos={[2,1]}/>
            <Square arr={this.state.arr} currentPlayer={this.state.currentPlayer}  updateValue={this.updateValue} pos={[2,2]}/>
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Game
