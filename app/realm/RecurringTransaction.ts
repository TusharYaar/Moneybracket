import { Realm } from "@realm/react";
import { Category } from "./Category";
export class RecurringTransaction extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  amount!: number;
  currency!: string;
  startDate!: Date;
  period!: string;
  lastTransaction!: Date | null;
  createdAt!: string;
  note!: string;
  isFavorite!: boolean;
  image!: string;
  category!: Category;

  static generate(
    amount: number,
    currency: string,
    startDate: Date,
    period: string,
    lastTransaction: null | Date = null,
    note: string,
    category: Category,
    isFavorite = false,
    image = ""
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      startDate,
      note,
      amount,
      period,
      lastTransaction,
      createdAt: new Date().toUTCString(),
      category,
      currency,
      image,
      isFavorite,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: "RecurringTransaction",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      note: "string",
      period: "string",
      startDate: "date?",
      lastTransaction: "date?",
      amount: "int",
      currency: "string",
      category: "Category?",
      createdAt: "string",
      isFavorite: "bool",
      image: "string",
    },
  };
}
