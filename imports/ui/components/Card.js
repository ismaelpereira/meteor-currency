import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import styled from "styled-components";
import { fetchData } from "../../api/fetch";
import { flags } from "../public/confs";
import "../../api/currencyMethods";
import { LineChart } from "./Chart";

const CardStyle = styled.div`
  width: 400px;
  height: 400px;
  background-color: #424242;
  border: 1px;
  border-radius: 30px;
  color: white;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const CardCurrency = styled.h1`
  font-size: 25px;
`;

const CardPrice = styled.h1`
  font-size: 30px;
  color: ${(props) => {
    if (props.grow === 0) {
      return "#5cb85c";
    }
    if (props.grow === 1) {
      return "#d9534f";
    }
  }};
`;

const ChartStyle = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  text-align: center;
  align-self: center;
`;

const insertRates = ({ rates }) => {
  Meteor.call("currencies.insert", { rates }, (error) => {
    if (error) {
      throw new Error(error);
    }
  });
};

export const Card = ({ currencies }) => {
  const [rates, setRates] = useState({});
  let grow = 0;

  const { isLoading, error, data } = fetchData();
  if (error) {
    throw new Error(error);
  }

  useEffect(() => {
    return <div color="white">Loading...</div>;
  }, [isLoading]);

  useEffect(() => {
    if (data !== undefined) {
      setRates(data);
      insertRates(data);
    }
  }, [data]);

  if (rates.rates) {
    const card = Object.keys(rates.rates).map((rate, i) => (
      <CardStyle key={i}>
        <CardCurrency>
          {rate} {flags[rate]}
        </CardCurrency>
        <CardPrice
          grow={
            currencies.length !== 0 &&
            currencies[currencies.length - 1].rates[rate] >= rates.rates[rate]
              ? (grow = 0)
              : (grow = 1)
          }
        >
          R${(rates.rates["BRL"] / rates.rates[rate]).toFixed(3)}
        </CardPrice>
        <ChartStyle>
          <LineChart currencies={currencies} rate={rate} />
        </ChartStyle>
        <p>Last Update {rates.date}</p>
      </CardStyle>
    ));
    return card;
  }

  return <div>Loading...</div>;
};
