import { Database } from "./client.js";

export function getCards() {
  return Database.collection('cards').find().toArray();
}
