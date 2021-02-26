class Calendar
{
    constructor()
    {
        this.date = new Date();

        this.selectedDate = this.date;

        this.months = 
        [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];

        this.days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        this.events = [];

        this.Enter();
        this.printKalender()
    }

    Enter()
    {
        this.timeUpdate();
        this.dateUpdate();
        setInterval(this.Update.bind(this), 500);
    }

    Update()
    {
        this.timeUpdate();
        this.dateUpdate();

        for(let i=0; i<this.events.length; i++)
        {
            if(this.events[i].checkIfEvent(this.date))
            {
                this.events[i].alert();
            }
        }
    }

    addEvent(name, year, month, day, hour, min, sec, description)
    {
        this.events.push(new Event(name, year, month, day, hour, min, sec, description));
    }

    timeUpdate()
    {
        this.date = new Date();

        let hour = this.date.getHours();
        let min = this.date.getMinutes();
        let sec = this.date.getSeconds();

        let extraZeroSec = "";
        let extraZeroMin = "";
        let extraZeroHour = "";

        if(sec < 10)
        {
            extraZeroSec = "0";
        }

        if(min < 10)
        {
            extraZeroMin = "0";
        }

        if(hour < 10)
        {
            extraZeroHour = "0";
        }

        document.getElementById("timer-place").innerHTML = 
        `
            <p id="timer">${extraZeroHour}${hour}:${extraZeroMin}${min}:${extraZeroSec}${sec}</p>
        `;

        extraZeroSec = "";
        extraZeroMin = "";
        extraZeroHour = "";
    }

    dateUpdate()
    {
        this.date = new Date();

        let day = this.date.getDate();
        let month = this.date.getMonth();
        let year = this.date.getFullYear();

        document.getElementById("date-place").innerHTML = 
        `
            <p id="date">${day} ${this.months[month]} ${year}</p>
        `;
    }

    monthUpDown(mode)
    {
        switch (mode) {
            case "up":
                this.selectedDate.setMonth(this.selectedDate.getMonth()+1);
                break;
            case "down":
                this.selectedDate.setMonth(this.selectedDate.getMonth()-1);
                break;
            default:
                break;
        }

        this.printKalender();
    }

    printKalender()
    {
        console.log(this.selectedDate.getFullYear() + " " + this.selectedDate.getMonth());

        document.getElementById("current-month").innerHTML = `${this.months[this.selectedDate.getMonth()]} ${this.selectedDate.getFullYear()}`;

        document.getElementById("inner-days").innerHTML = ``;

        for(let i=0; i<this.days.length; i++)
        {
            document.getElementById("inner-days").innerHTML += `<div>${this.days[i]}</div>`;
        }

        let temporary = new Date(`${this.months[this.selectedDate.getMonth()]} 1, ${this.selectedDate.getFullYear()} 23:15:30`);
        let n = temporary.getDay();
        if(n == 0)
        {
            n = 7;
        }

        temporary.setMonth(this.selectedDate.getMonth()-1);
        let place = 0;

        for(let i=this.getDaysInMonth(temporary.getFullYear(), temporary.getMonth())-n+2; i<=this.getDaysInMonth(temporary.getFullYear(), temporary.getMonth()); i++)
        {
            document.getElementById("inner-days").innerHTML += `<div class="day_last_next_month">${i}</div>`;
            place++;
        }

        for(let i=1; i<=this.getDaysInMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth()); i++)
        {
            document.getElementById("inner-days").innerHTML += `<div class="day  ${this.date.getDate() == i && this.date.getMonth() == this.selectedDate.getMonth() && this.date.getFullYear() == this.selectedDate.getFullYear() ? "current-day" : ""}" tabindex="1">${i}</div>`;
            place++;
        }

        for(let i=42-(42-place), j=1; i<42; i++, j++)
        {
            document.getElementById("inner-days").innerHTML += `<div class="day_last_next_month">${j}</div>`;
        }
    }

    getDaysInMonth(year, month) 
    {
        return new Date(year, month+1, 0).getDate();
    }
}

class Event
{
    constructor(name, year, month, day, hour, min, sec, description)
    {
        this.name = name;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.min = min;
        this.sec = sec;
        this.description = description;

        this.beenRead = false;
    }

    checkIfEvent(date)
    {
        if(date.getFullYear() == this.year && date.getMonth() == this.month && date.getDate() == this.day && date.getHours() == this.hour && date.getMinutes() == this.min && date.getSeconds() == this.sec)
        {
            return true;
        }

        return false;
    }

    alert()
    {
        if(this.beenRead == false)
        {
            document.getElementById("prompt").innerHTML =
            `
                ${this.name}<br>
                ${this.description}
                <button id="close" onclick="closePrompt()">X</button>
            `
            document.getElementById("prompt").style.display = "block";

            console.log("name: " + this.name + " description: " + this.description);
            this.beenRead = true;
        }
    }
}

let calendar = new Calendar();
var isOpenned = false;

calendar.addEvent("event1", 2021, 1, 26, 14, 42, 30, "cos tam moldo");
calendar.addEvent("event2", 2021, 1, 24, 14, 37, 40, "cos tam moldo 2");

function openKalender()
{
    if(isOpenned)
    {
        isOpenned  = false;
        document.getElementById("kalender").style.display = "none";
    }
    else
    {
        isOpenned  = true;
        document.getElementById("kalender").style.display = "block";
    }
}

openKalender();

function monthUpDown(mode)
{
    calendar.monthUpDown(mode);
}

function closePrompt()
{
    document.getElementById("prompt").style.display = "none";
}

