exports.up = function(knex, Promise) {
  //console.log("creating users table");

  return knex.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .unique()
      .primary()
      .notNullable();
    usersTable.string("avatar_url").notNullable();
    usersTable.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  // console.log("destroying users table");
  return knex.schema.dropTable("users");
};
