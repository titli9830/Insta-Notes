let a = [];



// Retrieving data on page load:
function onPageLoad() {
  let text1 = window.localStorage.getItem("testJSON1");
  let varStringToJSON = JSON.parse(text1);

  console.log(text1);
  if (varStringToJSON && varStringToJSON.length) {
    a = varStringToJSON;
  } else {
    // a = [];
  }

  let varResultHTML = convertToHTML(a);
  getElement("d1").innerHTML = varResultHTML;

}

// On clicks anywhere outside of the modal, close it
function onClickOutsideModal() {

  window.onclick = function (event) {
    if (event.target == getElement("dm")) {

      //clear input box
      getElement("im1").value = "";
      getElement("im2").value = "";

      //close modal
      getElement("dm").style.display = "none";
    }
  }
}

//storing data
function storeDataInLocalStorage() {
  let varJSONtoString = JSON.stringify(a);
  window.localStorage.setItem("testJSON1", varJSONtoString);
}

function getNoteTitleHtmlString(title) {
  return "<div class='Note-Title'>" + title + "</div>"
}

function getNoteDescHtmlString(desc) {
  return "<div class='Note-Description' contenteditable>" + desc + "</div>";
}

function deleteNoteHtmlString(index) {
  return "<button id='btnDeleteNote-" + index + "' class='btnDeleteNote' onclick='onClickDeleteNote()'><i class='fas fa-trash-alt'></i> Remove</button>";
}

function editNoteHtmlString(index) {
  return "<button id='btnSaveNote-" + index + "' class='btnEditNote' onclick='onClickSaveNote()'><i class='fas fa-redo-alt'></i> Save</button>";
}


function getNoteHtmlString(title, desc, index) {
  let noteHtmlString = "<div id='note-" + index + "' class='Note'>" + getNoteTitleHtmlString(title) + getNoteDescHtmlString(desc) + "<div class=noteDeleteEdit>" + deleteNoteHtmlString(index) + editNoteHtmlString(index) + "</div></div>";
  return noteHtmlString;
}


function onClickDeleteNote() {
  let selectedDeleteNoteID = event.target.id;
  let index = selectedDeleteNoteID.substring(14);
  console.log(a);
  a.splice(index, 1);
  console.log(index)
  console.log(a);

  //refresh page and reconstruct HTML with new array after delete
  let n = convertToHTML(a);
  getElement("d1").innerHTML = n;
  storeDataInLocalStorage();
}

function onClickSaveNote() {
  let selectedSaveNoteID = event.target.id;
  let index = selectedSaveNoteID.substring(12);
  let parentDivID = 'note-' + index;
  console.log(a[index]);
  let newDescription = document.querySelector('#' + parentDivID + ' .Note-Description').innerText;
  console.log(newDescription);
  a[index].description = newDescription;

  //refresh page and reconstruct HTML with new array after delete
  let n = convertToHTML(a);
  getElement("d1").innerHTML = n;
  storeDataInLocalStorage();
}



//create the Notes in HTML
function convertToHTML(arr) {
  let text;
  text = "<div class='Notes'>";
  arr.forEach((value, index) => {
    text += getNoteHtmlString(value.title, value.description, index)
  });

  text += "</div>";
  text += "<br>";
  return text;
}

//Create Notes by mapping Input from Modal
function createNote() {
  var text;
  let varInputTitle = getElement("im1").value;
  let varInputDescription = getElement("im2").value;
  console.log(varInputTitle);


  a.push({
    title: varInputTitle,
    description: varInputDescription
  })
  let htmlresult = convertToHTML(a);
  getElement("d1").innerHTML = htmlresult;

  storeDataInLocalStorage();

  //reset Input box
  getElement("im1").value = "";
  getElement("im2").value = "";
  getElement("dm").style.display = "none";
}

//Reusable "document.getElementByID" function
function getElement(xxx) {
  return document.getElementById(xxx);
}
//Open MODAL(Input Box)
function inputNewNote() {
  getElement("dm").style.display = "Flex";
  //getElementByTagName("BODY").style.filter="blur(8px)" ;
  //getElementByTagName("BODY").style.-webkit-filter="blur(8px)" ;
}

//Click on close button to close the MODAL(Input Box)
function closeModal() {
  getElement("dm").style.display = "none";

}



onPageLoad();
onClickOutsideModal();