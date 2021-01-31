class Sem {
  constructor(sem_id, sem_name) {
    this.sem_id = sem_id;
    this.sem_name = sem_name;
    this.table = {};
  }

  push(element) {
    this.data[this.length] = element;
    this.length++;
    return this.data;
  }
}

class Subject extends Sem {
  constructor(
    sem_id,
    sem_name,
    course_id,
    course,
    course_code,
    credit_hour,
    taken
  ) {
    super(sem_id, sem_name);
    this.course_id = course_id;
    this.course = course;
    this.course_code = course_code;
    this.credit_hour = credit_hour;
    this.taken = taken;
  }
}

var currentTable = 0;

sem = [];
subject = [];
console.log(sem.length);
console.log(subject.length);

document.getElementById("check").onclick = function () {
  console.log(window.sem);
  array = window.subject;
  for (i = 0; i < array.length; i++) {
    for (j = 0; j < array[i].length; j++) console.log(array[i][j]);
  }
};

function addSem() {
  //INDEX OF TABLE
  // let length = window.sem.length;
  let length = window.sem.length;
  let tableId = create_UUID();
  let createId = "table " + tableId;

  //SEND TO OBJECT
  if (length == 0) {
    sem[0] = new Sem(tableId, "table" + length);
  } else {
    sem.push(new Sem(tableId, "table" + length));
  }

  if (length == 0) {
    subject[0] = [];
  } else {
    subject.push([]);
  }

  console.log("Sem length:" + sem.length);
  console.log("Subject length:" + subject.length);
  // console.log(sem[length].sem_name);

  //UPDATE SELECT OPTIO FOR DELETE TABLE

  var deleteList = document.getElementById("tables");

  var li = document.createElement("option");
  li.innerHTML = `${window.sem[length].sem_name}`;

  console.log(window.sem[length].sem_name);

  deleteList.appendChild(li);

  //CREATE ELEMENT
  var tablespace = document.createElement("DIV");
  var table = document.createElement("TABLE");
  var addbtn = document.createElement("DIV");
  var editbtn = document.createElement("DIV");
  var tableNameArea = document.createElement("DIV");
  var tablename = document.createElement("TEXTAREA");

  var div = document.createElement("div");

  //TABLE NAME
  var tableNameId = "tablename" + tableId;
  var t = document.createTextNode("table" + length);
  tablename.appendChild(t);
  tablename.setAttribute("id", tableNameId);
  tablename.readOnly = true;
  tablename.style.display = "inline-block";
  tablename.style.resize = "none";
  tableNameArea.className = "tablenamearea";

  tableNameArea.appendChild(tablename);

  //EDIT BUTTON FOR TABLENAME

  editButtonId = "editbuttonid_" + tableId;
  editButtonIcon = "editbuttonicon_" + tableId;

  editbtn.style.width = "56px";
  editbtn.style.height = "56px";
  editbtn.style.float = "right";
  editbtn.style.paddingTop = "5px";

  editbtn.innerHTML = `<button id="${editButtonId}" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onclick="changeState(this.id)">
        <i id="${editButtonIcon}" class="material-icons">edit</i>
        </button>`;

  tableNameArea.appendChild(editbtn);

  //TBODY
  var tablebody = document.createElement("TBODY");

  //TABLE HEADER
  var tr = document.createElement("tr");
  tr.innerHTML = `<th><input type="checkbox" name="" id=""></th><th id="course_code ">Course code</th>
            <th id="course">Course</th>
            <th id="credit_hour">Credit hour</th>
            <th></th>`;

  //ADD SUBJECT BUTTON ELEMENT
  addbtn.innerHTML = `<button id="${tableId}" class="addsubject mdc-button mdc-button--raised" >
            <span class="mdc-button__label">Add Subject</span>
            </button>`;

  addbtn.onclick = function () {
    window.currentTable = tableId;
    console.log("Debug id:" + window.currentTable);

    openFAB();
  };
  // addbtn.setAttribute("id", tableId);
  addbtn.style.width = "auto";

  //INSERT ELEMENT HEADER TO TABLE
  table.appendChild(tr);
  table.appendChild(tablebody);
  table.setAttribute("id", "table" + tableId);

  //CREATE DIV FOR TABLE AND APPEND TABLE TO DIV
  div.appendChild(tableNameArea);
  div.appendChild(table);
  div.appendChild(addbtn);
  div.className = "card";
  div.setAttribute("id", "card" + tableId);
  tablespace.appendChild(div);

  //MAKE THE ADD TABLE BUTTON TO THE LASS ELEMENT

  var element = document.getElementById("cards");
  //   element.appendChild(tablespace);

  var referenceNode = document.getElementById("addtablearea");

  element.insertBefore(tablespace, referenceNode);

  var classlength = document.getElementsByClassName("card").length;
  console.log("class length " + classlength);

  var upgreadedEditBtn = document.getElementById(editButtonId);
  componentHandler.upgradeElement(upgreadedEditBtn);

  //SEM PICKER LIST

  var selectlist = document.getElementById("semoption");

  var li = document.createElement("option");
  li.innerHTML = `${window.sem[length].sem_name}`;

  selectlist.appendChild(li);

  //SELECT OPTION STATE CURRENT TABLE

  var stateoption = document.getElementById(tableId);

  stateoption.onclick = function () {
    var opts = document.getElementById("semoption").options;

    var index;

    for (i = 0; i < window.sem.length; i++) {
      if (window.sem[i].sem_id == tableId) {
        index = i;
        console.log(window.currentTable);
        console.log(window.sem[i].sem_id);
        console.log(index);
      }
    }

    console.log(window.sem);
    console.log(index);

    for (var i = 0; i < opts.length; i++) {
      if (opts[i].innerText == window.sem[index].sem_name) {
        console.log(window.sem[index].sem_name);

        opts[i].selected = "true";

        break;
      }
    }

    console.log("Current button id " + window.currentTable);
    openFAB();
  };
}

function getValue() {
  //GET ALL VALUE FROM INPUT
  var course = document.getElementById("coursenameinput").value;
  var course_code = document.getElementById("coursecodeinput").value;
  var credit_hour = document.getElementById("credithourinput").value;

  //CREATE ALL VARIABLES

  console.log(window.sem);
  console.log("Debug id :" + window.currentTable);

  var index;

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_id == window.currentTable) {
      console.log(window.currentTable);
      index = i;
    }
  }

  var currentTableId = window.sem[index].sem_id;

  var tableId = "table" + currentTableId;

  console.log("Current table id : " + tableId);

  var table = document.getElementById(tableId);

  console.log("ROW TO BECOME ID" + table.tBodies[0].rows.length);

  var rowCount = 0;

  rowCount = create_UUID();

  //CHECK SEM NEM

  var s_id = window.currentTable;
  var s_name = window.sem[index].sem_name;
  var c_id = rowCount;
  var c_name = course;
  var c_code = course_code;
  var c_hour = credit_hour;
  var taken = "false";

  var subjectId = s_id + "_" + c_id;
  var buttonId = "button" + subjectId;
  var listId = "list" + subjectId;
  var iconId = "icon" + subjectId;
  var ulId = "ul" + subjectId;
  var editId = "edit_" + subjectId;
  var deleteId = "delete_" + subjectId;

  //CREATING NEW ROW

  window.subject[index].push(
    new Subject(s_id, s_name, c_id, c_name, c_code, c_hour, taken)
  );

  var newRow = document
    .getElementById(tableId)
    .getElementsByTagName("tbody")[0]
    .insertRow();
  // newRow = "<td>New row text</td><td>New row 2nd cell</td>"; <-- won't work
  newRow.innerHTML = `
                        <td><input type="checkbox" name="  " id=${subjectId} value="false"></td>
                        <td>${course_code}</td>
                        <td>${course}</td>
                        <td>${credit_hour}</td>
                        <td id=${buttonId}>
                        
                        <button id="${listId}" class="mdl-button mdl-js-button mdl-button--icon">
                            <p id='${iconId}' class="material-icons">more_vert</p>
                    </button>

                    <ul id='${ulId}' class="mdl-menu mdl-js-menu" for="${listId}">
                        <li id='${editId}'class="editmenu mdl-menu__item" onclick="editsubject(this.id)">Edit</li>                          
                        <li id='${deleteId}'class="deletemenu mdl-menu__item" onclick="deletesubject(this.id)">Delete</li>
                    </ul>
                    
                    </td>
                    `;

  var button = document.getElementById(listId);
  componentHandler.upgradeElement(button);

  var icon = document.getElementById(iconId);
  componentHandler.upgradeElement(icon);

  var ul = document.getElementById(ulId);
  componentHandler.upgradeElement(ul);

  var editsub = document.getElementById(editId);
  componentHandler.upgradeElement(editsub);

  var deletesub = document.getElementById(editId);
  componentHandler.upgradeElement(deletesub);
}

var states = ["EDIT", "DONE"], // your possible states
  current_state = 0; // your flag

function changeState(getid) {
  current_state = !current_state; // switch
  document.getElementById(getid).value = states[current_state ? 1 : 0]; // write your state

  console.log(current_state);

  if (current_state == 1) {
    var fields = getid.split("_");
    var name = fields[0];
    var getIndex = fields[1];
    var num;

    for (i = 0; i < window.sem.length; i++) {
      if (window.sem[i].sem_id == getIndex) {
        num = i;
      }
    }

    var before = window.sem[num].sem_name;

    var getTableId = "tablename" + getIndex;
    var getTable = document.getElementById(getTableId);

    getTable.removeAttribute("readonly");
    getTable.style.border = "#999 solid 1px";
    getTable.style.borderRadius = "5px";
    getTable.style.backgroundColor = "white";
    getTable.style.overflow = "hidden";
    getTable.style.resize = "none";

    var editButtonIcon = "editbuttonicon_" + getIndex;

    var edit = document.getElementById(editButtonIcon);

    console.log(edit);

    edit.textContent = "done";
  } else {
    var fields = getid.split("_");
    var name = fields[0];
    var getIndex = fields[1];
    var num;

    for (i = 0; i < window.sem.length; i++) {
      if (window.sem[i].sem_id == getIndex) {
        num = i;
      }
    }

    var before = window.sem[num].sem_name;

    var getTableId = "tablename" + getIndex;

    var getTable = document.getElementById(getTableId);
    getTable.readOnly = true;
    getTable.style.border = "none";
    getTable.style.overflow = "hidden";
    getTable.style.resize = "none";
    getTable.style.backgroundColor = "transparent";

    var doneEditName = "editbuttonid_" + getIndex;
    var doneEdit = document.getElementById(getid);
    var editButtonIcon = "editbuttonicon_" + getIndex;

    var edit = document.getElementById(editButtonIcon);
    edit.textContent = "edit";

    console.log(getTable.value);

    window.sem[num].sem_name = getTable.value;

    console.log(window.sem[num]);

    for (i = 0; i < window.subject[num].length; i++) {
      window.subject[num][i].sem_name = getTable.value;

      // console.log(window.subject[getid][i].sem_name);
    }

    console.log("Sem name" + window.sem[num].sem_name);

    var opts = document.getElementById("semoption").options;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].innerText == before) {
        opts[i].innerText = window.sem[num].sem_name;

        break;
      }
    }
  }
}

function editsubject(geteditid) {
  openFAB();

  console.log("GetEditId: " + geteditid);

  var editElement = document.getElementById(geteditid);

  var fields = geteditid.split("_");
  var name = fields[0];
  var getTableIndex = fields[1];
  var getIndex = fields[2];
  var semnum;
  var num;

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_id == getTableIndex) {
      semnum = i;
    }
  }

  for (i = 0; i < window.subject[semnum].length; i++) {
    if (window.subject[semnum][i].course_id == getIndex) {
      num = i;
    }
  }

  console.log(fields);
  console.log(semnum);
  console.log(num);
  console.log("See subject :" + window.subject[semnum][num].course);
  console.log(window.subject[semnum]);

  document.getElementById("coursenameinput").value =
    window.subject[semnum][num].course;
  document.getElementById("coursecodeinput").value =
    window.subject[semnum][num].course_code;
  document.getElementById("credithourinput").value =
    window.subject[semnum][num].credit_hour;

  var createButtonId = `doneeditsubject('${
    "variable_" + getTableIndex + "_" + getIndex
  }');`;

  var getButton = document.getElementById("donefabbutton");
  getButton.setAttribute("onClick", createButtonId);
}

function deletesubject(geteditid) {
  //   var deleteElement = document.getElementById(geteditid);

  var fields = geteditid.split("_");
  var name = fields[0];
  var getTableIndex = fields[1];
  var getIndex = fields[2];
  var semnum;
  var num;

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_id == getTableIndex) {
      semnum = i;
    }
  }

  console.log(fields);
  console.log(semnum);

  for (i = 0; i < window.subject[semnum].length; i++) {
    if (window.subject[semnum][i].course_id == getIndex) {
      num = i;
    }
  }

  var getDeleteTable = "table" + getTableIndex;

  console.log("Table to delete : " + getDeleteTable);

  var deleteTable = document.getElementById(getDeleteTable).tBodies[0];

  for (var i = 0; i < deleteTable.rows.length; i++) {
    var trs = deleteTable.getElementsByTagName("tr")[i];
    var cellVal = trs.cells[4].id;

    var fields = cellVal.split("_");
    var one = fields[0];
    var theIdRow = fields[1];

    console.log("Delete row : " + theIdRow);

    if (theIdRow == window.subject[semnum][num].course_id) {
      deleteTable.deleteRow(i);
      window.subject[semnum].splice(num, 1);
    }
  }
}

function doneeditsubject(geteditid) {
  console.log(geteditid);

  var fields = geteditid.split("_");
  var name = fields[0];
  var getTableIndex = fields[1];
  var getIndex = fields[2];
  var semnum;
  var num;

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_id == getTableIndex) {
      semnum = i;
    }
  }

  for (i = 0; i < window.subject[semnum].length; i++) {
    if (window.subject[semnum][i].course_id == getIndex) {
      num = i;
    }
  }

  var getTableId = "table" + getTableIndex;

  var course = document.getElementById("coursenameinput").value;
  var course_code = document.getElementById("coursecodeinput").value;
  var credit_hour = document.getElementById("credithourinput").value;

  var option_sem = document.getElementById("semoption").value;

  console.log(course);
  console.log(course_code);
  console.log(credit_hour);

  console.log(semnum);
  console.log(num);

  console.log(window.subject[semnum][num].course);

  window.subject[semnum][num].course = course.toString();
  window.subject[semnum][num].course_code = course_code.toString();
  window.subject[semnum][num].credit_hour = credit_hour.toString();

  var as = document.getElementById(getTableId);

  var subjectId = getTableIndex + "_" + getIndex;
  var buttonId = "button" + subjectId;
  var listId = "list" + subjectId;
  var iconId = "icon" + subjectId;
  var ulId = "ul" + subjectId;
  var editId = "edit_" + subjectId;
  var deleteId = "delete" + subjectId;

  var getRow = parseInt(num) + parseInt(1);

  console.log(getRow);
  var trs = as.getElementsByTagName("tr")[getRow];

  trs.innerHTML = `
                        <td><input type="checkbox" name="  " id=${subjectId} value="false"></td>
                        <td>${course_code}</td>
                        <td>${course}</td>
                        <td>${credit_hour}</td>
                        <td id=${buttonId}>
                        
                        <button id="${listId}" class="mdl-button mdl-js-button mdl-button--icon">
                            <p id='${iconId}' class="material-icons">more_vert</p>
                    </button>

                    <ul id='${ulId}' class="mdl-menu mdl-js-menu" for="${listId}">
                        <li id='${editId}'class="editmenu mdl-menu__item" onclick="editsubject(this.id)">Edit</li>                          
                        <li id='${deleteId}'class="deletemenu mdl-menu__item" onclick="">Delete</li>
                    </ul>
                    
                    </td>
                    `;

  var button = document.getElementById(listId);
  componentHandler.upgradeElement(button);

  var icon = document.getElementById(iconId);
  componentHandler.upgradeElement(icon);

  var ul = document.getElementById(ulId);
  componentHandler.upgradeElement(ul);

  var editsub = document.getElementById(editId);
  componentHandler.upgradeElement(editsub);

  var deletesub = document.getElementById(editId);
  componentHandler.upgradeElement(deletesub);

  var getButton = document.getElementById("donefabbutton");
  getButton.setAttribute("onClick", "javascript:getValue();");

  //IF THE VALUE OPTIONS CHANGES

  var sel = document.getElementById("semoption");
  var getTableId = "";
  var getTableNum = 0;

  if (sel.options[sel.selectedIndex].text == window.sem[semnum].sem_name) {
    console.log(" The subject is same with the option");
  } else {
    //DELETING ROW THAT EXIST IN TABLE BEFORE

    var getDeleteTable = "table" + getTableIndex;

    console.log("Table to delete : " + getDeleteTable);

    var deleteTable = document.getElementById(getDeleteTable).tBodies[0];

    for (var i = 0; i < deleteTable.rows.length; i++) {
      var trs = deleteTable.getElementsByTagName("tr")[i];
      var cellVal = trs.cells[4].id;

      var fields = cellVal.split("_");
      var one = fields[0];
      var theIdRow = fields[1];

      console.log("Delete row : " + theIdRow);

      if (theIdRow == window.subject[semnum][num].course_id) {
        deleteTable.deleteRow(i);
        window.subject[semnum].splice(num, 1);
      }
    }

    //ADDING ROW TO TARGETTED TABLE

    var str = sel.options[sel.selectedIndex].text;

    var getCurrentTable;

    for(i=0;i<window.sem.length;i++){
      if(window.sem[i].sem_name == str){
        getCurrentTable = window.sem[i].sem_id;
      }else{
        console.log("error");
      }
    }


    window.currentTable = getCurrentTable;

    console.log("MOVE CURRENT TABLE ID"+ window.currentTable);

    getValue();
  }
}

function deleteSem() {
  var e = document.getElementById("tables");

  var e2 = document.getElementById("semoption");

  var text = e.options[e.selectedIndex].text;

  console.log(text);

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_name == text) {
      var tbl = document.getElementById("table" + i);
      // if(tbl) tbl.parentNode.removeChild(tbl);
      tbl.remove();

      document.getElementById("card" + i).remove();

      window.sem.splice(i, 1);

      console.log(window.sem);

      //DELETE SPLICE ALL THE ELEMENT IN ARRAY

      for (j = 0; j < window.subject[i].length; j++) {
        window.subject[i].splice(j, 1);
        window.subject.splice(j, 1);
      }

      //DELETE ALL ELEMENT

      //e.firstElementChild can be used.
      var el = document.getElementById("cards");

      while (el.firstChild) el.removeChild(el.firstChild);

      //RECONSTRUCT ARRAY

      for (x = 0; x < window.sem.length; x++) {
        window.sem[x].sem_id = x;

        for (y = 0; y < window.subject[x].length; y++) {
          window.subject[x][y].sem_id = x;
        }
      }

      console.log(window.sem);
      console.log(window.subject);

      //BUILD ARRAY

      buildTable();
    }
  }
  modal.style.display = "none";
}

function buildTable() {
  var studyPlanLength = window.sem.length;

  for (i = 0; i < studyPlanLength; i++) {
    //BUILD THE TABLE
    buildSem();

    if (window.subject[i].length > 0) {
      for (j = 0; j < window.subject[i].length; j++) {
        var course = window.subject[i][j].course;
        var course_code = window.subject[i][j].course_code;
        var credit_hour = window.subject[i][j].credit_hour;
        var tableIndex = i;

        //BUILD ALL THE SUBJECT
        buildSubject(course, course_code, credit_hour, tableIndex);
      }
    }
  }
}

function buildSem() {
  //INDEX OF TABLE
  let length = window.sem.length;
  let createId = "table " + length;
  let createTable = [];

  //UPDATE SELECT OPTIO FOR DELETE TABLE

  var deleteList = document.getElementById("tables");

  var li = document.createElement("option");
  li.innerHTML = `${window.sem[length].sem_name}`;

  console.log(window.sem[length].sem_name);

  deleteList.appendChild(li);

  //CREATE ELEMENT
  var tablespace = document.createElement("DIV");
  var table = document.createElement("TABLE");
  var addbtn = document.createElement("DIV");
  var editbtn = document.createElement("DIV");
  var tableNameArea = document.createElement("DIV");
  var tablename = document.createElement("TEXTAREA");

  var div = document.createElement("div");

  //TABLE NAME
  var tableNameId = "tablename" + length;
  var t = document.createTextNode(createId);
  tablename.appendChild(t);
  tablename.setAttribute("id", tableNameId);
  tablename.readOnly = true;
  tablename.style.display = "inline-block";
  tablename.style.resize = "none";
  tableNameArea.className = "tablenamearea";

  tableNameArea.appendChild(tablename);

  //EDIT BUTTON FOR TABLENAME

  editButtonId = "editbuttonid-" + length;
  editButtonIcon = "editbuttonicon-" + length;

  editbtn.style.width = "56px";
  editbtn.style.height = "56px";
  editbtn.style.float = "right";
  editbtn.style.paddingTop = "5px";

  editbtn.innerHTML = `<button id="${editButtonId}" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onclick="changeState(this.id)">
          <i id="${editButtonIcon}" class="material-icons">edit</i>
          </button>`;

  tableNameArea.appendChild(editbtn);

  //TBODY
  var tablebody = document.createElement("TBODY");

  //TABLE HEADER
  var tr = document.createElement("tr");
  tr.innerHTML = `<th><input type="checkbox" name="" id=""></th><th id="course_code ">Course code</th>
              <th id="course">Course</th>
              <th id="credit_hour">Credit hour</th>
              <th></th>`;

  //ADD SUBJECT BUTTON ELEMENT
  addbtn.innerHTML = `<button class="addsubject mdc-button mdc-button--raised" >
              <span class="mdc-button__label">Add Subject</span>
              </button>`;

  addbtn.onclick = openFAB;
  addbtn.setAttribute("id", length);
  addbtn.style.width = "auto";

  //INSERT ELEMENT HEADER TO TABLE
  table.appendChild(tr);
  table.appendChild(tablebody);
  table.setAttribute("id", "table" + length);

  //CREATE DIV FOR TABLE AND APPEND TABLE TO DIV
  div.appendChild(tableNameArea);
  div.appendChild(table);
  div.appendChild(addbtn);
  div.className = "card";
  div.setAttribute("id", "card" + length);
  tablespace.appendChild(div);

  //MAKE THE ADD TABLE BUTTON TO THE LASS ELEMENT

  var element = document.getElementById("cards");
  //   element.appendChild(tablespace);

  var referenceNode = document.getElementById("addtablearea");

  element.insertBefore(tablespace, referenceNode);

  var classlength = document.getElementsByClassName("card").length;
  console.log("class length " + classlength);

  var upgreadedEditBtn = document.getElementById(editButtonId);
  componentHandler.upgradeElement(upgreadedEditBtn);

  //SEM PICKER LIST

  var selectlist = document.getElementById("semoption");

  tablepick = "Table " + length;

  var li = document.createElement("option");
  li.innerHTML = `${window.sem[length].sem_name}`;

  selectlist.appendChild(li);

  //SELECT OPTION STATE CURRENT TABLE

  var stateoption = document.getElementById(length);

  stateoption.onclick = function () {
    var opts = document.getElementById("semoption").options;

    for (var i = 0; i < opts.length; i++) {
      if (opts[i].innerText == window.sem[window.currentTable].sem_name) {
        console.log(window.sem[window.currentTable].sem_name);

        opts[i].selected = "true";

        break;
      }
    }

    window.currentTable = this.id;

    console.log("Current button id " + currentTable);
    openFAB();
  };
}

function buildSubject(course, course_code, credit_hour, tableIndex) {
  //CREATE ALL VARIABLES

  var tableId = "table" + tableIndex;

  console.log("Table Id:" + tableId);

  var table = document.getElementById(tableId);

  console.log("ROW TO BECOME ID" + table.tBodies[0].rows.length);

  var rowCount = 0;

  var getLength = window.subject[tableIndex].length;

  rowCount = create_UUID();

  //CHECK SEM NEM

  var s_id = tableIndex;
  var s_name = window.sem[tableIndex].sem_name;
  var c_id = rowCount;
  var c_name = course;
  var c_code = course_code;
  var c_hour = credit_hour;
  var taken = "false";

  var subjectId = s_id + "_" + c_id;
  var buttonId = "button" + subjectId;
  var listId = "list" + subjectId;
  var iconId = "icon" + subjectId;
  var ulId = "ul" + subjectId;
  var editId = "edit_" + subjectId;
  var deleteId = "delete_" + subjectId;

  var newRow = document
    .getElementById(tableId)
    .getElementsByTagName("tbody")[0]
    .insertRow();
  // newRow = "<td>New row text</td><td>New row 2nd cell</td>"; <-- won't work
  newRow.innerHTML = `
                        <td><input type="checkbox" name="  " id=${subjectId} value="false"></td>
                        <td>${course_code}</td>
                        <td>${course}</td>
                        <td>${credit_hour}</td>
                        <td id=${buttonId}>
                        
                        <button id="${listId}" class="mdl-button mdl-js-button mdl-button--icon">
                            <p id='${iconId}' class="material-icons">more_vert</p>
                    </button>

                    <ul id='${ulId}' class="mdl-menu mdl-js-menu" for="${listId}">
                        <li id='${editId}'class="editmenu mdl-menu__item" onclick="editsubject(this.id)">Edit</li>                          
                        <li id='${deleteId}'class="deletemenu mdl-menu__item" onclick="deletesubject(this.id)">Delete</li>
                    </ul>
                    
                    </td>
                    `;

  var button = document.getElementById(listId);
  componentHandler.upgradeElement(button);

  var icon = document.getElementById(iconId);
  componentHandler.upgradeElement(icon);

  var ul = document.getElementById(ulId);
  componentHandler.upgradeElement(ul);

  var editsub = document.getElementById(editId);
  componentHandler.upgradeElement(editsub);

  var deletesub = document.getElementById(editId);
  componentHandler.upgradeElement(deletesub);
}

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
