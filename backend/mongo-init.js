db.createUser({
  user: "usuario",
  pwd: "senha",
  roles:[
    {
      role: "readWrite",
      db: "to-do"
    }
  ]
})
  
db.createCollection("tasks");
db.createCollection("users");
