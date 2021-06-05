const recomended = document.getElementById("item-recomended-holder");

for(i=1; i<9; i++)
{
    recomended.innerHTML += items[i].Print();
}