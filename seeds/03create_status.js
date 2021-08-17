
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('status').del()
    .then(function () {
      // Inserts seed entries
      return knex('status').insert([
        {
          status_tail_number: 15000101,
          status_aircraft_id: 1,
          status_base_id: 2,
          status_aircraft_is_flyable: true,
          status_description: 'I move lots of shit',
          status_priority: 1
        },
        {
          status_tail_number: 15000202,
          status_aircraft_id: 2,
          status_base_id: 1,
          status_aircraft_is_flyable: false,
          status_description: 'A nice airshow jet',
          status_priority: 1
        },
        {
          status_tail_number: 15000303,
          status_aircraft_id: 4,
          status_base_id: 4,
          status_aircraft_is_flyable: true,
          status_description: 'Da boom boom dropper',
          status_priority: 2
        },
        {
          status_tail_number: 15000404,
          status_aircraft_id: 3,
          status_base_id: 3,
          status_aircraft_is_flyable: false,
          status_description: 'We got the gas',
          status_priority: 3
        }
      ]);
    });
};
