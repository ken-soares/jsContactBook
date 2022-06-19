/*
 * this is of course inspired by the Todo-List program also available on my
 * github at the address: https://github.com/ken-soares/jsTodoList
 * I made this when I had no wifi and nothing else to do ;-; 
 * also, no access to documentation so this code might burn your eyes...
 */


let inputName = document.querySelector("#name-input");
let inputNumber = document.querySelector("#number-input");
let contactList = document.querySelector(".contacts")

/*
 * DEBUG NOTE FOR MYSELF: 
 * inputName and inputNumber have to be input fields (and not strings)
 * in order for the function below to work
 */

let createContact = (inputName, inputNumber, contactList) =>{
	const contact = document.createElement("div");
	contact.classList.add("contact");
	const contactName = document.createElement("input");
	contactName.classList.add("text");
	contactName.type = "text";
	contactName.value = inputName.value;

	contactName.setAttribute("id", "con-name");
	contactName.setAttribute("readonly", "readonly");

	const contactNumber = document.createElement("input");
	contactNumber.classList.add("text");
	contactNumber.type = "text";
	contactNumber.value = inputNumber.value;
	contactName.setAttribute("id", "con-number");
	contactNumber.setAttribute("readonly", "readonly");

	contact.appendChild(contactName);
	contact.appendChild(contactNumber);

	const contactEdit = document.createElement("button");
	contactEdit.classList.add("edit");
	contactEdit.innerHTML = "Edit"
	
	const contactDelete = document.createElement("button");
	contactDelete.classList.add("delete");
	contactDelete.innerHTML = "Delete";

	contact.appendChild(contactEdit);
	contact.appendChild(contactDelete);

	inputName.value = ""
	inputNumber.value = ""

	localStorage.setItem(contactName.value, contactNumber.value);

	contactList.appendChild(contact);

	contactEdit.addEventListener('click', ()=>{
		if(contactEdit.innerHTML.toLowerCase() == "edit"){

			localStorage.removeItem(contactName.value);

			contactEdit.innerHTML = "Save";
			contactName.removeAttribute("readonly");
			contactNumber.removeAttribute("readonly");
		}else{

			localStorage.setItem(contactName.value,contactNumber.value);

			contactEdit.innerHTML = "Edit";
			contactName.setAttribute("readonly", "readonly");
			contactNumber.setAttribute("readonly", "readonly");
		}

	});

	contactDelete.addEventListener('click', () =>{
		contactList.removeChild(contact);

		localStorage.removeItem(contactName.value);

	});

}

// wasted hours count: 4 
// update: it works now!
for(let i = 0; i < localStorage.length; i++){
	let contactName = localStorage.key(i);
	let contactNumber = localStorage.getItem(contactName);
	
	inputName.value = contactName;
	inputNumber.value = contactNumber;

	createContact(inputName,inputNumber,contactList);
}

window.addEventListener('submit', (e) =>{
	e.preventDefault();	
	console.log("form submitted");
	if(!inputName.value || !inputNumber.value){
		alert("Please fill out all the fields before submitting");
		return;
	}
	createContact(inputName,inputNumber,contactList);
});
