
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('base').del()
    .then(function () {
      // Inserts seed entries
      return knex('base').insert([
        {
          "base_name": "Altus AFB"
        },
        {
          "base_name": "JB Anacogstia-Bollin"
        },
        {
          "base_name": "JB Andrews-Naval Air Facility Washington"
        },
        { 
          "base_name": "Arbuckle AFB"
        },
        {
          "base_name": "Arnold AFB"
        },
        {
          "base_name": "Barksdale AFB"
        },
        {
          "base_name": "Beale AFB"
        },
        {
          "base_name": "Cannon AFB"
        },
        {
          "base_name": "JB Charleston"
        },
        {
          "base_name": "JB Columbus"
        },
        {
          "base_name": "Creech AFB"
        },
        {
          "base_name": "Davis–Monthan AFB"
        },
        {
          "base_name": "Dover AFB"
        },
        {
          "base_name": "Dyess AFB"
        },
        {
          "base_name": "Edwards AFB"
        },
        {
          "base_name": "Eglin AFB"
        },
        {
          "base_name": "Ellsworth AFB"
        },
        {
          "base_name": "Evan's SFB"
        },
        {
          "base_name": "Francis E. Warren AFB"
        },
        {
          "base_name": "Fairchild AFB"
        },
        {
          "base_name": "Fort George G. Meade"
        },
        {
          "base_name": "Gila Bend Air Force Auxiliary Field"
        },
        {
          "base_name": "Goodfellow AFB"
        },
        {
          "base_name": "Fairchild AFB"
        },
        {
          "base_name": "Grand Forks AFB"
        },
        {
          "base_name": "Hanscom AFB"
        },
        {
          "base_name": "Hill AFB"
        },
        {
          "base_name": "Homey Airport"
        },
        {
          "base_name": "Holloman AFB"
        },
        {
          "base_name": "Hurlburt Field"
        },
        {
          "base_name": "Keesler AFB"
        },
        {
          "base_name": "Kegelman Air Force Auxiliary Field"
        },
        {
          "base_name": "Kirtland AFB"
        },
        {
          "base_name": "JB Langley–Eustis"
        },
        {
          "base_name": "Laughlin AFB"
        },
        {
          "base_name": "JB Lewis-McChord"
        },
        {
          "base_name": "Little Rock AFB"
        },
        {
          "base_name": "Los Angeles AFB"
        },
        {
          "base_name": "MacDill AFB"
        },
        {
          "base_name": "Malmstrom AFB"
        },
        {
          "base_name": "Maxwell AFB"
        },
        {
          "base_name": "McConnell AFB"
        },
        {
          "base_name": "JB McGuire–Dix–Lakehurst"
        },
        {
          "base_name": "Minot AFB"
        },
        {
          "base_name": "Moody AFB"
        },
        {
          "base_name": "Mountain Home AFB"
        },
        {
          "base_name": "North Auxiliary Airfield"
        },
        {
          "base_name": "Offutt AFB"
        },
        {
          "base_name": "Patrick SFB"
        },
        {
          "base_name": "Naval Air Station Pensacola"
        },
        {
          "base_name": "Pope Field"
        },
        {
          "base_name": "Robins AFB"
        },
        {
          "base_name": "Rome Research Site"
        },
        {
          "base_name": "JB San Antonio"
        },
        {
          "base_name": "Seymour Johnson AFB"
        },
        {
          "base_name": "Shaw AFB"
        },
        {
          "base_name": "Sheppard AFB"
        },
        {
          "base_name": "Tinker AFB"
        },
        {
          "base_name": "Tonopah Test Range Airport"
        },
        {
          "base_name": "Travis AFB"
        },
        {
          "base_name": "Tyndall AFB"
        },
        {
          "base_name": "United States Air Force Academy"
        },
        {
          "base_name": "Vance AFB"
        },
        {
          "base_name": "Vandenberg SFB"
        },
        {
          "base_name": "JB Walters-Yorke"
        },
        {
          "base_name": "Whiteman AFB"
        },
      
        {
          "base_name": "Wright-Patterson AFB"
        }
      ]);
    });
};
