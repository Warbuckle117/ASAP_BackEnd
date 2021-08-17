
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('aircraft').del()
    .then(function () {
      // Inserts seed entries
      return knex('aircraft').insert([
        {
          aircraft_name: 'c-17'
        },
        {
          aircraft_name: 'f-16'
        },
        {
          aircraft_name: 'kc-135'
        },
        {
          aircraft_name: 'b-52'
        }
      ]);
    });
};
