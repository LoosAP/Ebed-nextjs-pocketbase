migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vlfx9fqj",
    "name": "worker_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  // remove
  collection.schema.removeField("vlfx9fqj")

  return dao.saveCollection(collection)
})
