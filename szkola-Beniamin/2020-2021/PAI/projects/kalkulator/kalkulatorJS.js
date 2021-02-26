let value = "";
let mark = "";
let outcome = 0;
var t =[];
t.push(new Array);
var row = 0;

//downloads value form site
function loadValue(input = "")
{
    if(input == "15")
    {
        t.length = 0;
        t.push(new Array);
        outcome = 0;
        row = 0;
        value = "";
        input = "";
        document.getElementById("outcome").innerHTML = outcome;
        disPlayArray();
    }
    else if(input == "16")
    {
        if(t[0].length != 0)
        {
            t[0].slice(0, t[0].length-1);
        }

        value = "";
        input = "";
    }
    else if(input == "17" || input == "18" || input == "19" || input == "20" || input == "21" || input == "22")
    {
        transferValue(value, input);
        value = "";
        input = "";
    }
    else if(input == "23")
    {
        input = ".";
    }
    
    value+=input;
    let operation = "";
    for(j = 0; j<t[0].length; j++)
    {
        operation += t[0][j] + " ";
    }

    document.getElementById("operation").innerHTML = operation;
    document.getElementById("value").innerHTML = value;
}

//loads value into array
function transferValue(val, inp)
{
    if(val != "" || val != " " && inp != "22")
    {
        t[0].push(val);
        loadMark(inp);
    }
}

//loads mark into array
function loadMark(input = "")
{
    switch (parseInt(input))
    {
        case 17:
            mark = "+";
            t[0].push(mark);
            break;

        case 18:
            mark = "-";
            t[0].push(mark);
            break;

        case 19:
            mark = "*";
            t[0].push(mark);
            break;

        case 20:
            mark = "/";
            t[0].push(mark);
            break;

        case 21:
            mark = "^";
            t[0].push(mark);
            break;
            
        default:
            break;
    }
}

//display outcome
function outCome()
{
    outcome = t[t.length-1][0];
    console.log("wynik: " + outcome);
    document.getElementById("outcome").innerHTML = outcome;
}

//display array in html
function disPlayArray()
{
    var table = '';
    for(i = 0; i<t.length; i++)
    {
        table += '<tr class="calculator_table_table">';
        for(j = 0; j<t[i].length; j++)
        {
            table+= '<td class="calculator_table_td">' + t[i][j] + '</td>';
        }
        table+= '</tr>';
    }
    document.getElementById("calculator_table").innerHTML = '<table class="calculator_table_tr">' + table + '</table>';
}

//calculates
function calculate()
{
    if(t[t.length-1].length <= 1)
    {
        return outCome();
    }

    let result = 0;

    let nextAction = findNextAction(row);

    let a = t[row][t[row].indexOf(nextAction)-1];
    let b = t[row][t[row].indexOf(nextAction)+1];
    
    switch (nextAction) 
    {
        case "+":  
            result = add(parseFloat(a), parseFloat(b));
            break;

        case "-":
            result = subtract(parseFloat(a), parseFloat(b));
            break;

        case "*":
            result = multiply(parseFloat(a), parseFloat(b));
            break;

        case "/":
            result = divide(parseFloat(a), parseFloat(b));
            break;

        case "^":
            result = power(parseFloat(a), parseFloat(b));
            break;                      
    
        default:
            break;
    }

    let left = [];
    let right = [];
    left = left.length = 0;
    right = right.length = 0;

    left = t[row].slice(0, t[row].indexOf(nextAction)-1);
    right = t[row].slice(t[row].indexOf(nextAction)+2, t[row].length);

    let nextT = [];
    nextT = nextT.length = 0;

    nextT = left.concat(result.toString(), right);

    t.push(nextT);
    row++;
 
    calculate();
}

//find next atcion
function findNextAction(row)
{
    if(t[row].indexOf("^") != -1)
    {
        return "^";
    }
    else if(t[row].indexOf("*") != -1 || t[row].indexOf("/") != -1)
    {
        if(t[row].indexOf("*") == -1)
        {
            return "/";
        }
        else if(t[row].indexOf("/") == -1)
        {
            return "*";
        }
        else
        {
            if(t[row].indexOf("/") < t[row].indexOf("*"))
            {
                return "/";
            }
            else
            {
                return "*";
            }
        }
    }
    else if(t[row].indexOf("+") != -1 || t[row].indexOf("-") != -1)
    {
        if(t[row].indexOf("+") == -1)
        {
            return "-";
        }
        else if(t[row].indexOf("-") == -1)
        {
            return "+";
        }
        else
        {
            if(t[row].indexOf("-") < t[row].indexOf("+"))
            {
                return "-";
            }
            else
            {
                return "+";
            }
        }
    }
}

function add(a, b)
{
    return a+b;
}

function subtract(a, b)
{
    return a-b;
}

function multiply(a, b)
{
    return a*b;
}

function divide(a, b)
{
    return a/b;
}

function power(a, b)
{
    return Math.pow(a, b);
}