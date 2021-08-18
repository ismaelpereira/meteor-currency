import { Meteor } from "meteor/meteor";
import { CurrencyCollection } from "../db/currency";

Meteor.publish("currencies", function publishCurrencies() {
  return CurrencyCollection.find();
});
