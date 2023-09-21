migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxkg2i15ybwxsvk")

  collection.indexes = [
    "CREATE INDEX `idx_lueGJjh` ON `food` (`type`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rxkg2i15ybwxsvk")

  collection.indexes = []

  return dao.saveCollection(collection)
})
