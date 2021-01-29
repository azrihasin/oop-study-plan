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

        document.getElementById("addtable").onclick = function () {
        //INDEX OF TABLE
        let length = window.sem.length;
        let createId = "table " + length;
        let createTable = [];

        //SEND TO OBJECT
        if (length == 0) {
            sem[0] = new Sem(length, createId);
        } else {
            sem.push(new Sem(length, createId));
        }

        if (length == 0) {
            subject[0] = [];
        } else {
            subject.push([]);
        }

        console.log("Sem length:" + sem.length);
        console.log("Subject length:" + subject.length);
        // console.log(sem[length].sem_name);

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
        tablespace.appendChild(div);

        //MAKE THE ADD TABLE BUTTON TO THE LASS ELEMENT

        var classlength = document.getElementsByClassName("card").length;
        // console.log("class length " +classlength);

        var div1 = document.getElementsByClassName("card")[classlength - 1];
        div1.parentNode.insertBefore(tablespace.firstChild, div1.nextSibling);

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
            if (opts[i].innerText == window.sem[length].sem_name) {
                console.log(window.sem[length].sem_name);

                opts[i].selected = "true";

                break;
            }
            }

            window.currentTable = this.id;

            console.log("Current button id " + currentTable);
            openFAB();
        };
        };

        function getValue() {
        //GET ALL VALUE FROM INPUT
        var course = document.getElementById("coursenameinput").value;
        var course_code = document.getElementById("coursecodeinput").value;
        var credit_hour = document.getElementById("credithourinput").value;

        //CREATE ALL VARIABLES

        var tableId = "table" + window.currentTable;

        console.log("Table Id:" + tableId);

        var table = document.getElementById(tableId);

        console.log("ROW TO BECOME ID" + table.tBodies[0].rows.length);

        var rowCount = 0;

        var getLength = window.subject[window.currentTable].length;

        // rowCount = table.tBodies[0].rows.length;

        // for(i=0;i<getLength;i++){
        //     if(window.subject[window.currentTable][i].course_id==rowCount){
        //         rowCount = rowCount+1;
        //     }else{
        //         rowCount = table.tBodies[0].rows.length;
        //     }
        // }

        rowCount = create_UUID();

        //CHECK SEM NEM

        var s_id = window.currentTable;
        var s_name = window.sem[window.currentTable].sem_name;
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

        window.subject[window.currentTable].push(
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

        document.getElementById("check").onclick = function () {
        array = window.subject;
        for (i = 0; i < array.length; i++) {
            for (j = 0; j < array[i].length; j++) console.log(array[i][j]);
        }
        };

        var states = ["EDIT", "DONE"], // your possible states
        current_state = 0; // your flag

        function changeState(getid) {
        current_state = !current_state; // switch
        document.getElementById(getid).value = states[current_state ? 1 : 0]; // write your state

        console.log(current_state);

        if (current_state == 1) {
            var fields = getid.split("-");
            var name = fields[0];
            var num = fields[1];

            var before = window.sem[num].sem_name;

            var getTableId = "tablename" + num;
            var getTable = document.getElementById(getTableId);

            getTable.removeAttribute("readonly");
            getTable.style.border = "#999 solid 1px";
            getTable.style.borderRadius = "5px";
            getTable.style.backgroundColor = "white";
            getTable.style.overflow = "hidden";
            getTable.style.resize = "none";

            var editButtonIcon = "editbuttonicon-" + num;

            var edit = document.getElementById(editButtonIcon);

            console.log(edit);

            edit.textContent = "done";
        } else {
            var fields = getid.split("-");
            var name = fields[0];
            var num = fields[1];

            var before = window.sem[num].sem_name;

            var getTableId = "tablename" + num;

            var getTable = document.getElementById(getTableId);
            getTable.readOnly = true;
            getTable.style.border = "none";
            getTable.style.overflow = "hidden";
            getTable.style.resize = "none";
            getTable.style.backgroundColor = "transparent";

            var doneEditName = "editbuttonid-" + num;
            var doneEdit = document.getElementById(getid);
            var editButtonIcon = "editbuttonicon-" + num;

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
        var semnum = fields[1];
        var getIndex = fields[2];
        var num;

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
            "variable_" + semnum + "_" + getIndex
        }');`;

        var getButton = document.getElementById("donefabbutton");
        getButton.setAttribute("onClick", createButtonId);
        }

        function deletesubject(geteditid) {
        //   var deleteElement = document.getElementById(geteditid);

        var fields = geteditid.split("_");
        var name = fields[0];
        var semnum = fields[1];
        var getIndex = fields[2];
        var num;

            
          console.log(fields);
          console.log(semnum);
        //   console.log(num);
        //   console.log("See subject :" + window.subject[semnum][num].course);
        //   console.log(window.subject[semnum]);

        //   var getButton = document.getElementById("donefabbutton");
        //   getButton.setAttribute("onClick", createButtonId);

        for (i = 0; i < window.subject[semnum].length; i++) {
            if (window.subject[semnum][i].course_id == getIndex) {
            num = i;
            }
        }

            var getDeleteTable = "table" + semnum;

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
        var semnum = fields[1];
        var getIndex = fields[2];
        var num;

        console.log(getIndex);

        for (i = 0; i < window.subject[semnum].length; i++) {
            if (window.subject[semnum][i].course_id == getIndex) {
            num = i;
            }
        }

        var getTableId = "table" + semnum;

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

        var subjectId = semnum + "_" + getIndex;
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

            var getDeleteTable = "table" + semnum;

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

            var fields = str.split(" ");
            var a = fields[0];
            var b = fields[1];

            var removeSpace = str.replace(/\s/g, "");

            var targetTable = document.getElementById(removeSpace);

            window.currentTable = b;

            getValue();
        }
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
