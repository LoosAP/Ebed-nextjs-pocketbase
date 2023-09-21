migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q79qg375syqvs8p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8hf8dfaa",
    "name": "price_takeout",
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
  const collection = dao.findCollectionByNameOrId("q79qg375syqvs8p")

  // remove
  collection.schema.removeField("8hf8dfaa")

  return dao.saveCollection(collection)
})
