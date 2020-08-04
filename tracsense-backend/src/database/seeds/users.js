
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        {id: 1, username: 'joao1', password: 'joao1', name: 'João'},
        {id: 2, username: 'fabio1', password: 'fabio1', name: 'Fabio'},
        {id: 3, username: 'christopher1', password: 'christopher1', name: 'Christopher'}
      ]);
    });
};