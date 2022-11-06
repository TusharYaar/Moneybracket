import {Realm} from "@realm/react";
import {Category} from "./Category";
export class Transaction extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  amount!: number;
  date!: string;
  createdAt!: string;
  note!: string;
  currency!: string;
  category!: Category;

  static generate(
    amount: number,
    currency: string,
    date: Date,
    note: string,
    category: Category,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      note,
      amount,
      date: date.toUTCString(),
      createdAt: new Date().toUTCString(),
      category,
      currency,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: "Transaction",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      note: "string",
      date: "string",
      amount: "int",
      currency: "string",
      category: "Category?",
      createdAt: "string",
    },
  };
}
