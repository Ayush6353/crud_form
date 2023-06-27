var fdata = [];
var Datalist = [];
var I_Index = null;
var Gender;
var transletData;
var checkbox ={}
var checkboxData = [];

// ========================= button click event ================================//

var Bbtn = document.querySelector("#btn");
Bbtn.addEventListener("click", show);
function show(e) {
  e.preventDefault();
  var V_validation = validataion();
  if (V_validation== false){
   return;
  }

  if (I_Index === null) {
    let transletData = fachData();
    Datalist.push(transletData);
    inputData();
    resetData();
  } else {
    UpdateData();
  }

}

//============================ data fach ==================================//

function fachData() {
  fdata = {};

  // Name data
  fdata["F_name"] = document.getElementById("fname").value;
  fdata["M_name"] = document.getElementById("mname").value;
  fdata["L_name"] = document.getElementById("lname").value;
  fdata["C_ountry"] = document.getElementById("country").value;

  // check button
  var checkbox = document.getElementsByName("hobby");
  checkboxData = [];

  for (i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked === true) {
      checkboxData.push(checkbox[i].value);
    }
  }
  fdata["hobby"] = checkboxData;


  // radio buttons
  var gender = document.getElementsByName("gender");
  if (gender[0].checked == true) {
    Gender = gender[0].value;
  } else if (gender[1].checked == true) {
    Gender = gender[1].value;
  }
  fdata["gender"] = Gender;

  return fdata;
}



// =================================== input =============================//
function inputData() {
  document.getElementById("t_table").innerHTML = null;
  Datalist.forEach(function (value, index) {
    var row = "<tr>";
    row += "<td>" + value.F_name + "</td>"
    row = row + "<td>" + value.M_name + "</td>"
    row = row + "<td>" + value.L_name + "</td>"
    row = row + "<td>" + value.C_ountry + "</td>"
    row = row + "<td>" + value.hobby + "</td>"
    row = row + "<td>" + value.gender + "</td>"
    row =row +"<td>" +"<button onclick = 'editData("+index+")'>edit</button>"+"  "+"<button onclick = 'deleteData(" +index+")'>delete</button>" 
      row = row + "</tr>"

    document.getElementById("t_table").innerHTML += row;
  });
}


// =============================== reset Data =============================//
function resetData() {
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("mname").value = "";
  document.getElementById("country").value = "";

  document.getElementById("gridRadios1").checked = null;
  document.getElementById("gridRadios2").checked = null;

  document.getElementById("football").checked = null;
  document.getElementById("wallyball").checked = null;
  document.getElementById("chess").checked = null;
  document.getElementById("basketball").checked = null;
}





// ================================ edit Data ===============================//
function editData(index) {
  document.getElementById("fname").value = Datalist[index].F_name;
  document.getElementById("mname").value = Datalist[index].M_name;
  document.getElementById("lname").value = Datalist[index].L_name;
  document.getElementById("country").value = Datalist[index].C_ountry;

  Datalist[index].hobby.forEach(value => {
    document.getElementById(value).checked = true;
  });

  if (Datalist[index].gender == "Male") {
    document.getElementById("gridRadios1").checked = true;
  }
  if (Datalist[index].gender == "Female") {
    document.getElementById("gridRadios2").checked = true;
  }

  I_Index = index;
}



// ================================ Update Data ===============================//
function UpdateData() {
  Datalist[I_Index].F_name = document.getElementById("fname").value;
  Datalist[I_Index].M_name = document.getElementById("mname").value;
  Datalist[I_Index].L_name = document.getElementById("lname").value;
  Datalist[I_Index].C_ountry = document.getElementById("country").value;

  var checkbox = document.getElementsByName("hobby");
  var checkboxData;
  checkboxData = [];

  for (i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked === true) {
      checkboxData.push(checkbox[i].value);
    }
  }
  Datalist[I_Index].hobby = checkboxData;

  var gender = document.getElementsByName("gender");
  if (gender[0].checked == true) {
    Gender = gender[0].value;
  } 
 else if (gender[1].checked == true) {
    Gender = gender[1].value;
  }

  Datalist[I_Index].gender = Gender;

  I_Index = null;
  inputData();
  resetData();
}




// ================================ Delete Data ===============================//
function deleteData(index) {
   inputData()
   Datalist.splice(index,1)
}  

//================================ search Data =============================//

var sbtn = document.querySelector("#Search_btn");
sbtn.addEventListener("click", searchData);
function searchData(a){
a.preventDefault();
  let Search_input = document.getElementById('s_search').value.toUpperCase();
    console.log(Search_input);
    let mytable = document.getElementById('t_table');
    let tr = mytable.getElementsByTagName('tr');
    console.log(tr);
   
    for(var i=0; i<tr.length; i++){
      let td = tr[i].getElementsByTagName('td')[0];
      console.log(td);
      if(td){
        let textvalue = td.textContent || td.innerHTML;
        if(textvalue.toUpperCase().indexOf(Search_input)> -1){
              tr[i].style.display = "";
        }else{
          tr[i].style.display = "none";
        }
      }
    }

}


// ================================ validataion Data ===============================//
function validataion(){
   var F_name = document.getElementById("fname").value;
   var M_name = document.getElementById("mname").value;
   var L_name = document.getElementById("lname").value;
   var C_ountry = document.getElementById("country").value;


   
   if(F_name == ""){
      document.getElementById("V_fname").innerHTML= "**Plese enter your firstname"
   }else{
      document.getElementById("V_fname").innerHTML ="";
    }

   if(M_name == ""){
      document.getElementById("V_mname").innerHTML= "**Plese enter your middalname"
   }else{
      document.getElementById("V_mname").innerHTML ="";
    }

   if(L_name == ""){
      document.getElementById("V_lname").innerHTML= "**Plese enter your lastname"
   }else{
      document.getElementById("V_lname").innerHTML ="";
    }

   if(C_ountry == ""){
      document.getElementById("V_country").innerHTML= "**Plese select your any country"
   }else{
      document.getElementById("V_country").innerHTML ="";
    }

   var Gender = document.getElementsByName("gender");

    if(Gender[0].checked == false && Gender[1].checked == false){
      document.getElementById("V_gender").innerHTML= "**Plese select your any country"
    }else{
      document.getElementById("V_gender").innerHTML ="";
    }


  
   if(!F_name || !M_name || !C_ountry || !L_name){
      return false;
   }

}
