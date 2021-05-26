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

        localStorage.isLoggedIn = true;

        saveAccountToJSON(this);
    }
}