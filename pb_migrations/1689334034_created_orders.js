migrate((db) => {
  const collection = new Collection({
    "id": "dojaw1qpsjyx9ep",
    "created": "2023-07-14 11:27:14.904Z",
    "updated": "2023-07-14 11:27:14.904Z",
    "name": "orders",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "46wiyqrr",
        "name": "date",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "fsk0xvid",
        "name": "choices",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "A",
            "B",
            "E",
            "L1",
            "L2"
          ]
        }
      },
      {
        "system": false,
        "id": "rso7siot",
        "name": "gy_soup",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "dtuw5r0e",
        "name": "takeout",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "5qr6hmaj",
        "name": "ordered_by",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("dojaw1qpsjyx9ep");

  return dao.deleteCollection(collection);
})
