
exports.up = function(knex) {
    return knex.schema.createTable('aircraft', table => {
        table.increments('aircraft_id'); // adds an auto incrementing PK column
        table.string('aircraft_type').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('aircraft');
};