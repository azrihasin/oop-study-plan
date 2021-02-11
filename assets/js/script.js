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
