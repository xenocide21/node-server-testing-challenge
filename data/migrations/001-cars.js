exports.up = async function(knex) {
    await knex.schema.createTable('Cars', (table) =>{
        table.increments()
        table.integer('Year').notNullable()
        table.text('Make').notNullable()
        table.text('Model').notNullable()
    })
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('Cars')
}
