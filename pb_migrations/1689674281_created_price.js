migrate((db) => {
  const collection = new Collection({
    "id": "q79qg375syqvs8p",
    "created": "2023-07-18 09:58:01.358Z",
    "updated": "2023-07-18 09:58:01.358Z",
    "name": "price",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6c7avebu",
        "name": "price_A",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "clxtzpol",
        "name": "price_B",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "ox6vrx7c",
        "name": "price_E",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "1oevivoi",
        "name": "price_L1",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "jbyilnwo",
        "name": "price_L2",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("q79qg375syqvs8p");

  return dao.deleteCollection(collection);
})
