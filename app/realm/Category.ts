import { Realm } from "@realm/react";
import  ObjectSchema  from "realm";
import {randomUUID} from "expo-crypto";
export class Category extends Realm.Object {
  _id!: string;
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
      _id: randomUUID(),
      title,
      createdAt,
      type,
      color,
      icon,
      isFavorite,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: "Category",
    primaryKey: "_id",
    properties: {
      _id: "string",
      title: "string",
      type: "string",
      isFavorite: { type: "bool", default: false },
      createdAt: "string",
      color: "string",
      icon: "string",
    },
  };
}
