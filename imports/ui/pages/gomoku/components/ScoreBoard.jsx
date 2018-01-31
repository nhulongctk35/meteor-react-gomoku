import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { PLAYERS } from './../constants.js';

const Props = {
  score: PropTypes.object.isRequired,
  handleResetBoardData: PropTypes.func,
}

const DefaultProps = {
  handleResetBoardData: () => null,
};

class ScoreBoard extends PureComponent {
  render() {
    const { handleResetBoardData, score } = this.props;

    return (
      <div className="card">
        <div className="card-header u-text-center">
          Result
        </div>
        <div className="card-body">
          <div className="board__core">
            <div className="row">
              <div className="col-md-5 u-text-center">{score.black}</div>
              <div className="col-md-2 u-text-center">:</div>
              <div className="col-md-5 u-text-center">{score.white}</div>
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
    )
  }
}

ScoreBoard.propTypes = Props;
ScoreBoard.defaultProps = DefaultProps;

export default ScoreBoard;
