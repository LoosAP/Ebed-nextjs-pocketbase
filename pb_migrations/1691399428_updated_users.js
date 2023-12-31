migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.updateRule = "@request.auth.id != \"\" || @request.auth.privilege = \"vendor\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
