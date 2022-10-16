//Enter Name button
const btnName = document.getElementById('btn-name');

//Agent Name input field
const nameInput = document.querySelector('.input-name');

//Enter Name Div
const nameForm = document.querySelector('.enter-name');

//Reply fields Div
const replyFields = document.querySelector('.reply-fields');

//"Add Reply" Button
const btnEnter = document.getElementById('btn-enter');

//H1 element
const header = document.getElementById('header-text');

//Ticket Number field
const ticketInput = document.querySelector('.input-ticket');

//Note field
const noteInput = document.querySelector('.input-note');

//table Element
const table = document.querySelector('table');

//table body Element
const list = document.querySelector('tbody');

//table row element
const tableRow = document.querySelector('tr');

//Delete button for each row
const deleteBtn = document.querySelector('.hide');

const deleteColumn = document.querySelector('.delete-column');



// Set first reply to 1 
let replyNumber = 0;

const today = new Date().toLocaleDateString( {year: "numeric", month: "2-digit", day: "2-digit"})



function hideName(){
  //Hide Enter Name Div
  nameForm.style.display = "none";
}

function showTracker(){
  //Show Reply fields div
  replyFields.style.display = "block";
}

function addGreeting(){
  header.insertAdjacentHTML(
    'afterend', 
    `<h2>Hello, ${nameInput.value}! Today's date is ${today}.</h2>
    <br>
    <h3 id="counterDisplay"> Reply count: ${replyNumber}</h3>`);
}

function saveName(){
  if(nameInput.value == "") {
    // ALert user to enter data into field.  
    alert("Please enter your name.")
    return;
  } else {
    //Save Agent Name input as a Cookie
    document.cookie = `name=${nameInput.value}; expires=Sun, 31 Dec 2099 12:00:00 UTC;`;
    hideName();
    showTracker();
    addGreeting();
  }  
};

//Show user input as a table entry 
function showInput(){
  list.insertAdjacentHTML(
      'beforeend',
      `<tr id="row${replyNumber}">
        <td><input type="checkbox" class="select"></td>
        <td>${ticketInput.value}</td>
        <td>${noteInput.value}</td>
      </tr>`
        )
   replyNumber++
   document.getElementById('counterDisplay').innerHTML=`<h3 id="counterDisplay"> Reply count: ${replyNumber}</h3>`;
   ticketInput.value = '';
   noteInput.value = '';
};

function deleteRow() {
  document.querySelectorAll('table .select:checked').forEach(e => {
    e.parentNode.parentNode.remove()
    replyNumber--
  document.getElementById('counterDisplay').innerHTML=`<h3 id="counterDisplay"> Reply count: ${replyNumber}</h3>`;
  });
}

function deleteReply(e) {
  if (!e.target.classList.contains('deleteBtn')){
    return;
  }

  const btn = e.target;
  btn.closest('tr').remove();
  replyNumber--
  document.getElementById('counterDisplay').innerHTML=`<h3 id="counterDisplay"> Reply count: ${replyNumber}</h3>`;
}

btnName.addEventListener('click', () => {
  saveName();
  
});

btnEnter.addEventListener('click', () => {
  if (isNaN(ticketInput.value)) {
    alert("Please enter a Ticket number.");
  } else {
    showInput();
  }
});


table.addEventListener('click', deleteReply);

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}