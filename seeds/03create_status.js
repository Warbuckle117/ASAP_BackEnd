
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('status').del()
    .then(function () {
      // Inserts seed entries
      return knex('status').insert([
        {
          "status_tail_number": "15000101",
          "aircraft_id": 7,
          "base_id": 4,
          "status_is_flyable": false,
          "status_description": "Broken Wheel",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000102",
          "aircraft_id": 37,
          "base_id": 65,
          "status_is_flyable": false,
          "status_description": "Tail wing fractured",
          "status_priority": 1
        },
        {
          "status_tail_number": "15000103",
          "aircraft_id": 5,
          "base_id": 18,
          "status_is_flyable": false,
          "status_description": "Cockpit glass broken",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000104",
          "aircraft_id": 7,
          "base_id": 4,
          "status_is_flyable": true,
          "status_description": "Fractured lung",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000105",
          "aircraft_id": 45,
          "base_id": 33,
          "status_is_flyable": true,
          "status_description": "Broken soul",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000106",
          "aircraft_id": 23,
          "base_id": 12,
          "status_is_flyable": true,
          "status_description": "Tiny heart syndrome",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000107",
          "aircraft_id": 18,
          "base_id": 12,
          "status_is_flyable": false,
          "status_description": "Discription of my faults, hole in the fuel tank",
          "status_priority": 1
        },
        {
          "status_tail_number": "15000108",
          "aircraft_id": 28,
          "base_id": 43,
          "status_is_flyable": false,
          "status_description": "Human remains found in landing gear",
          "status_priority": 1
        },
        {
          "status_tail_number": "15000109",
          "aircraft_id": 33,
          "base_id": 22,
          "status_is_flyable": true,
          "status_description": "Dirty cargo bay",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000110",
          "aircraft_id": 7,
          "base_id": 33,
          "status_is_flyable": false,
          "status_description": "Instructions unclear got hand stuck in turbine",
          "status_priority": 1
        },
        {
          "status_tail_number": "15000111",
          "aircraft_id": 14,
          "base_id": 56,
          "status_is_flyable": true,
          "status_description": "Brused cooling arm",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000112",
          "aircraft_id": 45,
          "base_id": 33,
          "status_is_flyable": false,
          "status_description": "Missing movement nutts",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000113",
          "aircraft_id": 12,
          "base_id": 34,
          "status_is_flyable": true,
          "status_description": "OE-254 batteries missing",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000114",
          "aircraft_id": 45,
          "base_id": 12,
          "status_is_flyable": true,
          "status_description": "Girdsquares need refilling",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000115",
          "aircraft_id": 34,
          "base_id": 54,
          "status_is_flyable": true,
          "status_description": "Blicker fluid leak",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000116",
          "aircraft_id": 32,
          "base_id": 12,
          "status_is_flyable": true,
          "status_description": "Elbow grease missing",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000117",
          "aircraft_id": 43,
          "base_id": 4,
          "status_is_flyable": false,
          "status_description": "Propeller bent",
          "status_priority": 1
        },
        {
          "status_tail_number": "15000118",
          "aircraft_id": 32,
          "base_id": 12,
          "status_is_flyable": false,
          "status_description": "Urine found in gas tank",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000119",
          "aircraft_id": 12,
          "base_id": 23,
          "status_is_flyable": true,
          "status_description": "Raccoons found in cargo bay",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000120",
          "aircraft_id": 11,
          "base_id": 43,
          "status_is_flyable": true,
          "status_description": "Radar dish broken",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000121",
          "aircraft_id": 54,
          "base_id": 12,
          "status_is_flyable": true,
          "status_description": "Yellowing of the gear teeth",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000122",
          "aircraft_id": 33,
          "base_id": 22,
          "status_is_flyable": true,
          "status_description": "Rusted lugnuts",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000123",
          "aircraft_id": 32,
          "base_id": 43,
          "status_is_flyable": false,
          "status_description": "Dry firing pistons",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000124",
          "aircraft_id": 23,
          "base_id": 52,
          "status_is_flyable": true,
          "status_description": "Star Wars: The Phantom Mence found in cockpit.",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000125",
          "aircraft_id": 21,
          "base_id": 21,
          "status_is_flyable": true,
          "status_description": "Star Wars: Attack of the Clones found missing from passanger compartment",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000126",
          "aircraft_id": 23,
          "base_id": 31,
          "status_is_flyable": true,
          "status_description": "Master Skywalker what are we going to do?",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000127",
          "aircraft_id": 31,
          "base_id": 23,
          "status_is_flyable": false,
          "status_description": "Star Wars: The Revenge of the Sith found in wing, lightsaber cuts along left side of aircraft",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000128",
          "aircraft_id": 34,
          "base_id": 45,
          "status_is_flyable": false,
          "status_description": "Star Wars: A New Hope Tantaun found in turbine",
          "status_priority": 1
        },
        {
          "status_tail_number": "15000129",
          "aircraft_id": 32,
          "base_id": 55,
          "status_is_flyable": true,
          "status_description": "Star Wars: Empire Strikes Back - Missing a new hope",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000130",
          "aircraft_id": 57,
          "base_id": 27,
          "status_is_flyable": true,
          "status_description": "Star Wars: Return Of The Jedi - Find the missing sock",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000131",
          "aircraft_id": 44,
          "base_id": 19,
          "status_is_flyable": false,
          "status_description": "Now this is pod racing - Broken cooling controller",
          "status_priority": 1
        },
        {
          "status_tail_number": "15000132",
          "aircraft_id": 12,
          "base_id": 34,
          "status_is_flyable": true,
          "status_description": "Missing GPS puck",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000133",
          "aircraft_id": 32,
          "base_id": 22,
          "status_is_flyable": true,
          "status_description": "Missing Uber App",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000134",
          "aircraft_id": 35,
          "base_id": 53,
          "status_is_flyable": false,
          "status_description": "Nintendo Switch Absent from Cockpit, Unable to play Mario Cart 8",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000135",
          "aircraft_id": 33,
          "base_id": 43,
          "status_is_flyable": false,
          "status_description": "Skyward Sword fails to load on navigation computer",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000136",
          "aircraft_id": 43,
          "base_id": 25,
          "status_is_flyable": true,
          "status_description": "The fish live under the seats",
          "status_priority": 1
        },
        {
          "status_tail_number": "15000137",
          "aircraft_id": 19,
          "base_id": 18,
          "status_is_flyable": false,
          "status_description": "Turbine refuses to turn over. Says maintance team made fun of it.",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000138",
          "aircraft_id": 36,
          "base_id": 5,
          "status_is_flyable": true,
          "status_description": "QR Code painted on inside of cargo bay. Leads to the HUB, github that is.",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000139",
          "aircraft_id": 5,
          "base_id": 3,
          "status_is_flyable": false,
          "status_description": "Stars are aligned and aircraft transformed into a autobot please remove autobot",
          "status_priority": 1
        },
        {
          "status_tail_number": "15000140",
          "aircraft_id": 2,
          "base_id": 7,
          "status_is_flyable": false,
          "status_description": "Happy accident is missing transmission fluid",
          "status_priority": 2
        },
        {
          "status_tail_number": "15000141",
          "aircraft_id": 2,
          "base_id": 7,
          "status_is_flyable": true,
          "status_description": "Dirt underbelly",
          "status_priority": 3
        },
        {
          "status_tail_number": "15000142",
          "aircraft_id": 42,
          "base_id": 42,
          "status_is_flyable": true,
          "status_description": "Life, The Universe, and Everything.",
          "status_priority": 1
        },
        {
          "status_tail_number": "15000143",
          "aircraft_id": 6,
          "base_id": 9,
          "status_is_flyable": false,
          "status_description": "Bird found in landing gear, nest nearby",
          "status_priority": 1
        }
      ]);
    });
};
