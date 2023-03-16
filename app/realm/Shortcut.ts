import { Realm } from "@realm/react";
import { Category } from "./Category";
export class Shortcut extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  category!: Category;
  amount!: number;
  note!: string;
  createdAt!: string;
  currency!: string;

  static generate(amount: number, currency: string, note: string, category: Category) {
    return {
      _id: new Realm.BSON.ObjectId(),
      createdAt: new Date().toUTCString(),
      category,
      amount,
      currency,
      note,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: "Shortcut",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      category: "Category?",
      note: "string",
      amount: "int",
      createdAt: "string",
      currency: "string",
    },
  };
}
