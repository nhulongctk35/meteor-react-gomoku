import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

class GomokuCollection extends Mongo.Collection {
};

export const gomokuApi = new GomokuCollection('gomoku');

Meteor.methods({
  'gomoku.update'({ data, id }) {
    gomokuApi.update(id, {$set: {
      data: data,
    }});
  }
})

export default gomokuApi;
