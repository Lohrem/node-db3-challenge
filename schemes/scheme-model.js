const  db = require('../data/dbConfig.js')

function find() {
  return db('schemes')
}
function findById(id) {
  return db('schemes').where({ id }).first()
}
function findSteps(scheme_id) {
    return db('schemes')
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .where({scheme_id})
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