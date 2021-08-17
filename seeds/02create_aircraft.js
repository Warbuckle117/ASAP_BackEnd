
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('aircraft').del()
    .then(function () {
      // Inserts seed entries
      return knex('aircraft').insert([
        {
          aircraft_type: 'c-17'
        },
        {
          aircraft_type: 'f-16'
        },
        {
          aircraft_type: 'kc-135'
        },
        {
          aircraft_type: 'b-52'
        }
      ]);
    });
};
