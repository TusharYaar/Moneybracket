import { Realm } from "@realm/react";
import { Category } from "./Category";
import {randomUUID} from "expo-crypto";


class Transaction extends Realm.Object {
  _id!: string;
  amount!: number;
  date!: Date;
  createdAt!: string;
  note!: string;
  currency!: string;
  isFavorite!: boolean;
  image!: string;
  category!: Category;

  // static generate(
  //   amount: number,
  //   currency: string,
  //   date: Date,
  //   note: string,
  //   category: Category,
  //   isFavorite = false,
  //   image = "",
  //   createdAt = new Date().toUTCString()
  // ) {
  //   return {
  //     _id: randomUUID(),
  //     note,
  //     amount,
  //     date: date,
  //     createdAt,
  //     category,
  //     currency,
  //     image,
  //     isFavorite,
  //   };
  // }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: "Transaction",
    primaryKey: "_id",
    properties: {
      _id: "string",
      note: "string",
      date: "date?",
      amount: "int",
      currency: "string",
      category: "Category?",
      createdAt: "string",
      isFavorite: "bool",
      image: "string",
    },
  };
}

export default Transaction;
