migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hmgmvikg",
    "name": "change_request",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  // remove
  collection.schema.removeField("hmgmvikg")

  return dao.saveCollection(collection)
})
