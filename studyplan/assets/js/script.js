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
addsubject.on('click', openFAB);
// editmenu.on('click', openFAB);

overlay.on('click', closeFAB);
cancelbutton.on('click', closeFAB);

function addsubject(){
  openFAB;
}

function openFAB() {

  window.currentTable = this.id;

  console.log("Current button id " + currentTable);


  
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
