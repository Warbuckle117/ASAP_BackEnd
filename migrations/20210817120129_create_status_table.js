
exports.up = function(knex) {
    return knex.schema.createTable('status', table => {
        table.increments('status_id'); // adds an auto incrementing PK column
        table.string('status_tail_number').unique();
        table.integer('aircraft_id').notNullable();
        table.integer('base_id').notNullable();
        table.boolean('status_is_flyable').notNullable().defaultTo(true);
        table.string('status_description');
        table.integer('status_priority');
        table.timestamps(true, true); // adds created_at and updated_at
        table.foreign('aircraft_id').references('aircraft.aircraft_id');
        table.foreign('base_id').references('base.base_id');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('status');
};