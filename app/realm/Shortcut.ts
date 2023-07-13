import { Realm } from "@realm/react";
import { Category } from "./Category";
export class Shortcut extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  category!: Category;
  amount!: number;
  note!: string;
  createdAt!: string;
  currency!: string;
  icon!: string;
  title!: string;

  static generate(title: string, amount: number, currency: string, note: string, category: Category, icon: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      amount,
      category,
      createdAt: new Date().toUTCString(),
      currency,
      icon,
      note,
      title,
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
      icon: "string",
      title: "string",
    },
  };
}
