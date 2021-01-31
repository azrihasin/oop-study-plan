//Variables


var overlay = $("#overlay"),
        fab = $(".fab"),
 addsubject = $(".addsubject"),
     submit = $("#submit"),
     done=$(".done"),
    //  editmenu=$(".editmenu")
     cancelbutton = $(".cancel");

//fab click

done.on('click', closeFAB);
// addsubject.on('click', openFAB);
// editmenu.on('click', openFAB);

overlay.on('click', closeFAB);
cancelbutton.on('click', closeFAB);

// function addsubject(){
//   openFAB;
// }

function openFAB() {
  
  fab.addClass('active');
  overlay.addClass('dark-overlay');

}

function getValue(){
    // var course = document.getElementById("coursenameinput").value;
    // var course_code = document.getElementById("coursecodeinput").value;
    // var credit_hour = document.getElementById("credithourinput").value;

    // alert(course,course_code,credit_hour);
    done.on('click', closeFAB);
  
}

function closeFAB(event) {
  if (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  fab.removeClass('active');
  overlay.removeClass('dark-overlay');
  
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  var tableLength = window.sem.length;

  

  var deleteList = document.getElementById("tables");

  deleteList.options[0].selected = true ;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

