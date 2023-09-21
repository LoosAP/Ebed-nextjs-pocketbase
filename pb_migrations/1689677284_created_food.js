migrate((db) => {
  const collection = new Collection({
    "id": "rxkg2i15ybwxsvk",
    "created": "2023-07-18 10:48:04.060Z",
    "updated": "2023-07-18 10:48:04.060Z",
    "name": "food",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hhkgbujc",
        "name": "name",
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
        "id": "bkch3jvj",
        "name": "type",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Soup",
            "Normal",
            "E",
            "Fix"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rxkg2i15ybwxsvk");

  return dao.deleteCollection(collection);
})
