import React, { Component } from 'react';
import { times, clone, reduce, some } from 'lodash';

// using react-meteor-data to create a "data container"
// to feed Meteor's reactive data into React's component hierarchy
import { withTracker } from 'meteor/react-meteor-data';

import gomokuApi from './../../../api/gomoku/index.js';

import {
  GoBoard
} from './components/index.jsx';
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
      boardData: fakeBoardData(),
      size: SIZE,
      currentPlayer: PLAYERS.black, 
    };
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
    const horizontalBoard = this.transpose(this.state.boardData);
    return this.test(horizontalBoard);
  }

  checkWinner = (winner) => {
    if (this.checkHorizontal() || this.checkVertical()) {
      const winnerName = winner === 'b' ? 'Black' : 'White';
      alert(`The winner is ${winnerName}`);
    }
  }

  transpose = (arrayData) => {

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
          console.table(this.state.boardData);
          this.checkWinner(currentPlayer);
        }
      );
    }
  }

  render() {
    const { size } = this.state;
    console.group('longntran');
    console.table(this.props.gomoku);
    console.groupEnd();

    return (
      <div className="u-d-flex">
        <GoBoard
          size={size}
          onClickCell={this.handleSelectCell}
          data={this.state.boardData}
        />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {
    gomoku: gomokuApi.find({}).fetch(),
  };
}

export default withTracker(mapStateToProps)(BoardContainer);
