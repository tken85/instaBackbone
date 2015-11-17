var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: "http://tiny-tiny.herokuapp.com/collections/instaTerryBam",
  idAttribute: '_id',
  defaults:{
    pic_URL:"https://farm4.staticflickr.com/3539/3335570914_28078cf456.jpg",
    bam_URL:"images/bam.png",
    text: "whoa that's awesome!",
    likes: 0,
  },
  initialize: function(){

  }
});
