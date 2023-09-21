migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("f2ff68td")

  // remove
  collection.schema.removeField("itm2xxau")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "opeyx9dm",
    "name": "priviledge",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "user",
        "vendor",
        "admin"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f2ff68td",
    "name": "admin",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "itm2xxau",
    "name": "vendor",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("opeyx9dm")

  return dao.saveCollection(collection)
})
