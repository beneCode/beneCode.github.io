var isLoggedIn = localStorage.isLoggedIn ?? (localStorage.isLoggedIn = 0);

var account;

function saveAccountToJSON(account) 
{
    let acc =
    {
        account_id: account.account_id,
        name: account.name,
        surename: account.surename,
        email: account.email,
        password: account.password,
        isAdmin: account.isAdmin,
    }

    let accJSON = JSON.stringify(acc);

    localStorage.accountInfo = accJSON;
}

function parseJSONToAccount() 
{
    let acc = JSON.parse(localStorage.accountInfo);

    account = new Account(acc.account_id, acc.name, acc.surename, acc.email, acc.password, acc.isAdmin);
}

if(isLoggedIn == 1)
{ 
    parseJSONToAccount();
}