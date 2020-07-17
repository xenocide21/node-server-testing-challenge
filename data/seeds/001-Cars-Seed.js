exports.seed = async function(knex) {
    await knex("Cars").truncate()
    await knex("Cars").insert([
        { Year: '1987',
          Make: 'Jeep',
          Model: 'Cherokee'
        },
        { Year: '1992',
          Make: 'Dodge',
          Model: 'Stealth'
        },
        { Year: '1997',
          Make: 'Honda',
          Model: 'CRV'
        }
    ])
}
