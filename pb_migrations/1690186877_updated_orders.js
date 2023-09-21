migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  // remove
  collection.schema.removeField("tzxsdfcm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l9n9f4bl",
    "name": "price",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "q79qg375syqvs8p",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tzxsdfcm",
    "name": "price",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("l9n9f4bl")

  return dao.saveCollection(collection)
})
