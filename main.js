var $ = require('jquery');
var _ = require('underscore');
var ItemModel = require('./itemModel');
var ItemCollection = require('./itemCollection');

$(document).ready(function(){
  instaPage.init();
});

var instaPage ={
  init: function(){
    instaPage.initStyling();
    instaPage.initEvents();
  },
  initStyling: function(){
    instaPage.itemCollection = new ItemCollection();
    instaPage.loadInstas();
  },
  initEvents: function(){
    $('form').on('submit', function(event){
      event.preventDefault();
      var pic = $('input[name="pic"]').val();
      var words = $('input[name="wordage"]').val();
      var newInsta = new ItemModel({pic_URL: pic, text: words});
      newInsta.save();
      instaPage.itemCollection.unshift(newInsta);
      console.log(instaPage.itemCollection);
      $('input[name="pic"]').val("");
      $('input[name="wordage"]').val("");
      instaPage.loadAgain();
    });
    $('section').on('click', 'button', function(event){
      event.preventDefault();
      console.log("clicked");
    });
  },
  loadInstas: function(){
    instaPage.itemCollection.fetch().then(function(){
      $('section').html('');
     _.each(instaPage.itemCollection.models, function(currVal, idx, arr){
        $('section').append('<article data-index="'+currVal.get('_id')+'"><img src="'+ currVal.get('pic_URL')+'"><p>'+currVal.get('text')+'</p><button type="button" class="btn btn-primary">Like</button>'+currVal.get('likes')+'</article>');
        console.log(currVal);
      });
       console.log(instaPage.itemCollection);
    });
  },
  loadAgain: function(){
    $('section').html('');
    _.each(instaPage.itemCollection.models, function(currVal,idx,arr){
      $('section').append('<article data-index="'+currVal.get('_id')+'"><img src="'+ currVal.get('pic_URL')+'"><p>'+currVal.get('text')+'</p><button type="button" class="btn btn-primary">Like</button>'+currVal.get('likes')+'</article>');
    });
  },
  itemCollection:"",
};
