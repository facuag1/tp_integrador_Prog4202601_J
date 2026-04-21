const form= document.getElementById("form");
const user= document.getElementById("user");
const password= document.getElementById("password");
const message= document.getElementById("message");

form.addEventListener("submit", (e) =>{
    e.preventDefault();
   
    const userValue = user.value.trim();
    const passwordValue = password.value.trim();

    console.log(userValue);
    console.log(passwordValue);

});