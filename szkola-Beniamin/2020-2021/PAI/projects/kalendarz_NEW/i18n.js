const i18n = new Proxy({
	languages: ["pl", "en", "de"],
	language: localStorage.language ?? (localStorage.language = "en"),
	rotate() 
    {
		return localStorage.language = i18n.language = i18n.languages[(i18n.languages.indexOf(i18n.language)+1)%i18n.languages.length]
	},

	updateElements() 
    {
		// i18n for text
		void [...document.querySelectorAll("*[i18n]")].forEach(v => v.innerText = i18n[v.attributes["i18n"].value])
	},

	translations: 
    {
		pl:
        {
			mondayShort: "Pon",
			tuesdayShort: "Wto",
			wednesdayShort: "Śro",
			thursdayShort: "Czw",
			fridayShort: "Pią",
			saturdayShort: "Sob",
			sundayShort: "Nie",

			january: "Styczeń",
			february: "Luty",
			march: "Marzec",
			april: "Kwiecień",
			may: "Maj",
			june: "Czerwiec",
			july: "Lipiec",
			august: "Śierpień",
			september: "Wrzesień",
			october: "Październik",
			november: "Listopad",
			december: "Grudzień",

			save: "Zapisz",
			namePlaceHolder: "Dodaj imię",
			descriptionPlaceHolder: "Dodaj opis",
		},
		en: 
        {
			mondayShort: "Mon",
			tuesdayShort: "Tue",
			wednesdayShort: "Wed",
			thursdayShort: "Thu",
			fridayShort: "Fri",
			saturdayShort: "Sat",
			sundayShort: "Sun",

			january: "January",
			february: "February",
			march: "March",
			april: "April",
			may: "May",
			june: "June",
			july: "July",
			august: "August",
			september: "September",
			october: "October",
			november: "November",
			december: "December",

            save: "Save",
			namePlaceHolder: "Add name",
			descriptionPlaceHolder: "Add description",
		},
        de: 
        {
			mondayShort: "Mon",
			tuesdayShort: "Die",
			wednesdayShort: "Mit",
			thursdayShort: "Don",
			fridayShort: "Fre",
			saturdayShort: "Sam",
			sundayShort: "Son",

			january: "Januar",
			february: "Februar",
			march: "März",
			april: "April",
			may: "Mai",
			june: "Juni",
			july: "Juli",
			august: "August",
			september: "September",
			october: "Oktober",
			november: "November",
			december: "Dezember",

            save: "Speichern",
			namePlaceHolder: "Name hinzufügen",
			descriptionPlaceHolder: "Füge eine Beschreibung hinzu",
		}
	}
}, {
	get(target, p) {
		if (p in target) {
			return Reflect.get(...arguments)
		}
		return target.translations[target.language][p]
	}
})