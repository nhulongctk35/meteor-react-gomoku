import { Meteor } from 'meteor/meteor';

import gomokuApi from './../../api/gomoku/index.js';
import { fakeBoardData } from './../../api/utils/index.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (gomokuApi.find().count() === 0) {
    gomokuApi.insert({
      data: fakeBoardData(),
      score: {
        black: 0,
        white: 0,
      },
      winner: null,
    });
  }
});

