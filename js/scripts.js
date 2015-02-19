$(function(){

  $('#styleMe input[type="text"]').blur(function(){
    if($(this).val().length > 0){
      $(this).addClass('white');
    } else {
      $(this).removeClass('white');
    }
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedStreet = $("input#new-street").val();
    var inputtedCity = $("input#new-city").val();
    var inputtedState = $("input#new-state").val();
    var inputtedZip = $("input#new-zip").val();
    var newAddress = { street: inputtedStreet,
                       city: inputtedCity,
                       state: inputtedState,
                       zip: inputtedZip,
                       fullAddress: function() {
                        return this.street + ", " + this.city + ", " + this.state + ", " + this.zip;
                       }
                     };
    var newContact = {firstName: inputtedFirstName,
                      lastName: inputtedLastName,
                      address: newAddress.fullAddress()
                      };

    $("ul#contact-list").append("<li><i class='fa-li fa fa-home'></i><span class='contact link'>" + newContact.firstName + " " + newContact.lastName + "</span><p> Add to Favorites?  <input type='checkbox' class='favorite'></p></li>");

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-street").val("");
    $("input#new-city").val("");
    $("input#new-state").val("");
    $("input#new-zip").val("");

    var addLink = function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName + " " + newContact.lastName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $(".address").text(newContact.address);
    };

    $(".contact").last().click(addLink);

    var sortL = function($list) {
      var alphaList = $list;
      var listContacts = alphaList.children('li').get();
      listContacts.sort(function (a, b) {
        return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
      })
      $.each(listContacts, function(idx, itm) {alphaList.append(itm); });
    };


    $("ul#contact-list li").click(function() {
      $("ul#contact-list li").removeClass("highlight");
      $(this).addClass("highlight", "swing");
    });

    $("input.favorite").last().on("click", function() {
      var thisCheck = $(this);
      if (thisCheck.is(':checked')) {
        $("ul#favorite-list").append("<li class='" + newContact.firstName + "'><i class='fa-li fa fa-heart'></i><span class='favorite link'>" + newContact.firstName + "</span></li>");
        $(".favorite").last().click(addLink);
      } else {
        $("ul#favorite-list").children("li." + newContact.firstName).remove();
      }

    });
    sortL($("#contact-list"));
    sortL($("#favorite-list"));

  });

  $("#add-address").click(function() {
    $("#new-address").append('<div class="form-group" id="styleMe">' +
      '<label  class="input" >' +
        '<input type="text" id="new-street">' +
        '<span><span>Street</span></span>' +
      '</label>' +
    '</div>' +
    '<div class="form-group" id="styleMe">' +
      '<label  class="input" >' +
        '<input type="text" id="new-city">' +
        '<span><span>City</span></span>' +
      '</label>' +
    '</div>' +
    '<div class="form-group" id="styleMe">' +
      '<label  class="input" >' +
        '<input type="text" id="new-state">' +
        '<span><span>State</span></span>' +
      '</label>' +
    '</div>' +
    '<div class="form-group" id="styleMe">' +
      '<label  class="input" >' +
        '<input type="text" id="new-zip">' +
        '<span><span>Zip</span></span>' +
      '</label>' +
    '</div>')
  });
});
