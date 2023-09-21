migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxkg2i15ybwxsvk")

  collection.createRule = ""
  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxkg2i15ybwxsvk")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
