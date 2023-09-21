migrate((db) => {
  const collection = new Collection({
    "id": "0d0cz0fv1r4jf7w",
    "created": "2023-07-31 07:26:56.657Z",
    "updated": "2023-07-31 07:26:56.657Z",
    "name": "menu2",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "e18uok2p",
        "name": "week",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "7u9qdnz2",
        "name": "menu",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0d0cz0fv1r4jf7w");

  return dao.deleteCollection(collection);
})
