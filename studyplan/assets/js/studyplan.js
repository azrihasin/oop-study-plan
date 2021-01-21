class Sem{
    constructor(sem_id,sem_name){
        this.sem_id = sem_id;
        this.sem_name = sem_name;
        this.table={};
    }

    push(element) { 
        this.data[this.length] = element; 
        this.length++; 
        return this.data; 
    } 

}

class Subject extends Sem{

    constructor(sem_id,sem_name,course_id,course,course_code,credit_hour,taken){

        super(sem_id,sem_name);
        this.course_id=course_id;
        this.course=course;
        this.course_code=course_code;
        this.credit_hour=credit_hour;
        this.taken=taken;

        }

}

var currentTable = 0;

 sem = [];
 subject=[];
 console.log(sem.length);
console.log(subject.length);


document.getElementById('addtable').onclick = function(){
   
//INDEX OF TABLE
    let length = window.sem.length;
    let createId = "table "+length;
    let createTable = [];

//SEND TO OBJECT
if(length==0){
    sem[0]=(new Sem(length,createId));
}else{
    sem.push(new Sem(length,createId));
}
   
if(length==0){
   subject[0]=[];
}else{
    subject.push([[]]);
}
    

    console.log("Sem length:" +sem.length);
    console.log("Subject length:" +subject.length);
    // console.log(sem[length].sem_name);


//CREATE ELEMENT
    var tablespace = document.createElement("DIV");
    var table = document.createElement("TABLE");
    var addbtn = document.createElement("DIV");
    var editbtn = document.createElement("DIV");
    var tablename = document.createElement("TEXTAREA");
   
    var div = document.createElement("div");

//TABLE NAME
    var tableNameId = "tablename"+length;
    var t = document.createTextNode(createId);
    tablename.appendChild(t);
    tablename.setAttribute("id",tableNameId);
    tablename.readOnly = true;

//EDIT BUTTON FOR TABLENAME

editButtonId="editbuttonid-"+length;
editButtonIcon="editbuttonicon-"+length;

editbtn.style.width = "56px";
editbtn.style.height = "56px";

editbtn.innerHTML = `<button id="${editButtonId}" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onclick="edittablename(this.id)">
<i class="material-icons">edit</i>
</button>`




//TABLE HEADER
     var tr = document.createElement('tr');
      tr.innerHTML = `<th><input type="checkbox" name="" id=""></th><th id="course_code ">Course code</th>
      <th id="course">Course</th>
      <th id="credit_hour">Credit hour</th>
      <th></th>`

      
//ADD SUBJECT BUTTON ELEMENT
    addbtn.innerHTML = `<button class="addsubject mdc-button mdc-button--raised" >
      <span class="mdc-button__label">Add Subject</span>
    </button>`

    addbtn.onclick =  openFAB;
    addbtn.setAttribute("id",length);
    addbtn.style.width="auto";

//INSERT ELEMENT HEADER TO TABLE
    table.appendChild(tr);
    table.setAttribute("id","table"+length);

//CREATE DIV FOR TABLE AND APPEND TABLE TO DIV
    div.appendChild(tablename);
    div.appendChild(editbtn);
    div.appendChild(table);
    div.appendChild(addbtn);
    div.className = "card";
    tablespace.appendChild(div);
  

//MAKE THE ADD TABLE BUTTON TO THE LASS ELEMENT

    var classlength = document.getElementsByClassName('card').length;
    // console.log("class length " +classlength);

    var div1 = document.getElementsByClassName('card')[classlength-1];
    div1.parentNode.insertBefore(tablespace.firstChild, div1.nextSibling);
   
    var upgreadedEditBtn = document.getElementById(editButtonId);
componentHandler.upgradeElement(upgreadedEditBtn);
}

function getValue(){

    //GET ALL VALUE FROM INPUT 
    var course = document.getElementById("coursenameinput").value;
    var course_code = document.getElementById("coursecodeinput").value;
    var credit_hour = document.getElementById("credithourinput").value;

   console.log("Id to be used: " + window.currentTable);

   //CREATE ALL VARIABLES

   tableId="table"+window.currentTable;

   console.log(tableId);

   const rowCount = document.getElementById(tableId).rows.length;
  
   

   console.log("Table length: "+rowCount);

    var s_id =  window.currentTable;
    var s_name = "Table Name";
    var c_id = rowCount;
    var c_name = course;
    var c_code = course_code;
    var c_hour = credit_hour;
    var taken = "false";

    var subjectId = s_id +"_"+ c_id;
    var buttonId = "button"+subjectId;
    var listId = "list"+subjectId; 
    var iconId = "icon"+subjectId;
    var ulId =  "ul"+subjectId;
    var editId =  "edit"+subjectId;
    var deleteId =  "delete"+subjectId;

    
    //CREATING NEW ROW

    window.subject[window.currentTable].push(new Subject(s_id,s_name,c_id,c_name,c_code,c_hour,taken))

    console.log("Current table :"+currentTable);

    console.log(window.subject[window.currentTable][rowCount-1].course);

    var newRow = document.getElementById(tableId).insertRow();
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
                <li id='${editId}'class="mdl-menu__item">Edit</li>                          
                <li id='${deleteId}'class="mdl-menu__item">Delete</li>
              </ul>
              
              </td>
              `



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

document.getElementById("check").onclick = function(){


    array = window.subject;
    for(i=0;i<array.length;i++){
        for(j=0;j<array[i].length;j++)
        console.log(array[i][j])
    }
    
}


function edittablename(getid){

    console.log(getid);

    var fields = getid.split('-');
    var name = fields[0];
    var num = fields[1];

    var getTableId = "tablename"+num;
    document.getElementById(getTableId).removeAttribute('readonly');

    var doneEditName = "doneeditname"+num;

    var doneEdit= document.getElementById(getid);
    doneEdit.innerHTML = `<button id="${doneEditName}" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onclick="edittablename(this.id)">
<i class="material-icons">done</i>
</button>`
}


