import React, { Component } from 'react';
import { times, clone, reduce, some } from 'lodash';
import { Meteor } from 'meteor/meteor';

// using react-meteor-data to create a "data container"
// to feed Meteor's reactive data into React's component hierarchy
import { withTracker } from 'meteor/react-meteor-data';

import gomokuApi from './../../../api/gomoku/index.js';

import { GoBoard, ScoreBoard } from './components/index.jsx';
import { SIZE, PLAYERS } from './constants.js';

function fakeBoardData() {
  const boardData = times(SIZE, (y) => {
    return times(SIZE, (x) => 'x');
  });

  return boardData;
}

class BoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: SIZE,
      currentPlayer: PLAYERS.black, 
    };
  }

  componentWillReceiveProps(nextProps) {
    const gomoku = nextProps.gomoku[0];

    // should update board data when gomoku data !== board data
    this.setState({
      boardData: gomoku.data,
      id: gomoku._id,
    })
  }

  checkCell = (xAxis, yAxis) => {
    const { boardData } = this.state;
    const isSelectedCell = boardData[xAxis][yAxis];

    // the cell value is 'x' => not used yet
    if (isSelectedCell === 'x') {
      return false;
    }

    // the cell is existing value
    return true;
  }

  getNextPlayer = () => {
    const { black, white } = PLAYERS;

    return this.state.currentPlayer === black ? white : black; 
  }

  countRepeat = (stringValue) => {
    const regexBlackStone = /(b){5}/;
    const regexWhiteStone = /(w){5}/;

    return regexBlackStone.test(stringValue) || regexWhiteStone.test(stringValue);
  }

  test = (boardData) => {
    const rows = times(SIZE, (x) => {
      return boardData[x, x].join('');
    });

    const result = times(SIZE, (index) => {
      const rowValue = rows[index];
      const isWinner = this.countRepeat(rowValue);
      
      if(isWinner) {
        return true;
      }

      return false;
    });

    return some(result);
  } 

  checkVertical = () => {
    const verticalBoard = this.state.boardData;
    return this.test(verticalBoard);
  }

  checkHorizontal = () => {
    const horizontalBoard = this.transposeArray(this.state.boardData);
    return this.test(horizontalBoard);
  }

  checkWinner = (winner) => {
    if (this.checkHorizontal() || this.checkVertical()) {
      const winnerName = winner === 'b' ? 'Black' : 'White';
      alert(`The winner is ${winnerName}`);
      return true;
    }

    return false;
  }

  transposeArray = (arrayData) => {
    // calculate the width and height of the Array
    const width = arrayData.length || 0;
    const height = arrayData[0] instanceof Array ? arrayData[0].length : 0;
  
    // in case it is a zero matrix, no transpose routine needed.
    if(height === 0 || width === 0) {
      return [];
    }
  
    let transposedArray = [];

    for(let i = 0; i < height; i++) {
      transposedArray[i] = [];
  
      for(let j = 0; j < width; j++) {
        transposedArray[i][j] = arrayData[j][i];
      }
    }
  
    return transposedArray;
  }

  saveBoardDataToDB = (boardData) => {
    // save data to database
    const gomokuData = {
      id: this.state.id,
      data: boardData,
    };

    Meteor.call('gomoku.update', gomokuData);
  }

  handleSaveWinner = (winner) => {
    const currnetScore = this.props.gomoku[0].score;
    const score = {
      black: winner === 'b' ? currnetScore.black + 1 : currnetScore.black,
      white: winner === 'w' ? currnetScore.white + 1 : currnetScore.white,
    };

    Meteor.call('gomoku.update', { id: this.state.id, winner, score });
  }

  handleResetBoardData = () => {
    Meteor.call('gomoku.reset', { id: this.state.id });
  }
  
  handleSelectCell = (xAxis, yAxis) => {
    const isSelectedCell = this.checkCell(xAxis, yAxis);
    
    if (!isSelectedCell) {
      const { boardData, currentPlayer } = this.state;
      
      // update board data
      let cloneBoardData = clone(boardData);
      cloneBoardData[xAxis][yAxis] = currentPlayer;

      // update player
      const nextPlayer = this.getNextPlayer();

      this.setState({
          boardData: cloneBoardData,
          currentPlayer: nextPlayer,
        },
        () => {
          if (this.checkWinner(currentPlayer)) {
            this.handleSaveWinner(currentPlayer);
          }
          this.saveBoardDataToDB(this.state.boardData);
        }
      );
    }
  }

  render() {
    const { size, boardData } = this.state;

    if (!boardData || boardData.length < 1) {
      return <span>loading...</span>
    }

    return (
      <div className="u-d-flex">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <GoBoard
              size={size}
              onClickCell={this.handleSelectCell}
              data={boardData}
              />
          </div>
          <div className="col-md-3">
            <ScoreBoard
              score={this.props.gomoku[0].score}
              handleResetBoardData={this.handleResetBoardData}
            />
          </div>
        </div>
     </div>
    );
  }
}

const mapStateToProps = () => {
  const gomokuData = gomokuApi.find({}).fetch();
  
  return {
    gomoku: gomokuData,
  };
}

export default withTracker(mapStateToProps)(BoardContainer);
