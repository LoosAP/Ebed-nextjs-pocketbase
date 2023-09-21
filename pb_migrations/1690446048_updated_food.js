migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxkg2i15ybwxsvk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hhkgbujc",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkch3jvj",
    "name": "type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Soup",
        "Normal",
        "E",
        "Fix"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxkg2i15ybwxsvk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hhkgbujc",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkch3jvj",
    "name": "type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Soup",
        "Normal",
        "E",
        "Fix"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
