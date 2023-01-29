import { Realm } from "@realm/react";
import { Category } from "./Category";
export class Transaction extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  amount!: number;
  date!: Date;
  createdAt!: string;
  note!: string;
  currency!: string;
  category!: Category;

  static generate(amount: number, currency: string, date: Date, note: string, category: Category, isFavorite = false) {
    return {
      _id: new Realm.BSON.ObjectId(),
      note,
      amount,
      date: date,
      createdAt: new Date().toUTCString(),
      category,
      currency,
      isFavorite,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: "Transaction",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      note: "string",
      date: "date?",
      amount: "int",
      currency: "string",
      category: "Category?",
      createdAt: "string",
      isFavorite: "bool",
    },
  };
}
