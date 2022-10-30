import {Realm} from "@realm/react";
export class Transaction extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  amount!: number;
  createdAt!: Date;
  description!: string;
  currency!: string;
  category!: string;

  static generate(
    amount: number,
    currency: string,
    description: string,
    category: string,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      amount,
      createdAt: new Date(),
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
      desciption: "string",
      amount: "int",
      currency: "string",
      category: "Category",
      createdAt: "date",
    },
  };
}
