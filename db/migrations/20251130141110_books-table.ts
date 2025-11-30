import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('books', (table) => {
    table.string('id').primary()
    table.string('title').notNullable()
    table.string('genre').notNullable()
    table.integer('ageRating').notNullable()
    table.text('resume').notNullable()
    table.string('author').notNullable()
    table.date('publishedDate').notNullable()
    table.string('publisherId').notNullable()

    table
      .foreign('publisherId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('books')
}
