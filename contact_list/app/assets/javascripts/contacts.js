$(function(){

  $("#main").append("<h1>Contacts</h1>");
  var contactForm = $("#createNewContact");
  var result = function(contact){
    $("<div>").text(contact.first_name + " " + contact.last_name).appendTo("#main");
    $("<div>").text(contact.email).appendTo("#main");
  }
  var searchResult = $("#searchContact");
  
  $.ajax({
    type: 'GET',
    url: '/contacts',
    data: { },
    success: function(contacts){
      contacts.forEach(function(contact){
        result(contact);
      
  });

  function get_contacts(contacts){
    contacts.forEach(function(contact){
        result(contact);
      });
  }

  contactForm.on("submit", function(e){
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/contacts',
      dataType: "json",
      data: contactForm.serialize(),
      success: function(contact){
        $("#main").empty();
        $.getJSON('/contacts', get_contacts);
        

      }
    });
  });



  searchResult.on("keyup", function(e){
    e.preventDefault();
    var searchparams = $('#searchContact').val();

    var data = {searchparams: searchparams}

    $.ajax({
      type: 'GET',
      url: '/contacts',
      data: data,
      contentType: 'application/json; charset=utf-8',
      success: function(contacts){
        console.log(contacts);
        $("#main").empty();
        contacts.forEach(function(contact){
          result(contact);
        });
      }
    })
  });
});