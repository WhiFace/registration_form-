
// This is a simple form validator using vanilla javascript, css and html.


// get all of the element we want to manipulate
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');



// Validate email format 
const checkEmail = (input) =>{
    const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(re.test(input.value.trim())){
        showSuccess(input);
    }else{
        showError(input, 'Email is not valid');
    }
}

//Check length for username and password
const checkLength = (input, min, max) => {

    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else{
        showSuccess(input);
    }

}

// check fields: 
const checkRequired = (inputArr) =>{
    // loop through the array to get each input from the array in the event listener 
    inputArr.forEach((input) =>{
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}


// What do we want to happen when the conditions are met 
// Show error 
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success 
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


//Get Field names and convert first letter to uppercase
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check if password matches

const checkPasswordMatch = (p1, p2) => {

    if(p1.value === p2.value){
        showSuccess(p2);
    }else{
        showError(p2, `${getFieldName(p2)} does not match`);
    }
}

// Event Listeners: listens if form has been submitted. 
form.addEventListener('submit', (e)=> {
    e.preventDefault(); //prevents form from auto submitting


    const inputs  = [username, email, password, password2] //create an array for all of the inputs so we can loop over them.


    checkRequired(inputs);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
    

})