const sqliteConnection = require('../../sqlite')
const createAdmin = require('./createAdmin')

async function migrationsRun(){
  const schemas = [
    createAdmin
  ].join('')

  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error))
}

module.exports = migrationsRun