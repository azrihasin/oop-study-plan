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
  var muladdbtn = document.createElement("DIV");
  var deleteTableBtn = document.createElement("DIV");

  var buttonSection = document.createElement("DIV");

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

  //BUTTON SECTION

  //ADD SUBJECT BUTTON ELEMENT

  var addsection = document.createElement("DIV");
  addsection.className = "addsection";

  addbtn.innerHTML = `<button onclick="openModalAddSubject(this.id)" id="${tableId}" class="addsubject mdc-button mdc-button--raised " >
            <span class="mdc-button__label">Add Subject</span>
            </button>`;

  muladdbtn.innerHTML = `<button onclick="setCurrentForMulSub(this.id)" id="${
    "muladd_" + tableId
  }" class="addsubject mdc-button mdc-button--raised" >
            <span class="mdc-button__label">Add Multiple Subject</span>
            </button>`;

  deleteTableBtn.innerHTML = `<button onclick=" deleteSem(this.id)" id="${
    "delete_" + tableId
  }" class="deleteubject mdc-button mdc-button--raised" >
            <span class="mdc-button__label">Delete Table</span>
            </button>`;

  addbtn.style.float = "left";
  addbtn.style.margin = "0.5rem";
  muladdbtn.style.float = "left";
  muladdbtn.style.margin = "0.5rem";
  // deleteTableBtn.style.float = "left";
  deleteTableBtn.style.margin = "0.5rem";

  addsection.appendChild(addbtn);
  addsection.appendChild(muladdbtn);

  buttonSection.className = "button-section";
  // buttonSection.appendChild(addbtn);
  // buttonSection.appendChild(muladdbtn);
  buttonSection.appendChild(addsection);
  buttonSection.appendChild(deleteTableBtn);

  //INSERT ELEMENT HEADER TO TABLE
  table.appendChild(tr);
  table.appendChild(tablebody);
  table.setAttribute("id", "table" + tableId);

  //CREATE DIV FOR TABLE AND APPEND TABLE TO DIV
  div.appendChild(tableNameArea);
  div.appendChild(table);
  div.appendChild(buttonSection);
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
  var checkBox = "checkbox_" + subjectId;
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
                        <td><input type="checkbox" name="  " id=${checkBox} value="false"></td>
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
  var setcurrent = geteditid.split("_");
   
    window.currentTable= setcurrent[1];


  setOptionToCurrent();
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

  console.log("Get index " + getIndex);
  console.log(fields);
  console.log(semnum);
  console.log("Length "+window.subject[semnum].length);
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

    for (i = 0; i < window.sem.length; i++) {
      if (window.sem[i].sem_name == str) {
        getCurrentTable = window.sem[i].sem_id;
      } else {
        console.log("error");
      }
    }

    window.currentTable = getCurrentTable;

    console.log("MOVE CURRENT TABLE ID" + window.currentTable);

    getValue();
  }
}

function deleteSem(value) {
  var fields = value.split("_");
  var name = fields[0];
  var tableIndex = fields[1];

  var index;

  for (i = 0; i < window.sem.length; i++) {
    if (window.sem[i].sem_id == tableIndex) {
      console.log(tableIndex);
      index = i;
    }
  }

  var tbl = document.getElementById("table" + tableIndex);
  // if(tbl) tbl.parentNode.removeChild(tbl);
  tbl.remove();

  document.getElementById("card" + tableIndex).parentElement.remove();

  window.sem.splice(index, 1);

  console.log(window.sem);

  //DELETE SPLICE ALL THE ELEMENT IN ARRAY

  for (j = 0; j < window.subject[index].length; j++) {
    window.subject[index].splice(j, 1);
    window.subject.splice(j, 1);
  }
}

//CSV FILE MANAGEMENT

var el = document.getElementById("fileUpload");
el.onchange = function () {
  Upload();
};

function Upload() {
  data = [];

  var csvData = new Array();

  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      var reader = new FileReader();
      reader.onload = function (e) {
        var rows = e.target.result.split("\n");
        for (var i = 1; i < rows.length; i++) {
          if (rows[i].match(/^[,\s]*$/)) {
            continue;
          }

          csvData.push(rows[i].split(","));
        }

        //CHECK IF THE TABLE IS EMPTY OR NOT

        if (window.sem.length > 0) {
          var check = confirm("All the existing table will be deleted");
          if (check == true) {
            console.log("The table will be inserted now");

            //CSV DATA TO ARRAY AND CHECK HOW MANY SEM
            var newarray = csvData.map(function (value, index) {
              console.log("Csv data" + csvData[index][0]);

              var reg = /^[0-9]*[.]?[0-9]*$/;

              // console.log(reg.test(csvData[index][0]));
              // if (reg.test(csvData[index][0])) {
              //   return csvData[index][0];
              // }

              return csvData[index][0];
            });

            // REFINE AND REMOVE THE UNDEFINED VALUE

            var selectlist = document.getElementById("semoption");

            var rows = selectlist.getElementsByTagName("option");
            while (rows.length > 1) {
              rows[1].parentNode.removeChild(rows[1]);
            }



            var data = newarray.filter(function (element) {
              return element !== undefined;
            });

            console.log(data);

            var getSem;

            getSem = [...new Set(data)];

            console.log("Sem length :" + getSem.length);

            //REMOVE ALL ELEMENT

            for (var i = 0; i < window.sem.length; i++) {
              var tableIndex = window.sem[i].sem_id;
              var tbl = document.getElementById("table" + tableIndex);
              tbl.remove();

              document
                .getElementById("card" + tableIndex)
                .parentElement.remove();
            }

            //REMOVE ALL ARRAY

            window.sem = [];
            window.subject = [];

            //BUILD THE TABLE

            console.log("Get sem " + getSem);

            for (i = 0; i < getSem.length; i++) {
              console.log("Pass through this build table");
              console.log(csvData[i][0]);
              if (getSem.length == 0) {
                window.sem[0] = new Sem(csvData[i][0], "table" + csvData[i][0]);
              } else {
                window.sem.push(
                  new Sem(csvData[i][0], csvData[i][1])
                );
              }

              buildSem(csvData[i][0], i);

              for (j = 0; j < csvData.length; j++) {
                var s_id = csvData[j][0];
                var s_name = csvData[j][1];
                var c_id = csvData[j][2];
                var c_name = csvData[j][3];
                var c_code = csvData[j][4];
                var c_hour = csvData[j][5];
                var taken = csvData[j][6];
  
                if (j == 0) {
                  window.subject[0] = [];
                } else {
                  window.subject.push([]);
                }
  
                window.subject[i].push(
                  new Subject(s_id, s_name, c_id, c_name, c_code, c_hour, taken)
                );
  
                buildSubject(c_id, c_name, c_code, c_hour, s_id);
              }
            }

          
          } else {
            console.log("The table change cancelled");
          }
        } else {
          console.log("Table inserted");
          console.log("The table will be inserted now");

          //CSV DATA TO ARRAY AND CHECK HOW MANY SEM
          var newarray = csvData.map(function (value, index) {
            console.log("Csv data" + csvData[index][0]);

            var reg = /^[0-9]*[.]?[0-9]*$/;

            // console.log(reg.test(csvData[index][0]));
            // if (reg.test(csvData[index][0])) {
            //   return csvData[index][0];
            // }

            return csvData[index][0];
          });

          // REFINE AND REMOVE THE UNDEFINED VALUE

          var selectlist = document.getElementById("semoption");

          var rows = selectlist.getElementsByTagName("option");
          while (rows.length > 1) {
            rows[1].parentNode.removeChild(rows[1]);
          }



          var data = newarray.filter(function (element) {
            return element !== undefined;
          });

          console.log(data);

          var getSem;

          getSem = [...new Set(data)];

          console.log("Sem length :" + getSem.length);

          //BUILD THE TABLE

          console.log("Get sem " + getSem);

          for (i = 0; i < getSem.length; i++) {
            console.log("Pass through this build table");
            console.log(csvData[i][0]);
            if (getSem.length == 0) {
              window.sem[0] = new Sem(csvData[i][0], "table" + csvData[i][0]);
            } else {
              window.sem.push(
                new Sem(csvData[i][0], csvData[i][1])
              );
            }

            buildSem(csvData[i][0], i);

            for (j = 0; j < csvData.length; j++) {
              var s_id = csvData[j][0];
              var s_name = csvData[j][1];
              var c_id = csvData[j][2];
              var c_name = csvData[j][3];
              var c_code = csvData[j][4];
              var c_hour = csvData[j][5];
              var taken = csvData[j][6];

              if (j == 0) {
                window.subject[0] = [];
              } else {
                window.subject.push([]);
              }

              window.subject[i].push(
                new Subject(s_id, s_name, c_id, c_name, c_code, c_hour, taken)
              );

              buildSubject(c_id, c_name, c_code, c_hour, s_id);
            }
          }
        }

        console.log(csvData[1]);
      };
      reader.readAsText(fileUpload.files[0]);
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }
}

function buildSem(gettableId, index) {
  //INDEX OF TABLE
  let length = index;
  let tableId = gettableId;
  let createId = "table " + tableId;

  //UPDATE SELECT OPTION FOR DELETE TABLE

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
  var muladdbtn = document.createElement("DIV");
  var deleteTableBtn = document.createElement("DIV");

  var buttonSection = document.createElement("DIV");

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

  var editButtonId = "editbuttonid_" + tableId;
  var editButtonIcon = "editbuttonicon_" + tableId;

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

  //BUTTON SECTION

  //ADD SUBJECT BUTTON ELEMENT

  var addsection = document.createElement("DIV");
  addsection.className = "addsection";

  addbtn.innerHTML = `<button onclick="openModalAddSubject(this.id)" id="${tableId}" class="addsubject mdc-button mdc-button--raised " >
            <span class="mdc-button__label">Add Subject</span>
            </button>`;

  muladdbtn.innerHTML = `<button onclick="setCurrentForMulSub(this.id)" id="${
    "muladd_" + tableId
  }" class="addsubject mdc-button mdc-button--raised" >
            <span class="mdc-button__label">Add Multiple Subject</span>
            </button>`;

  deleteTableBtn.innerHTML = `<button onclick=" deleteSem(this.id)" id="${
    "delete_" + tableId
  }" class="deleteubject mdc-button mdc-button--raised" >
            <span class="mdc-button__label">Delete Table</span>
            </button>`;

  addbtn.style.float = "left";
  addbtn.style.margin = "0.5rem";
  muladdbtn.style.float = "left";
  muladdbtn.style.margin = "0.5rem";
  // deleteTableBtn.style.float = "left";
  deleteTableBtn.style.margin = "0.5rem";

  addsection.appendChild(addbtn);
  addsection.appendChild(muladdbtn);

  buttonSection.className = "button-section";
  // buttonSection.appendChild(addbtn);
  // buttonSection.appendChild(muladdbtn);
  buttonSection.appendChild(addsection);
  buttonSection.appendChild(deleteTableBtn);

  //INSERT ELEMENT HEADER TO TABLE
  table.appendChild(tr);
  table.appendChild(tablebody);
  table.setAttribute("id", "table" + tableId);

  //CREATE DIV FOR TABLE AND APPEND TABLE TO DIV
  div.appendChild(tableNameArea);
  div.appendChild(table);
  div.appendChild(buttonSection);
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
}

function buildSubject(course_id, course, course_code, credit_hour, tableIndex) {
  //CREATE ALL VARIABLES

  var tableId = "table" + tableIndex;

  console.log("Table Id:" + tableId);

  for (i = 0; i < window.sem.length; i++) {
    console.log("Sem id " + window.sem[i].sem_id);
    console.log("Sem id in array" + tableIndex);
    if (window.sem[i].sem_id == tableIndex) {
      console.log("Get through here");
      var index = i;
    } else {
      alert("Not find table");
    }
  }

  console.log("Index of table " + index);

  var table = document.getElementById(tableId);

  var getLength = window.subject[index].length;

  rowCount = course_id;

  //CHECK SEM NEM

  var s_id = tableIndex;
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

function download_csv() {
  if (window.subject.length > 0) {
    var data = [];

    var rowcount = 0;

    for (i = 0; i < window.subject.length; i++) {
      for (j = 0; j < window.subject[i].length; j++) {
        data.push([]);

        data[rowcount].push([
          window.subject[i][j].sem_id,
          window.subject[i][j].sem_name,
          window.subject[i][j].course_id,
          window.subject[i][j].course,
          window.subject[i][j].course_code,
          window.subject[i][j].credit_hour,
          window.subject[i][j].taken,
        ]);

        rowcount = rowcount + 1;
      }
    }

    var csv =
      "sem_id,sem_name,course_id,course,course_code,credit_hour,taken\n";
    data.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });

    console.log(csv);
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = "studyplan.csv";
    hiddenElement.click();
  } else {
    alert("Nothing to be downloaded");
  }
}

//CREATE UUID
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

//FOR ADDING MULTIPLE SUBJECT
function muladdsubjectarea() {
  var getArea = document.getElementById("mularea");

  var createArea = document.createElement("DIV");
  var courseCodeArea = document.createElement("INPUT");
  var courseArea = document.createElement("INPUT");
  var creditHourArea = document.createElement("INPUT");

  courseCodeArea.className = "mul";
  courseCodeArea.setAttribute("id", "mulcoursecode");
  courseCodeArea.placeholder = "Course Code";

  courseArea.className = "mul";
  courseArea.setAttribute("id", "mulcourse");
  courseArea.placeholder = "Course ";

  creditHourArea.className = "mul";
  creditHourArea.setAttribute("id", "mulcredithour");
  creditHourArea.placeholder = "Credit Hour";

  createArea.appendChild(courseCodeArea);
  createArea.appendChild(courseArea);
  createArea.appendChild(creditHourArea);

  getArea.appendChild(createArea);
}

function muldeletesubjectarea() {
  var parent = document.getElementById("mularea");
  parent.removeChild(parent.lastElementChild);
}

function muldone() {
  var divNode = document.getElementById("mularea");
  var inputNodes = divNode.getElementsByTagName("DIV");

  for (var i = 0; i < inputNodes.length; ++i) {
    var inputNode = inputNodes[i];

    var inputAreas = inputNode.getElementsByTagName("INPUT");

    document.getElementById("coursecodeinput").value = inputAreas[0].value;
    document.getElementById("coursenameinput").value = inputAreas[1].value;
    document.getElementById("credithourinput").value = inputAreas[2].value;

    getValue();
  }

  //RESET THE AREA BACK

  var myNode = document.getElementById("mularea");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }

  muladdsubjectarea();

  mulcancel();
}

function mulcancel() {
  var mulmodal = document.getElementById("mulModal");

  mulmodal.style.display = "none";
}

//OPEN MODAL ADD SUBJECT
function openModalAddSubject(tableId) {
  window.currentTable = tableId;

  setOptionToCurrent();

  console.log("Debug id:" + window.currentTable);

  openFAB();
}

function setCurrentForMulSub(value) {
  var fields = value.split("_");
  var name = fields[0];
  var tableIndex = fields[1];

  mulmodal.style.display = "block";
  window.currentTable = tableIndex;
}

function setOptionToCurrent() {
  var sel = document.getElementById("semoption");



  for (var i = 0; i < window.sem.length; i++) {
    if (window.currentTable == window.sem[i].sem_id) {
      var getName = window.sem[i].sem_name;
      var val = i;
      console.log("Option index" + i);
    } else {
      console.log("Not find");
    }
  }

  sel.options[0].disabled = true ;

  for (var i = 0; i < sel.options.length; ++i) {
    if (sel.options[i].innerHTML === getName) {
      sel.selectedIndex = i;
      console.log(sel.options[i].innerHTML);
      break;
    }
  }
}
