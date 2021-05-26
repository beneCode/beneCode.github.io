class Account
{
    constructor(account_id, name, surename, email, password, isAdmin)
    {
        this.account_id = parseInt(account_id);
        this.name = name;
        this.surename = surename;
        this.email = email;
        this.password = password;

        if(isAdmin == 0)
        {
            this.isAdmin = false;
        }
        else
        {
            this.isAdmin = true;
        }

        localStorage.isLoggedIn = 1;

        saveAccountToJSON(this);

        if(localStorage.isFromIndexPHP == 1)
        {
            localStorage.isFromIndexPHP = 0;
            let mainLink = document.querySelector('#logo-link');
            mainLink.click();
        }
    }
}