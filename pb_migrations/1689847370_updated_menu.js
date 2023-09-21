migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8vnt4i5iu19pkp5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ilqd4un9",
    "name": "date",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8vnt4i5iu19pkp5")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ilqd4un9",
    "name": "date",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
