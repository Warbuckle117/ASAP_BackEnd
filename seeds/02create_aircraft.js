
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('aircraft').del()
    .then(function () {
      // Inserts seed entries
      return knex('aircraft').insert([
        {
          "aircraft_name": "A-10C Thunderbolt II"
        },
        {
          "aircraft_name": "AC-130"
        },
        {
          "aircraft_name": "AC-130J"
        },
        {
          "aircraft_name": "B-1B Lancer"
        },
        {
          "aircraft_name": "B-2A Spirit"
        },
        {
          "aircraft_name": "B-52H Stratofortress"
        },
        {
          "aircraft_name": "C-5 Galaxy"
        },
        {
          "aircraft_name": "C-12"
        },
        {
          "aircraft_name": "C-17A Globemaster III"
        },
        {
          "aircraft_name": "C-20H"
        },
        {
          "aircraft_name": "C-21A"
        },
        {
          "aircraft_name": "C-32"
        },
        {
          "aircraft_name": "C-37"
        },
        {
          "aircraft_name": "C-40 Clipper"
        },
        {
          "aircraft_name": "C-130H Hercules"
        },
        {
          "aircraft_name": "C-130J Super Hercules"
        },
        {
          "aircraft_name": "C-145A Skytruck"
        },
        {
          "aircraft_name": "C-146A Wolfhound"
        },
        {
          "aircraft_name": "CN-235"
        },
        {
          "aircraft_name": "CV-22B Osprey"
        },
        {
          "aircraft_name": "E-3 Sentry"
        },
        {
          "aircraft_name": "E-4"
        },
        {
          "aircraft_name": "E-8C Joint STARS"
        },
        {
          "aircraft_name": "E-9A Widget"
        },
        {
          "aircraft_name": "E-11A"
        },
        {
          "aircraft_name": "EC-130H Compass Call"
        },
        {
          "aircraft_name": "EC-130J Commando Solo III"
        },
        {
          "aircraft_name": "F-15C Eagle"
        },
        {
          "aircraft_name": "F-15E Strike Eagle"
        },
        {
          "aircraft_name": "F-15EX Eagle II"
        },
        {
          "aircraft_name": "F-16C Fighting Falcon"
        },
        {
          "aircraft_name": "F-22A Raptor"
        },
        {
          "aircraft_name": "F-35A Lighting II"
        },
        {
          "aircraft_name": "HC-130J Combat King II"
        },
        {
          "aircraft_name": "HH-60G Pave Hawk"
        },
        {
          "aircraft_name": "KC-10 Extender"
        },
        {
          "aircraft_name": "KC-46 Pegasus"
        },
        {
          "aircraft_name": "KC-135 Stratotanker"
        },
        {
          "aircraft_name": "LC-130H Hercules"
        },
        {
          "aircraft_name": "MC-130H Combat Talon II"
        },
        {
          "aircraft_name": "MQ-9A Reaper"
        },
        {
          "aircraft_name": "OC-135B Open Skies"
        },
        {
          "aircraft_name": "QF-16A Fighting Falcon"
        },
        {
          "aircraft_name": "Radon-Ulzer"
        },
        {
          "aircraft_name": "RC-26B Metroliner"
        },
        {
          "aircraft_name": "RC-135S"
        },
        {
          "aircraft_name": "RC-135U/V/W"
        },
        {
          "aircraft_name": "RQ-4B Global Hawk"
        },
        {
          "aircraft_name": "RQ-20 Puma"
        },
        {
          "aircraft_name": "RQ-170 Sentinel"
        },
        {
          "aircraft_name": "T-1A Jayhawk"
        },
        {
          "aircraft_name": "T-6A Texan II"
        },
        {
          "aircraft_name": "T-38 Talon"
        },
        {
          "aircraft_name": "T-53A"
        },
        {
          "aircraft_name": "TH-1H Iroquois"
        },
        {
          "aircraft_name": "TU-2S"
        },
        {
          "aircraft_name": "U-2"
        },
        {
          "aircraft_name": "U-27A"
        },
        {
          "aircraft_name": "U-28A"
        },
        {
          "aircraft_name": "UN-1N Twin Huey"
        },
        {
          "aircraft_name": "UV-18B Twin Otter"
        },
        {
          "aircraft_name": "VC-25A"
        },
        {
          "aircraft_name": "WC-130J Hercules"
        },
        {
          "aircraft_name": "WC-135"
        }
      ]);
    });
};
