migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxkg2i15ybwxsvk")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxkg2i15ybwxsvk")

  collection.listRule = null

  return dao.saveCollection(collection)
})
