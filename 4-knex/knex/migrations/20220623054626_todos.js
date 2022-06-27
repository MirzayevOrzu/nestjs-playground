/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('todo_id');
    table.string('title').notNullable();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('user_id').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('todos');
};
