

exports.up = function(knex) {
    return knex.schema.createTable('base', function (table) {
      table.increments('base_id');              // Auto incrementing PK column
      table.string('base_name').notNullable();  // String NOT NULL
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('base');
  };
  