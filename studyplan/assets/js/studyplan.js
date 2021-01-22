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
    var tableNameArea = document.createElement("DIV");
    var tablename = document.createElement("TEXTAREA");
   
    var div = document.createElement("div");

//TABLE NAME
    var tableNameId = "tablename"+length;
    var t = document.createTextNode(createId);
    tablename.appendChild(t);
    tablename.setAttribute("id",tableNameId);
    tablename.readOnly = true;
    tablename.style.display="inline-block";
    tablename.style.resize="none";
    tableNameArea.className = "tablenamearea";

    tableNameArea.appendChild(tablename);

//EDIT BUTTON FOR TABLENAME

editButtonId="editbuttonid-"+length;
editButtonIcon="editbuttonicon-"+length;

editbtn.style.width = "56px";
editbtn.style.height = "56px";
editbtn.style.float = "right";
editbtn.style.paddingTop = "5px";

editbtn.innerHTML = `<button id="${editButtonId}" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onclick="changeState(this.id)">
<i id="${editButtonIcon}" class="material-icons">edit</i>
</button>`

tableNameArea.appendChild(editbtn);



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
    div.appendChild(tableNameArea);
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
  
   //CHECK SEM NEM

   

   console.log("Table length: "+rowCount);

    var s_id =  window.currentTable;
    var s_name = window.sem[window.currentTable].sem_name;
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
    var editId =  "edit_"+subjectId;
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
                <li id='${editId}'class="editmenu mdl-menu__item" onclick="editsubject(this.id)">Edit</li>                          
                <li id='${deleteId}'class="deletemenu mdl-menu__item" onclick="">Delete</li>
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


var states = ["EDIT","DONE"], // your possible states
current_state = 0; // your flag

function changeState(getid) {
    current_state=!current_state; // switch
    document.getElementById(getid).value=states[current_state?1:0]; // write your state

    console.log(current_state);

    if(current_state==1){
     

        var fields = getid.split('-');
        var name = fields[0];
        var num = fields[1];
    
        var getTableId = "tablename"+num;
        var getTable= document.getElementById(getTableId);

        getTable.removeAttribute('readonly');
        getTable.style.border = "#999 solid 1px";
        getTable.style.borderRadius = "5px";
        getTable.style.backgroundColor = "white";
        getTable.style.overflow = "hidden";
        getTable.style.resize = "none";
        
        var editButtonIcon="editbuttonicon-"+num;
    
        var edit= document.getElementById(editButtonIcon);

        console.log(edit);
 
        edit.textContent="done";
    

    }else{
    

        var fields = getid.split('-');
        var name = fields[0];
        var num = fields[1];
    
        var getTableId = "tablename"+num;   

        var getTable=document.getElementById(getTableId);
        getTable.readOnly=true;
        getTable.style.border = "none";
        getTable.style.overflow = "hidden";
        getTable.style.resize = "none";
        getTable.style.backgroundColor = "transparent";
        
    
        var doneEditName = "editbuttonid-"+num;    
        var doneEdit= document.getElementById(getid);       
        var editButtonIcon="editbuttonicon-"+num;
    
        var edit= document.getElementById(editButtonIcon); 
        edit.textContent="edit";



      console.log(getTable.value);

      window.sem[num].sem_name = getTable.value;

      console.log(window.sem[num]);

        for(i=0;i<window.subject[num].length;i++){
            window.subject[num][i].sem_name = getTable.value;

            console.log(window.subject[getid][i].sem_name);
            
        }

        console.log("Sem name" + window.sem[num].sem_name);
    
    }

}

function editsubject(geteditid){

   openFAB();

    var editElement = document.getElementById(geteditid);

    var fields = geteditid.split('_');
    var name = fields[0];
    var semnum = fields[1];
    var num = fields[2];

    console.log(fields);
    console.log(semnum);
    console.log(num);
    console.log(window.subject[semnum][num-1]);

   
        console.log(document.getElementById(coursenameinput));

         document.getElementById("coursenameinput").value= window.subject[semnum][num-1].course;
         document.getElementById("coursecodeinput").value = window.subject[semnum][num-1].course_code;
         document.getElementById("credithourinput").value = window.subject[semnum][num-1].credit_hour;
  

         var createButtonId = `doneeditsubject('${"variable_"+semnum+"_"+num}');`;
   
var getButton = document.getElementById("donefabbutton");
getButton.setAttribute( "onClick", createButtonId );
    
}

function doneeditsubject(geteditid){

  

    console.log(geteditid)

    var fields = geteditid.split('_');
    var name = fields[0];
    var semnum = fields[1];
    var num = fields[2];

    var getTableId = "table"+semnum;

    var course = document.getElementById("coursenameinput").value;
    var course_code = document.getElementById("coursecodeinput").value;
    var credit_hour = document.getElementById("credithourinput").value;

    console.log(course);
    console.log(course_code);
    console.log(credit_hour);

    console.log(semnum);
    console.log(num);

    console.log(window.subject[semnum][num-1].course);

    window.subject[semnum][num-1].course = course.toString() ;
    window.subject[semnum][num-1].course_code = course_code.toString();
    window.subject[semnum][num-1].credit_hour =  credit_hour.toString() ;

    var as = document.getElementById(getTableId);



    var subjectId = semnum+"_"+num;
    var buttonId = "button"+subjectId;
    var listId = "list"+subjectId; 
    var iconId = "icon"+subjectId;
    var ulId =  "ul"+subjectId;
    var editId =  "edit_"+subjectId;
    var deleteId =  "delete"+subjectId;

    
        var trs = as.getElementsByTagName("tr")[num];

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

              var getButton = document.getElementById("donefabbutton");
                getButton.setAttribute( "onClick", "javascript:getValue();");
    }






