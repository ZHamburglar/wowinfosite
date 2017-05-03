$(document).ready(function() {
  $('button#testbutton').on('click', buttonclick);
  $('button#characterbutton').on('click', characterbuttonclick);
});

function buttonclick() {
  {
    $.ajax({
        url: 'http://localhost:3000/wowmount'
      })
      .done(function(response) {
        console.log('data: ', response);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert('oh no!');
        console.log("Bad Request! ", textStatus, errorThrown);
      })
      .always(function() {
        console.log('I always run no matter what');
      })
  }
};

function characterbuttonclick() {
  var servername = $('#server').val();
  var charactername = $('#charactername').val();
  console.log("http://localhost:3000/wowcharacter/"+servername+"/"+charactername)
  {
    $.ajax({
        url: "http://localhost:3000/wowcharacter/"+servername+"/"+charactername
      })
      .done(function(response) {
        console.log('data: ', response);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("Bad Request! ", textStatus, errorThrown);
      })
      .always(function() {
        console.log('I always run no matter what');
      })
  }
}
