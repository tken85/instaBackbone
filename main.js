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
    //submitting new InstaBam
    $('form').on('submit', function(event){
      event.preventDefault();
      var pic = $('input[name="pic"]').val();
      var words = $('input[name="wordage"]').val();
      var random = Math.floor(Math.random()*6);
      var bamPic = "images/"+instaPage.bams[random];
      var newInsta = new ItemModel({pic_URL: pic, bam_URL: bamPic, text: words});
      newInsta.save();
      instaPage.itemCollection.unshift(newInsta);
      console.log(instaPage.itemCollection);
      $('input[name="pic"]').val("");
      $('input[name="wordage"]').val("");
      instaPage.loadAgain();
    });
    //updating likes
    $('section').on('click', 'button', function(event){
      event.preventDefault();
      $elId = $(this).closest('article').data('index');
      var editingOne = instaPage.itemCollection.get($elId);
      editingOne.set({likes: editingOne.get('likes')+1});
      editingOne.save();
      instaPage.loadAgain();
    });
  },
  loadInstas: function(){
    instaPage.itemCollection.fetch().then(instaPage.loadAgain);
  },
  loadAgain: function(){
    $('section').html('');
    _.each(instaPage.itemCollection.models, function(currVal,idx,arr){
      $('section').append('<article data-index="'+currVal.get('_id')+'"><div class="row bamHolder"><div class="col-md-12"><img src="'+ currVal.get('pic_URL')+'"><img src="'+ currVal.get('bam_URL')+'"  class="bam"></div></div><p>'+currVal.get('text')+'</p><button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span> Like</button><span class="likes">'+currVal.get('likes')+'</span></article>');
    });
  },
  itemCollection:"",
  bams : ["bam.png", "bam1.png", "bam2.png", "bam3.png", "bam4.png", "bam5.png"],
};
