$(function(){
  var searchForm = $(".search-pic");
  var result = $("#results");
  searchForm.on("submit", function(e){
    e.preventDefault();
    result.empty();
    var tag = $("#search-input").val();
     $.ajax({
      url: "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=06374548f2544663ad5249df02a3b99d",
      //url: "https://api.instagram.com/v1/users/" + user + "/media/recent/?client_id=4eeb2b774ed47239161a29ee6a4eb4a",
      //url: "https://api.instagram.com/v1/users/search?q=" + user + "&client_id=4eeb2b774ed47239161a29ee6a4eb4a",
      

      dataType: "jsonp",
      success: function(object){
        console.log(object);
        object.data.forEach(function(pic){
          var image = pic.images.thumbnail.url;
          var caption = pic.caption.text;
          $("#results").append("<img src='" + image + "' />"); 
        })
      }
     })
  });
});

// var photos = [ "image_1.jpg",
//                 "image_2.jpg",
//                 "image_3.jpg" ] 

// index = 0;
// $('#button').on("click", function(){
//   photos[index]
// });