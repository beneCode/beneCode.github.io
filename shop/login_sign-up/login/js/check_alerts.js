localStorage.zly_email=false;
localStorage.zly_haslo=false;

if(localStorage.zly_email==true)
{
    alert('zły email');
    localStorage.zly_email=false;
}

if(localStorage.zly_haslo==true)
{
    alert('złe hasło');
    localStorage.zly_haslo=false;
}