migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmro5rls",
    "name": "paid",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  // remove
  collection.schema.removeField("rmro5rls")

  return dao.saveCollection(collection)
})
