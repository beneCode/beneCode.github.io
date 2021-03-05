class Calendar
{
    constructor()
    {
        this.date = new Date();

        this.selectedDate = this.date;

        this.months = 
        [
            i18n.january, i18n.february, i18n.march, i18n.april, i18n.may, i18n.june, i18n.july, i18n.august, i18n.september, i18n.october, i18n.november, i18n.december
        ];

        this.days = [i18n.mondayShort, i18n.tuesdayShort, i18n.wednesdayShort, i18n.thursdayShort, i18n.fridayShort, i18n.saturdayShort, i18n.sundayShort];
        
        this.events = [];

        this.lastFocusedDay = this.date.getDate();
        this.focusedElement = this.date.getDate();

        // Language change button
        const lc = document.getElementById("language-change");
        lc.innerText = i18n.language.toUpperCase();
        lc.addEventListener("click", () => {
            i18n.rotate();
            document.getElementById("language-change").innerText = i18n.language.toUpperCase();
            this.rerenderText();
        })

        this.Enter();  
    }

    //called once at the creation of object
    Enter()
    {
        i18n.updateElements();
        this.timeUpdate();
        this.dateUpdate();
        this.printCalendar();
        this.displayEventsOfFocusedDay();
        setInterval(this.Update.bind(this), 100);
    }

    //updates every 100ms
    Update()
    {
        this.timeUpdate();
        this.dateUpdate();
        this.getFocusedDay();
        this.eventsCheck();
    }

    //check if any events are happening right now
    eventsCheck()
    {
        for(let i=0; i<this.events.length; i++)
        {
            if(this.events[i].checkIfEvent(this.date))
            {
                this.events[i].alert();
            }
        }
    }

    //adds event
    addEvent(name, year, month, day, hour, min, sec, description)
    {
        this.events.push(new Event(name, year, month, day, hour, min, sec, description));
        this.displayEventsOfFocusedDay();
    }

    //modifys event
    modifyEvent(name, year, month, day, hour, min, sec, description, id)
    {
        this.events[id].modify(name, year, month, day, hour, min, sec, description);
        this.displayEventsOfFocusedDay();
    }

    //deletes event
    deleteEvent(id)
    {
        this.events.splice(id, 1);
        this.selectedDate.setDate(this.lastFocusedDay);
        this.displayEventsOfFocusedDay();
    }

    //updates time on clock
    timeUpdate()
    {
        this.date = new Date();

        let hour = this.date.getHours();
        let min = this.date.getMinutes();
        let sec = this.date.getSeconds();

        document.getElementById("timer-place").innerHTML = 
        `
            <p id="timer">${ifExtraZero(hour)}${hour}:${ifExtraZero(min)}${min}:${ifExtraZero(sec)}${sec}</p>
        `;
    }

    //updates date on clock
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

    //changes months to the next or previous one
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

        this.printCalendar();
    }

    //prints calendar
    printCalendar()
    {
        console.log(this.selectedDate.getFullYear() + " " + this.selectedDate.getMonth());

        document.getElementById("current-month").innerHTML = `${this.months[this.selectedDate.getMonth()]} ${this.selectedDate.getFullYear()}`;

        document.getElementById("inner-days").innerHTML = ``;

        //prints days from Monday to Sunday
        for(let i=0; i<this.days.length; i++)
        {
            document.getElementById("inner-days").innerHTML += `<div class="day_name">${this.days[i]}</div>`;
        }

        //switches Sundey from the begining to the end
        let temporary = new Date(`${this.months[this.selectedDate.getMonth()]} 1, ${this.selectedDate.getFullYear()} 23:15:30`);
        let n = temporary.getDay();
        if(n == 0)
        {
            n = 7;
        }

        temporary.setMonth(this.selectedDate.getMonth()-1);
        let place = 0;

        //prints last days of previous month
        for(let i=this.getDaysInMonth(temporary.getFullYear(), temporary.getMonth())-n+2; i<=this.getDaysInMonth(temporary.getFullYear(), temporary.getMonth()); i++)
        {
            document.getElementById("inner-days").innerHTML += `<div class="day_last_next_month">${i}</div>`;
            place++;
        }

        //prints all days in current month
        for(let i=1; i<=this.getDaysInMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth()); i++)
        {
            document.getElementById("inner-days").innerHTML += `<div class="day  ${this.date.getDate() == i && this.date.getMonth() == this.selectedDate.getMonth() && this.date.getFullYear() == this.selectedDate.getFullYear() ? "current-day" : ""}" tabindex="1">${i}</div>`;
            place++;
        }

        //prints few days from next month
        for(let i=42-(42-place), j=1; i<42; i++, j++)
        {
            document.getElementById("inner-days").innerHTML += `<div class="day_last_next_month">${j}</div>`;
        }
    }

    //displays all events of focused day
    displayEventsOfFocusedDay()
    {
        document.getElementById("event-display-holder").innerHTML = ``;
        document.getElementById("selected-date-p").innerHTML = `${this.selectedDate.getDate()} ${this.months[this.selectedDate.getMonth()]} ${this.selectedDate.getFullYear()}`;

        for(let i = 0; i < this.events.length; i++) 
        {
            if(this.events[i].checkIfToday(this.selectedDate))
            {
                document.getElementById("event-display-holder").innerHTML +=
                `
                    <div class="event-display">
                        <div class="event-display-name-holder">
                            <div class="event-display-name">${this.events[i].name}</div>
                            <button class="event-display-modify" onclick="openCloseAddEventForm('modify_open', ${i});"><i class="fas fa-pen"></i></button>
                            <button class="event-display-delete" onclick="deleteEvent(${i});"><i class="fas fa-times"></i></button>
                            <br>
                            ${this.events[i].description}
                        </div>
                    </div>
                `;
            }
        }
    }

    //gets focused day
    getFocusedDay()
    {
        const elements = document.getElementsByClassName('day');

        for(let i = 0; i < elements.length; i++) 
        {
            if(elements[i] === document.activeElement)
            {
                this.focusedElement = elements[i].innerHTML;
            }
        }

        if(this.lastFocusedDay != this.focusedElement)
        {
            this.lastFocusedDay = this.focusedElement;
            this.selectedDate.setDate(this.focusedElement);
            this.displayEventsOfFocusedDay();
        }
    }

    //gets day in month 
    getDaysInMonth(year, month) 
    {
        return new Date(year, month+1, 0).getDate();
    }

    updateTables() 
    {
        this.months = 
        [
            i18n.january, i18n.february, i18n.march, i18n.april, i18n.may, i18n.june, i18n.july, i18n.august, i18n.september, i18n.october, i18n.november, i18n.december
        ];

        this.days = [i18n.mondayShort, i18n.tuesdayShort, i18n.wednesdayShort, i18n.thursdayShort, i18n.fridayShort, i18n.saturdayShort, i18n.sundayShort];
	}

    rerenderText() 
    {
        i18n.updateElements();
        this.updateTables();
        this.printCalendar();
        this.displayEventsOfFocusedDay();
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

    //modifys event
    modify(name, year, month, day, hour, min, sec, description)
    {
        this.name = name;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.min = min;
        this.sec = sec;
        this.description = description;
    }

    //checks if event should happen
    checkIfEvent(date)
    {
        if(date.getFullYear() == this.year && date.getMonth() == this.month && date.getDate() == this.day && date.getHours() == this.hour && date.getMinutes() == this.min && date.getSeconds() == this.sec)
        {
            return true;
        }

        return false;
    }

    //checks if event happens in given date
    checkIfToday(date)
    {
        if(date.getFullYear() == this.year && date.getMonth() == this.month && date.getDate() == this.day)
        {
            return true;
        }    

        return false;
    }

    //creats alert of happeninigg event
    alert()
    {
        if(this.beenRead == false)
        {
            document.getElementById("prompt").innerHTML =
            `
                <div id="prompt-text">
                    <span id="prompt-name">${this.name}</span><br>
                    ${this.description}
                </div>
                <button id="close-prompt" onclick="closePrompt()"><i class="fas fa-times"></i></button>
            `
            document.getElementById("prompt").style.display = "block";

            console.log("name: " + this.name + " description: " + this.description);
            this.beenRead = true;
        }
    }
}

let calendar = new Calendar();

function monthUpDown(mode)
{
    calendar.monthUpDown(mode);
}

//checks if should add extra 0
function ifExtraZero(number)
{
    if(number < 10) return "0";
    return "";
}

//closes event alert
function closePrompt()
{
    document.getElementById("prompt").style.display = "none";
}

//opens/closes add event form and modify event form
function openCloseAddEventForm(mode, id=0)
{
    switch (mode) {
        case "close":
            document.getElementById("add-event-form").style.display = "none";
            document.getElementById("modify-event-form").style.display = "none";
            break;
        case "open":
            document.getElementById('date-input').value = "";
            document.getElementById('time-input').value = "";
            document.getElementById('name-input').value = "";
            document.getElementById('description-input').value = "";

            document.getElementById("add-event-form").style.display = "block";
            break;
        case "modify_open":
                document.getElementById('modify-date-input').value = "";
                document.getElementById('modify-time-input').value = "";
                document.getElementById('modify-name-input').value = calendar.events[id].name;
                document.getElementById('modify-description-input').value = calendar.events[id].description;

                document.getElementById("modify-save-event").setAttribute( "onClick", `javascript: openCloseAddEventForm('close'); addModifyEventHandler('modify', ${id});`);
    
                document.getElementById("modify-event-form").style.display = "block";
                break;
        default:
            break;
    }   
}

//feeds in all the values form add event form and creats new event
function addModifyEventHandler(mode, id=0)
{
    let selectedEventDate = new Date(document.getElementById("date-input").value);
    let selectedEventTime = document.getElementById("time-input").value;
    let name = document.getElementById("name-input").value;
    let description = document.getElementById("description-input").value;

    if(mode == "modify")
    {
        selectedEventDate = new Date(document.getElementById("modify-date-input").value);
        selectedEventTime = document.getElementById("modify-time-input").value;
        name = document.getElementById("modify-name-input").value;
        description = document.getElementById("modify-description-input").value;
    }
    
    let yearSelect = selectedEventDate.getFullYear();
    let monthSelect = selectedEventDate.getMonth();
    let daySelect = selectedEventDate.getDate();

    let hourSelect = selectedEventTime.slice(0, 2);
    let minSelect = selectedEventTime.slice(3, 5);
    let secSelect = selectedEventTime.slice(6, 8);
    
    switch (mode) {
        case "add":
            calendar.addEvent(name, yearSelect, monthSelect, daySelect, hourSelect, minSelect, secSelect, description);
            break;
        case "modify":
            calendar.modifyEvent(name, yearSelect, monthSelect, daySelect, hourSelect, minSelect, secSelect, description, id);
            break;
        default:
            break;
    }
}

//deletes event of given id
function deleteEvent(id)
{
    calendar.deleteEvent(id);
}