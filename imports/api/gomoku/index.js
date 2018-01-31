import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { fakeBoardData } from './../utils/index.js';

class GomokuCollection extends Mongo.Collection {
};

export const gomokuApi = new GomokuCollection('gomoku');

// We should split these methods into another files (gomoku-methods.js)
Meteor.methods({
  'gomoku.reset'({ id }) {
    gomokuApi.update(id, {$set: {
      data: fakeBoardData(),
      winner: null,
      score: {
        black: 0,
        white: 0,
      },
    }});
  },
  'gomoku.update'({ id, data, score, winner }) {
    if (id) {
      const currentData = gomokuApi.findOne(id); 

      gomokuApi.update(id, {$set: {
        data: data ? data : currentData.data,
        winner: winner ? winner : currentData.winner,
        score: score ? score : currentData.score,
      }
    })
    }
  }
})

export default gomokuApi;
