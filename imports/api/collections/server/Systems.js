import {Mongo} from 'meteor/mongo';

const Systems = new Mongo.Collection('Systems');
Systems.aggregate = Systems.rawCollection().aggregate.bind(Systems.rawCollection()); // define an aggregate method; https://forums.meteor.com/t/meteor-aggregate-not-showing-correct-results/48153/9

export default Systems;
