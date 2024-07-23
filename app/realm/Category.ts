import { Realm } from "@realm/react";
import { ObjectSchema } from "realm";
export class Category extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  type!: "income" | "expense" | "transfer";
  createdAt!: string;
  color!: string;
  icon!: string;
  isFavorite!: boolean;
  static generate(
    title: string,
    type: string,
    color: string,
    icon: string,
    isFavorite = false,
    createdAt = new Date().toUTCString()
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      title,
      createdAt,
      type,
      color,
      icon,
      isFavorite,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema: ObjectSchema = {
    name: "Category",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      title: "string",
      type: "string",
      isFavorite: { type: "bool", default: false },
      createdAt: "string",
      color: "string",
      icon: "string",
    },
  };
}
