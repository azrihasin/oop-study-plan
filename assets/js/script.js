//Variables

var overlay = $("#overlay"),
  fab = $(".fab"),
  mulfab = $(".multiple_fab"),
  submit = $("#submit"),
  done = $(".done"),
  cancelbutton = $(".cancel");

//fab click

done.on("click", closeFAB);
overlay.on("click", closeFAB);
cancelbutton.on("click", closeFAB);

function openFAB() {
  fab.addClass("active");
  overlay.addClass("dark-overlay");
}

function closeFAB(event) {
  if (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  fab.removeClass("active");
  overlay.removeClass("dark-overlay");
}

//FOR DELETE BUTTON

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  var tableLength = window.sem.length;

  var deleteList = document.getElementById("tables");

  deleteList.options[0].selected = true;
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//FOR ADD MULTIPLE SUBJECT MODAL

// Get the modal
var mulmodal = document.getElementById("mulModal");

// Get the <span> element that closes the modal
var mulspan = document.getElementsByClassName("mulclose")[0];

// When the user clicks on <span> (x), close the modal
mulspan.onclick = function () {
  mulmodal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == mulmodal) {
    mulmodal.style.display = "none";
  }
};
