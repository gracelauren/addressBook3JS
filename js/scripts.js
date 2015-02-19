var setupInputLabels = function () {
  $('.styleMe [type="text"]').blur(function(){
    if($(this).val().length > 0){
      $(this).next().children().css('color', "transparent");
    } else {
      $(this).next().children().css('color', "#000");
    }
  });
};

$(function(){

  setupInputLabels();

  $("#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("#new-first-name").val();
    var inputtedLastName = $("#new-last-name").val();

    var newContact = {firstName: inputtedFirstName,
                      lastName: inputtedLastName,
                      addresses: []
                      };

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find(".new-street").val();
      var inputtedCity = $(this).find(".new-city").val();
      var inputtedState = $(this).find(".new-state").val();
      var inputtedZip = $(this).find(".new-zip").val();
      var newAddress = { street: inputtedStreet,
                         city: inputtedCity,
                         state: inputtedState,
                         zip: inputtedZip };
     newContact.addresses.push(newAddress);
    });



    $("#contact-list").append("<li><i class='fa-li fa fa-home'></i><span class='contact link'>" +
    newContact.firstName + " " + newContact.lastName +
    "</span><p> Add to Favorites?  <input type='checkbox' class='favorite'></p></li>");

    var addLink = function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName + " " + newContact.lastName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $("#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("#addresses").append("<li>" + address.street + ", " + address.city +
        ", " + address.state + " " + address.zip + "</li>");
      });
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


    $("#contact-list li").click(function() {
      $("#contact-list li").removeClass("highlight");
      $(this).addClass("highlight", "swing");
    });

    $(".favorite").last().on("click", function() {
      var thisCheck = $(this);
      if (thisCheck.is(':checked')) {
        $("#favorite-list").append("<li class='" + newContact.firstName + "'><i class='fa-li fa fa-heart'></i><span class='favorite link'>" + newContact.firstName + "</span></li>");
        $(".favorite").last().click(addLink);
      } else {
        $("#favorite-list").children("li." + newContact.firstName).remove();
      }

    });
    sortL($("#contact-list"));
    sortL($("#favorite-list"));

    $(".sample-docs").turn("next");

    $("#new-contact")[0].reset();
    $('.styleMe [type="text"]').next().children().css('color', "#000");

  });

  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
        '<div class="form-group styleMe" style="border-top: 1px dashed black;">' +
        '<label class="input">' +
          '<input type="text" class="new-street">' +
          '<span><span>Street</span></span>' +
        '</label>' +
      '</div>' +
      '<div class="form-group styleMe">' +
        '<label class="input">' +
          '<input type="text" class="new-city">' +
          '<span><span>City</span></span>' +
        '</label>' +
      '</div>' +
      '<div class="form-group styleMe">' +
        '<label class="input">' +
          '<input type="text" class="new-state">' +
          '<span><span>State</span></span>' +
        '</label>' +
      '</div>' +
      '<div class="form-group styleMe">' +
        '<label class="input">' +
          '<input type="text" class="new-zip">' +
          '<span><span>Zip</span></span>' +
        '</label>' +
    '</div>' +
    '</div>');
  });

  $("#add-address").on("click", function(event) {
    setupInputLabels();
  });
});
