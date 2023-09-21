migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8vnt4i5iu19pkp5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lpzongjj",
    "name": "soup",
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
  const collection = dao.findCollectionByNameOrId("8vnt4i5iu19pkp5")

  // remove
  collection.schema.removeField("lpzongjj")

  return dao.saveCollection(collection)
})
