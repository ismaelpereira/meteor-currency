import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Card } from "./components/Card";
import styled, { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { CurrencyCollection } from "../db/currency";

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
body{
  background-color: #121212;
  display: flex;
  font-family: sans-serif;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
} 
`;

const PageLayout = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  margin-left: 30px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const App = () => {
  const { currencies, isLoading } = useTracker(() => {
    const noDataAvailable = { rates: [{}] };
    const handler = Meteor.subscribe("currencies");
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const currencies = CurrencyCollection.find().fetch();

    return { currencies };
  });

  if (isLoading) {
    return (
      <PageLayout>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle>
            <h1 color="white">Loading...</h1>
          </GlobalStyle>
        </QueryClientProvider>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Card currencies={currencies} />
      </QueryClientProvider>
    </PageLayout>
  );
};
