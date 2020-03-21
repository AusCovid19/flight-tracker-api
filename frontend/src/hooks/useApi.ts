import { useState, useEffect } from "react";
import moment from "moment";
import { Flight, FlightsResponse } from "../types";

export type Order = "ascending" | "descending" | "none";

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Flight[]>([]);

  const [arrivalDateSort, setArrivalDateSort] = useState<Order>("none");

  const timeout = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      await timeout(2000);
      const data: FlightsResponse[] = await fetch("/api").then(resp =>
        resp.json()
      );

      const newData: Flight[] = data.map(flight => {
        return {
          ...flight,
          arrival_date: moment(new Date(flight.arrival_date)),
          symptoms_onset_date: moment(new Date(flight.symptoms_onset_date))
        };
      });
      setData(newData);
      setIsLoading(false);
    }
    getData();
  }, []);

  const sortByArrivalDate = (order: Order) => {
    if (order === "ascending") {
      const flightData = [...data].sort((a, b) => {
        return a.arrival_date.isBefore(moment(b.arrival_date)) ? 1 : -1;
      });
      setData(flightData);
    } else if (order === "descending") {
      const flightData = [...data].sort((a, b) => {
        return a.arrival_date.isBefore(moment(b.arrival_date)) ? -1 : 1;
      });
      setData(flightData);
    }
  };

  const toggleArrivalDateSort = () => {
    if (arrivalDateSort === "ascending") {
      sortByArrivalDate("descending");
      setArrivalDateSort("descending");
    } else {
      sortByArrivalDate("ascending");
      setArrivalDateSort("ascending");
    }
  };

  return {
    isLoading,
    data,
    arrivalDateSort,
    sortByArrivalDate,
    toggleArrivalDateSort
  };
};
