migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep")

  collection.createRule = null

  return dao.saveCollection(collection)
})
