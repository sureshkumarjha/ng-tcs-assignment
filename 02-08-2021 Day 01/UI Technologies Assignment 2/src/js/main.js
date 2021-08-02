$(document).ready(function(){
  $("#compute").click(function(){
    $('#error').text("")
    $("#ans").val("")
    let value1 = $("#value1").val();
    let value2 = $("#value2").val();
    let opt = $("#opt").val()
    if(!checkInputs(value1,value2)){
      $('#error').text("Enter Values")
      $("#ans").val("")
      return
    }

    $("#ans").val(eval(value1+opt+value2))

  });

  $("#opt").change(()=>{
    $('#error').text("")
    $("#ans").val("")
  })

  function checkInputs(value1,value2){
    if(value1 === "" || value2 === ""){
      return false;
    }
    return true;
  }

});

function resetError(){
  $('#error').text("")
}