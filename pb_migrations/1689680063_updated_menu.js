migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8vnt4i5iu19pkp5")

  // remove
  collection.schema.removeField("bvsf2svc")

  // remove
  collection.schema.removeField("esclkrmo")

  // remove
  collection.schema.removeField("fbgqjmlo")

  // remove
  collection.schema.removeField("j7n5zoao")

  // remove
  collection.schema.removeField("15dalgcb")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8vnt4i5iu19pkp5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bvsf2svc",
    "name": "price_A",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "esclkrmo",
    "name": "price_B",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fbgqjmlo",
    "name": "price_E",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j7n5zoao",
    "name": "price_L1",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "15dalgcb",
    "name": "price_L2",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
