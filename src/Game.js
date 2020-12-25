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
  
updateValue = async ([x,y]) =>{
  if(this.state.currentPlayer==2){return}
  if(this.state.arr[x][y]!=2){return}
  if(this.state.winner != 'None'){return}

  let tempArr = this.state.arr
  tempArr[x][y] = this.state.currentPlayer;
  await this.setState({arr:tempArr , currentPlayer:this.state.currentPlayer==0 ? 1 :0})
  let winner =  this.checkForWinner(tempArr)
        if(winner == 1){
        this.setState({winner:'X'})
        }
        if(winner == 0){
        this.setState({winner:'O'})
        }
        
  if(this.state.currentPlayer==0){
  this.computerMove(tempArr)
  }
}

reset = () =>{
  let tempArr = [[2,2,2],[2,2,2],[2,2,2]]
  this.setState({arr:tempArr , currentPlayer:1 , winner:"None"})
}

checkForWinner =(arr)=>{
  let x = false;
  let o = false;
  for(let i = 0 ; i <= 2 ; i++){
    let xx = true;
    let oo = true;
    for(let j = 0 ; j <= 2 ; j++){
      if(arr[i][j]!=0 ) oo=false;
      if(arr[i][j]!=1 ) xx=false;
     }
    if(xx){return 1}
    if(oo){return 0}
  }
  for(let i = 0 ; i <= 2 ; i++){
    let xx = true;
    let oo = true;
    for(let j = 0 ; j <= 2 ; j++){
     
      if(arr[j][i]!=0 ) oo=false;
      if(arr[j][i]!=1 ) xx=false;
     }
    if(xx){return 1}
    if(oo){return 0}
  }
  
   let xx = true;
    let oo = true;
    for(let j = 0 ; j <= 2 ; j++){
     
      if(arr[j][j]!=0 ) oo=false;
      if(arr[j][j]!=1 ) xx=false;
     }
    if(xx){return 1}
    if(oo){return 0}
  
    xx = true;
    oo = true;

   for(let j = 0 ; j <= 2 ; j++){
     
      if(arr[j][2-j]!=0 ) oo=false;
      if(arr[j][2-j]!=1 ) xx=false;
     }
    if(xx){return 1}
    if(oo){return 0}
    return -1
}



  computerMove = (arr)=>{
        let currentPlayer = this.state.currentPlayer
    let allPossibleOutcomesResult = [[-2,-2,-2],[-2,-2,-2],[-2,-2,-2]]
    for(let row = 0 ; row < 3 ; row++){
      for (let column = 0 ; column < 3 ; column++){
        if(arr[row][column]==2){
          let nextArr = [[...arr[0]],[...arr[1]],[...arr[2]]];
          nextArr[row][column] = currentPlayer ? 0:1;
          let checkForWinner = this.checkForWinner(nextArr)
          if(checkForWinner==0){
            allPossibleOutcomesResult[row][column] = 1
          }
          else if(checkForWinner==1){
            allPossibleOutcomesResult[row][column] = 0
          }
          else {
            allPossibleOutcomesResult[row][column] = -1;
          }
        }
      }
    }
    let maxIndex = {row:0,column:0}

    for(let row = 0 ; row < 3 ; row++){
      for (let column = 0 ; column < 3 ; column++){
          if(allPossibleOutcomesResult[row][column]>allPossibleOutcomesResult[maxIndex.row][maxIndex.column]){
            maxIndex.row = row;
            maxIndex.column = column;
          }
        }}
        if(arr[maxIndex.row][maxIndex.column]== 2){
        arr[maxIndex.row][maxIndex.column] = currentPlayer ? 1:0;
        this.setState({arr:arr, currentPlayer:currentPlayer==0 ? 1 :0})
      }

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
