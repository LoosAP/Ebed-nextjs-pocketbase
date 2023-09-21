migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8vnt4i5iu19pkp5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nhgzo13f",
    "name": "price_A",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "q79qg375syqvs8p",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "price_A"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "luf6ohvs",
    "name": "price_B",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "q79qg375syqvs8p",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "price_B"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ifhqx8pr",
    "name": "price_E",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "q79qg375syqvs8p",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "price_E"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cnojsl2r",
    "name": "price_L1",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "q79qg375syqvs8p",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "price_L1"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dakfmoqs",
    "name": "price_L2",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "q79qg375syqvs8p",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "price_L2"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8vnt4i5iu19pkp5")

  // remove
  collection.schema.removeField("nhgzo13f")

  // remove
  collection.schema.removeField("luf6ohvs")

  // remove
  collection.schema.removeField("ifhqx8pr")

  // remove
  collection.schema.removeField("cnojsl2r")

  // remove
  collection.schema.removeField("dakfmoqs")

  return dao.saveCollection(collection)
})
