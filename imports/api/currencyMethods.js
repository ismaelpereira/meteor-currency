import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { CurrencyCollection } from "../db/currency";

Meteor.methods({
  "currencies.insert": function ({ rates }) {
    check({ rates }, Object);

    if (!rates) {
      throw new Meteor.error("Sem valores para adicionar");
    }
    CurrencyCollection.insert({ rates: rates, createdAt: new Date() });
  },
});
