migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
