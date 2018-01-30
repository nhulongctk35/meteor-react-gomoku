import { Meteor } from 'meteor/meteor';
import { times } from 'lodash';

import gomokuApi from './../../api/gomoku/index.js';

const SIZE = 19;

function fakeBoardData() {
  const boardData = times(SIZE, (y) => {
    return times(SIZE, (x) => 'x');
  });

  return boardData;
}

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (gomokuApi.find().count() === 0) {
    gomokuApi.insert({
      id: 'gomoku',
      data: fakeBoardData(),
    });
  }
});

