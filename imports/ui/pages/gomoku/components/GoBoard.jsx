import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { range, map } from 'lodash';

import { PLAYERS } from './../constants.js';

const Props = {
  data: PropTypes.array.isRequired,
  size: PropTypes.number,
  onClickCell: PropTypes.func,
  handleResetBoardData: PropTypes.func,
}

const DefaultProps = {
  size: 15,
  onClickCell: () => null,
  handleResetBoardData: () => null,
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
    const { handleResetBoardData } = this.props;

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="board">
            {this.renderBoardView()}
          </div>
        </div>
        <div className="col-md-3">
          <div>
            <div className="card">
              <div className="card-header u-text-center">
                Result
              </div>
              <div className="card-body">
                <div className="board__core">
                  <div className="row">
                    <div className="col-md-5 u-text-center">0</div>
                    <div className="col-md-2 u-text-center">:</div>
                    <div className="col-md-5 u-text-center">0</div>
                  </div>
                  <div className="row">
                    <div className="col-md-5 u-text-center font-weight-bold">Black</div>
                    <div className="col-md-2">{''}</div>
                    <div className="col-md-5 u-text-center font-weight-bold">White</div>
                  </div>
                </div>
                <button
                  onClick={handleResetBoardData}
                  className="btn btn-primary btn-block my-2">Reset game</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

GoBoard.propTypes = Props;
GoBoard.defaultProps = DefaultProps;

export default GoBoard;
