// this is a bb collection

var Backbone = require('backbone');
var ItemModel = require('./itemModel');

module.exports = Backbone.Collection.extend({
  url:"",
  model: ItemModel,

});
