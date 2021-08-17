
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('base').del()
    .then(function () {
      // Inserts seed entries
      return knex('base').insert([
        {
          base_name: 'Pope AFB'
        },
        {
          base_name: 'JB Charleston'
        },
        {
          base_name: 'Travis AFB'
        },
        {
          base_name: 'Dover AFB'
        }
      ]);
    });
};
