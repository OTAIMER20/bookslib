import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('username').notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('hashedPassword').notNullable()
    table.integer('age').notNullable()
    table.enum('role', ['publisher', 'reader']).notNullable()

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('users')
}
