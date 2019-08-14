const  db = require('../data/dbConfig.js')

function find() {
  return db('schemes')
}
function findById(id) {
  return db('schemes').where({ id }).first()
}
function findSteps(id) {
  return db('steps as s')
          .join('schemes', 'schemes.id', 's.id')
          .select('s.id', 'schemes.scheme_name', 's.step_number', 's.instructions')
          .where({ id })
}
async function add(scheme) {
  const [ id ] = await db('schemes').insert(scheme)
  return findById(id)
}
async function update(changes, id) {
  await db('schemes')
        .where({ id })
        .update(changes)
  return findById(id)
}
async function remove(id) {
  await db('schemes').where({ id }).del().first()
}
module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
}