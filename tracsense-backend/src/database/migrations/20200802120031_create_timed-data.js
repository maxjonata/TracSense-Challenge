
exports.up = function(knex) {
	return knex.schema.createTable('timed_data', table => {
		table.increments('id').primary();
		table.string('name').notNullable();
		table.float('coordX').notNullable();
		table.float('coordY').notNullable();
		table.string('stringTimeArray').notNullable();
		table.string('stringDataArray').notNullable();
	  });
};

exports.down = function(knex) {
	return knex.schema.dropTable('timed_data');
};
