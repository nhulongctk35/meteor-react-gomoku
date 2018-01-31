import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { range, map } from 'lodash';

import { PLAYERS } from './../constants.js';

const Props = {
  data: PropTypes.array.isRequired,
  size: PropTypes.number,
  onClickCell: PropTypes.func,
}

const DefaultProps = {
  size: 15,
  onClickCell: () => null,
};

class GoBoard extends Component {
  getListItem =() => {
    const { size } = this.props;

    return range(size);
  }

  // draw black and white stones
  renderGoPiece = (xAxis, yAxis) => {
    const { data } = this.props;    
    const player = data[xAxis][yAxis];

    if (player === PLAYERS.black) {
      return <span className="icon icon--black" />
    }

    if (player === PLAYERS.white) {
      return <span className="icon icon--white" />
    }

    return;
  }

  renderBoardView = () => {
    const totalItems = this.getListItem();

    const boardView =
      map(totalItems, (yAxis) => {
        return (
          <ul key={yAxis} className="u-d-flex u-list-default">
            {map(totalItems, (xAxis) => {
              return <li
                        className="u-border u-no-padding u-no-margin board__cell"
                        onClick={() => { this.props.onClickCell(xAxis, yAxis) }}
                        key={yAxis + xAxis}>{this.renderGoPiece(xAxis, yAxis)}</li>
            })}
          </ul>
        )
      });

    return boardView;
  }

  render() {
    return (
      <div className="board">
        {this.renderBoardView()}
      </div>
    )
  }
}

GoBoard.propTypes = Props;
GoBoard.defaultProps = DefaultProps;

export default GoBoard;
