$( document ).ready(function() {
    $('button').on('click', buttonclick)
});

function buttonclick(){
  {
  $.ajax({
    url: 'http://localhost:3000/wowmount'
  })
  .done(function(response){
    var parsed = JSON.parse(response)
    console.log('data: ', parsed);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    alert('oh no!');
    console.log(textStatus, errorThrown);
  })
  .always(function() {
    console.log('I always run no matter what');
  })
}
}
