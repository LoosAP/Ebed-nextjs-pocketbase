migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5qr6hmaj",
    "name": "ordered_by",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5qr6hmaj",
    "name": "ordered_by",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
