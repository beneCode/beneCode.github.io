$('#min, #max, #zydCzyNieZydOtoJestPytanie').on('change', function() {
    getValue();
    printResult();
});

var searchTmp = [];
searchTmp = search;

var min;
var max;
var zydCzyNieZydOtoJestPytanie;

getValue();

function printResult() 
{
    document.getElementById("main-holder-grid").innerHTML = "";

    search.forEach(element => {
        if(items[element].price >= min && items[element].price <= max)
        {
            document.getElementById("main-holder-grid").innerHTML += items[element].Print();
        }
    });
}

function itemQuickSort(odkad, dokad) 
{
    let pp=odkad;

    for(i=pp+1; i<=dokad; i++)
    {
        if(items[search[i]].price > items[search[odkad]].price) 
        {
            continue;
        }

        let tmp = search[pp+1];
        search[pp+1] = search[i];
        search[i] = tmp;
        pp++;
    }

    let tmp = search[odkad];
    search[odkad] = search[pp];
    search[pp] = tmp;

    //lewa
    if(odkad < pp-1) itemQuickSort(odkad, pp-1);
    //prawa
    if(pp+1 < dokad) itemQuickSort(pp+1, dokad);
}

function getValue() 
{
    search = searchTmp.slice();

    min = parseInt(document.getElementById("min").value);
    max = parseInt(document.getElementById("max").value);
    zydCzyNieZydOtoJestPytanie = parseInt(document.getElementById("zydCzyNieZydOtoJestPytanie").value);
    
    if(zydCzyNieZydOtoJestPytanie == 1)
    {
        itemQuickSort(0, search.length-1);
    }
    else if(zydCzyNieZydOtoJestPytanie == 2)
    {
        itemQuickSort(0, search.length-1);
        search.reverse();
    }
}

printResult();