(function() {
  "use strict";

  var app = {
    isLoading: true,
    visibleCards: {},
    selectedTimetables: [],
    spinner: document.querySelector(".loader"),
    cardTemplate: document.querySelector(".cardTemplate"),
    container: document.querySelector(".main"),
    addDialog: document.querySelector(".dialog-container")
  };
  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/
 var db = new PouchDB("dbnamedaya");
  document.getElementById("butRefresh").addEventListener("click", function() {
    // Refresh all of the metro stations
    app.updateSchedules();
  });

  document.getElementById("butAdd").addEventListener("click", function() {
    // Open/show the add new station dialog
    app.toggleAddDialog(true);
  });

  document.getElementById("butAddCity").addEventListener("click", function() {
    var select = document.getElementById("selectTimetableToAdd");
    var selected = select.options[select.selectedIndex];
    var key = selected.value;
    var label = selected.textContent;
    if (!app.selectedTimetables) {
      app.selectedTimetables = [];
    }
    app.getSchedule(key, label);
    app.selectedTimetables.push({ key: key, label: label });
    app.toggleAddDialog(false);
  });

  document.getElementById("butAddCancel").addEventListener("click", function() {
    // Close the add new station dialog
    app.toggleAddDialog(false);
  });

  /*****************************************************************************
   *
   * Methods to update/refresh the UI
   *
   ****************************************************************************/

  // Toggles the visibility of the add new station dialog.
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add("dialog-container--visible");
    } else {
      app.addDialog.classList.remove("dialog-container--visible");
    }
  };

  // Updates a timestation card with the latest weather forecast. If the card
  // doesn't already exist, it's cloned from the template.

  app.updateTimetableCard = function(data) {
    var key = data.key;
    var dataLastUpdated = new Date(data.created);
    var schedules = data.schedules;
    var card = app.visibleCards[key];

    if (!card) {
      var label = data.label.split(", ");
      var title = label[0];
      var subtitle = label[1];
      card = app.cardTemplate.cloneNode(true);
      card.classList.remove("cardTemplate");
      card.querySelector(".label").textContent = title;
      card.querySelector(".subtitle").textContent = subtitle;
      card.removeAttribute("hidden");
      app.container.appendChild(card);
      app.visibleCards[key] = card;
    }
    card.querySelector(".card-last-updated").textContent = data.created;

    var scheduleUIs = card.querySelectorAll(".schedule");
    for (var i = 0; i < 4; i++) {
      var schedule = schedules[i];
      var scheduleUI = scheduleUIs[i];
      if (schedule && scheduleUI) {
        scheduleUI.querySelector(".message").textContent = schedule.message;
      }
    }

    if (app.isLoading) {
      app.spinner.setAttribute("hidden", true);
      app.container.removeAttribute("hidden");
      app.isLoading = false;
    }
  };

  /*****************************************************************************
   *
   * Methods for dealing with the model
   *
   ****************************************************************************/

  app.getSchedule = function(key, label) {
    var url = "https://api-ratp.pierre-grimaud.fr/v4/schedules/" + key;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var response = JSON.parse(request.response);
          var result = {};
          result.key = key;
          result.label = label;
          result.created = response._metadata.date;
          result.schedules = response.result.schedules;
          app.updateTimetableCard(result);

          var todo = {
            _id: result.key,
            key: result.key,
            label: result.label
            /*created: result.created,
            schedules: result.schedules*/
          };
          db.put(todo, function callback(err, result) {
            if (!err) {
              console.log("Successfully posted a station!");
            }
          });
        }
      } else {
        // Return the initial weather forecast since no data is available.
        app.updateTimetableCard(initialStationTimetable);
      }
    };
    request.open("GET", url);
    request.send();
  };

  // Iterate all of the cards and attempt to get the latest timetable data
  app.updateSchedules = function() {
    var keys = Object.keys(app.visibleCards);
    keys.forEach(function(key) {
      app.getSchedule(key);
    });
  };

  /*
   * Fake timetable data that is presented when the user first uses the app,
   * or when the user has not saved any stations. See startup code for more
   * discussion.
   */

  var initialStationTimetable = {
    key: "metros/1/bastille/A",
    label: "Bastille, Direction La Défense",
    created: "2017-07-18T17:08:42+02:00",
    schedules: [
      {
        message: "0 mn"
      },
      {
        message: "2 mn"
      },
      {
        message: "5 mn"
      }
    ]
  };

  app.init = async function() {
    console.log("entroo");
    var lista = [];

    try {
      var result = await db.allDocs({
        include_docs: true,
        attachments: true
      });
    } catch (err) {
      console.log(err);
    }

    //console.log(result.rows);
    for (var i in result.rows) {
      lista[i] = result.rows[i];
    }

    //lista.push(result.rows);
    console.log(lista);
    console.log(lista[0].doc.label);

    //alert(Object.keys(lista).length);
    if (lista.length > 0) {
      lista.forEach(function(item) {
        console.log(item.label);
        app.getSchedule(item.key, item.doc.label);
        app.selectedTimetables.push({ key: item.key, label: item.label });
      });
    } else {
      app.selectedTimetables = [
        {
          key: initialStationTimetable.key,
          label: initialStationTimetable.label
        }
      ];
    }
  };

  PouchDB.on('created', function (dbName) {
  // called whenever a db is created.
    app.init();
    app.getSchedule("metros/1/bastille/A", "Bastille, Direction La Défense");
});

  /* db.info()
    .then(() => {
    console.log('fsdf');
    //app.init;
    app.getSchedule("metros/1/bastille/A", "Bastille, Direction La Défense");
    
      // The database exists.     // Do something...
    })
    .catch(e => {
      // No database found and it was not created.     // Do something else...
    });*/

  /************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  app.getSchedule("metros/1/bastille/A", "Bastille, Direction La Défense");
  app.selectedTimetables = [
    { key: initialStationTimetable.key, label: initialStationTimetable.label }
  ];
})();
