migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d0cz0fv1r4jf7w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nvoxgm2c",
    "name": "year",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0d0cz0fv1r4jf7w")

  // remove
  collection.schema.removeField("nvoxgm2c")

  return dao.saveCollection(collection)
})
