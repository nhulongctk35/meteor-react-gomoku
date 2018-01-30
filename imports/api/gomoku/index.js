import { Mongo } from 'meteor/mongo';

class GomokuCollection extends Mongo.Collection {

};

const gomokuApi = new GomokuCollection('gomoku');
export default gomokuApi;
