import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOvertimes } from "src/actions/HumanRessource/empovertime";

const SelectLoanType = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([
    { label: "Loading ...", value: "" },
  ]);
  const [value, setValue] = React.useState();

  React.useEffect(() => {
    let unmounted = false;
    async function getCharacters() {
      const response = await fetch("https://swapi.co/api/people");
      const body = await response?.json();
      if (!unmounted) {
        setItems(
          body.results.map(({ name }) => ({
            label: name,
            value: name,
          }))
        );
        setLoading(false);
      }
    }
    getCharacters();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <select
      disabled={loading}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    >
      ...
    </select>
  );
};

export default SelectLoanType;
