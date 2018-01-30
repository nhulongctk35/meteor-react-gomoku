import React, { Component } from 'react';
import { times, clone, reduce, some } from 'lodash';

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
      currentPlayer: PLAYERS.A, 
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
    const { A, B } = PLAYERS;

    return this.state.currentPlayer === A ? B : A; 
  }

  countRepeat = (stringValue) => {
    const regexBlackStone = /(A){5}/;
    const regexWhiteStone = /(B){5}/;

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

  checkWinner = () => {
    if (this.checkHorizontal() || this.checkVertical()) {
      alert(this.state.currentPlayer);
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
          this.checkWinner();
        }
      );
    }
  }

  render() {
    const { size } = this.state;

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

export default BoardContainer;
