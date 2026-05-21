let nameInput = document.querySelector(".form .name input");
let nameDisplay = document.querySelector(".display .details .name")

let emailInput = document.querySelector(".form .email input");
let emailDisplay = document.querySelector(".display .details .email")

let ageInput = document.querySelector(".form .age input");
let ageDisplay = document.querySelector(".display .details .age")

let passInput = document.querySelector(".form .password input");
let actionsDisplay = document.querySelector(".display .details .actions")

let entries = document.querySelector(".display .saved-registries .no-of-entries")

let profiles = JSON.parse(localStorage.getItem("profiles")) || [];

profiles.forEach(element => {
    let oldName = document.createElement("div");
    oldName.innerHTML = element.name;
    nameDisplay.append(oldName);

    let oldEmail = document.createElement("div");
    oldEmail.innerHTML = element.email;
    emailDisplay.append(oldEmail);

    let oldAge = document.createElement("div");
    oldAge.innerHTML = element.age;
    ageDisplay.append(oldAge);

    let oldActions = document.createElement("div");
    actionsDisplay.append(oldActions);
    let oldEdit = document.createElement("span");
    oldEdit.innerHTML = "Edit";
    oldActions.append(oldEdit);
    oldEdit.className = "edit"
    let oldDelete = document.createElement("span");
    oldDelete.innerHTML = " Delete";
    oldActions.append(oldDelete);
    oldDelete.className = "delete"
});
function saveToLocalStorage(e) {
    e.preventDefault();
    if (nameInput.value == "" || emailInput.value == "" || ageInput.value == "" || passInput.value == "") {
        alert("Please fill all the details...");
        return;
    }

    let newRegistry = {
        name: nameInput.value,
        email: emailInput.value,
        age: ageInput.value,
        pass: passInput.value
    };
    profiles.push(newRegistry);
    localStorage.setItem("profiles", JSON.stringify(profiles));

    let newName = document.createElement("div");
    newName.innerHTML = newRegistry.name;
    nameDisplay.append(newName);

    let newEmail = document.createElement("div");
    newEmail.innerHTML = newRegistry.email;
    emailDisplay.append(newEmail);

    let newAge = document.createElement("div");
    newAge.innerHTML = newRegistry.age;
    ageDisplay.append(newAge);

    let newAction = document.createElement("div");
    actionsDisplay.append(newAction);
    let newEdit = document.createElement("span");
    newEdit.innerHTML = "Edit";
    newAction.append(newEdit);
    newEdit.className = "edit"
    let newDelete = document.createElement("span");
    newDelete.innerHTML = "  Delete"
    newAction.append(newDelete);
    newDelete.className = "delete"

    nameInput.value = "";
    emailInput.value = "";
    ageInput.value = "";
    passInput.value = "";

    let no_of_entries = profiles.length;
    entries.innerHTML = no_of_entries + " entries";
}

let no_of_entries = 0;
no_of_entries = profiles.length;
entries.innerHTML = no_of_entries + " entries";

let saveBtn = document.querySelector(".form .save-button");
saveBtn.addEventListener("click", saveToLocalStorage);

let action = "";
let actionIndex = -1
actionsDisplay.addEventListener("click", (e) => {
    if (e.target.matches(".edit") || e.target.matches(".delete")) {
        let actionDiv = e.target.parentElement;
        actionIndex = Array.from(actionsDisplay.children).indexOf(actionDiv) - 1;
        if (e.target.matches(".edit")) {
            action = "edit";
        }
        else {
            action = "delete";
        }
        document.querySelector("#typed-pass").value = "";
        document.querySelector(".pass-popup").style.display = "flex";
    }
})

let cancel_pass_btn = document.querySelector(".cancel-pass-btn");
cancel_pass_btn.addEventListener("click", () => {
    document.querySelector(".pass-popup").style.display = "none";
});

let submit_pass_btn = document.querySelector(".submit-pass-btn");
function checkPassword() {
    let correctPass = profiles[actionIndex].pass;
    let typedPass = document.querySelector("#typed-pass").value;
    if (correctPass === typedPass) {
        document.querySelector(".pass-popup").style.display = "none";
        if (action == "edit") {
            nameInput.value = profiles[actionIndex].name;
            emailInput.value = profiles[actionIndex].email;
            ageInput.value = profiles[actionIndex].age;
            passInput.value = profiles[actionIndex].pass;

            profiles.splice(actionIndex,1);
            localStorage.setItem("profiles", JSON.stringify(profiles));
            nameDisplay.children[actionIndex+1].remove();
            emailDisplay.children[actionIndex+1].remove();
            ageDisplay.children[actionIndex+1].remove();
            actionsDisplay.children[actionIndex+1].remove();
        }
        else {
            profiles.splice(actionIndex,1);
            localStorage.setItem("profiles", JSON.stringify(profiles));
            nameDisplay.children[actionIndex+1].remove();
            emailDisplay.children[actionIndex+1].remove();
            ageDisplay.children[actionIndex+1].remove();
            actionsDisplay.children[actionIndex+1].remove();
        }
    }
    else {
        alert("Incorrect Password. Access Denied.");
        document.querySelector(".pass-popup").style.display = "none";
    }
    no_of_entries = profiles.length;
    entries.innerHTML = no_of_entries + " entries";
}
submit_pass_btn.addEventListener("click", () => {
    checkPassword();
})