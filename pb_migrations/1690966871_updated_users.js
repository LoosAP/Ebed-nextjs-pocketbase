migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zcanusn0",
    "name": "worker_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 5,
      "max": 5,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("zcanusn0")

  return dao.saveCollection(collection)
})
