import { API_KEY } from "../../local/config";
import { fetch } from "meteor/fetch";
import { useQuery } from "react-query";

export const fetchData = () => {
  return useQuery(
    "currencies",
    async () => {
      const response = await fetch(
        `http://data.fixer.io/api/latest?access_key=${API_KEY}`,
        {
          method: "GET",
        }
      );
      return response.json();
    },
    { cacheTime: 7.2e6, staleTime: 7.2e6 }
  );
};
