document.getElementById('submit').addEventListener('click', ()=> {
    let passwordItem = document.getElementsByName('password')[0];
    let confirm_passwordItem = document.getElementsByName('confirm_password')[0];

    if(passwordItem.value != confirm_passwordItem.value)
    {
        alert("hasła się nie zgadzają");

        passwordItem.value="";
        confirm_passwordItem.value="";
    }
});