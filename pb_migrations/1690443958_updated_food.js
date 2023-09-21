migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxkg2i15ybwxsvk")

  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxkg2i15ybwxsvk")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
