$( document ).ready(function() {
    $('button').on('click', buttonclick)
});

function buttonclick(){
  {
  $.ajax({
    url: 'http://localhost:3000/wowmount'
  })
  .done(function(response){
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
}
