import {Realm} from "@realm/react";
export class Category extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  type!: "income" | "expense" | "transfer";
  createdAt!: string;
  color!: string;
  icon!: string;
  static generate(title: string, type: string, color: string, icon: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      title,
      createdAt: new Date().toUTCString(),
      type,
      color,
      icon,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: "Category",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      title: "string",
      type: "string",
      isFavorite: {type: "bool", default: false},
      createdAt: "string",
      color: "string",
      icon: "string",
    },
  };
}