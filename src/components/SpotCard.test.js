import React from "react";
import { render } from "@testing-library/react";

import SpotCard from "./SpotCard";

import { ThemeProvider } from "@chakra-ui/core";

test("renders SpotCard with details", () => {
  const spot = {
    imageUrl:
      "https://media.mnn.com/assets/images/2018/08/CollectionOfCloudsAgainstABlueSky.jpg.653x0_q80_crop-smart.jpg",
    name: "Spot Card Test #1",
    description: "We are testing the description of this spot.",
    popularity: "low",
    difficulty: "xtreme",
    type: "bump to bar",
    lat: 34.03392718052147,
    lng: -118.49256201517566,
    id: "-M-bZ_7EPDQRDXd8pdA4"
  };

  const { getByText } = render(
    <ThemeProvider>
      <SpotCard spot={spot} />
    </ThemeProvider>
  );

  const name = getByText(spot.name);
  expect(name).toBeInTheDocument();

  const description = getByText(spot.description);
  expect(description).toBeInTheDocument();

  const popularity = getByText(spot.popularity + " popularity");
  expect(popularity).toBeInTheDocument();

  const difficulty = getByText(spot.difficulty);
  expect(difficulty).toBeInTheDocument();

  const type = getByText(spot.type);
  expect(type).toBeInTheDocument();
});
