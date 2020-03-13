import React from "react";
import { render, waitForElementToBeRemoved } from "@testing-library/react";

import SpotsNearMe from "./SpotsNearMe";

import { ThemeProvider } from "@chakra-ui/core";

import userEvent from "@testing-library/user-event";

const spotList = [
  {
    imageUrl:
      "https://media.mnn.com/assets/images/2018/08/CollectionOfCloudsAgainstABlueSky.jpg.653x0_q80_crop-smart.jpg",
    name: "Spot Card Test #1",
    description: "We are testing the description of this spot.",
    popularity: "low",
    difficulty: "xtreme",
    type: "bump to bar",
    lat: 0,
    lng: 0,
    id: "-M-bZ_7EPDQRDXd8pdA4"
  },
  {
    imageUrl:
      "https://media.mnn.com/assets/images/2018/08/CollectionOfCloudsAgainstABlueSky.jpg.653x0_q80_crop-smart.jpg",
    name: "Spot Card Test #2",
    description: "We are testing the description of this second spot.",
    popularity: "high",
    difficulty: "medium",
    type: "rail",
    lat: 90,
    lng: 90,
    id: "-M-galkQVXoqEeYBMHn5"
  }
];

// This location is WAY closer to Spot #2 on purpose
const currentLocation = { lat: 89.99999, lng: 89.99999 };

test("renders SpotsNearMe with spotlist", () => {
  const { getByText, getAllByText } = render(
    <ThemeProvider>
      <SpotsNearMe
        isOpen={true}
        currentLocation={currentLocation}
        onClose={noop}
        spotList={spotList}
      />
    </ThemeProvider>
  );

  const spotNames = getAllByText(/Spot Card/);

  expect(spotNames[0]).toHaveTextContent("Spot Card Test #2");
  expect(spotNames[1]).toHaveTextContent("Spot Card Test #1");

  // Check that the Drawer Header is there
  expect(getByText("Spots Near You")).toBeInTheDocument();
});

test("does NOT render SpotsNearMe when isOpen is false", () => {
  const { queryByText } = render(
    <ThemeProvider>
      <SpotsNearMe
        isOpen={false}
        currentLocation={{ lat: 0, lng: 0 }}
        onClose={noop}
        spotList={spotList}
      />
    </ThemeProvider>
  );

  // Check that the Drawer Header is NOT there
  expect(queryByText("Spots Near You")).not.toBeInTheDocument();
});

test("shows alert when no geolocation", () => {
  const { getByText } = render(
    <ThemeProvider>
      <SpotsNearMe
        isOpen={true}
        currentLocation={{ lat: 0, lng: 0 }}
        onClose={noop}
        spotList={spotList}
      />
    </ThemeProvider>
  );

  expect(
    getByText("Click the button in the top left to enable Geolocation first!")
  ).toBeInTheDocument();
});

test("SpotsNearMe opens and closes", async () => {
  let isOpen = false;

  const closeDrawer = jest.fn(() => (isOpen = false));

  // * Render with isOpen = false *

  const { getByRole, queryByText, rerender } = render(
    <ThemeProvider>
      <SpotsNearMe
        isOpen={isOpen}
        currentLocation={currentLocation}
        onClose={closeDrawer}
        spotList={spotList}
      />
    </ThemeProvider>
  );

  // Check that the Drawer Header is NOT there
  expect(queryByText("Spots Near You")).not.toBeInTheDocument();

  // * Rerender with isOpen = true *

  isOpen = true;

  rerender(
    <ThemeProvider>
      <SpotsNearMe
        isOpen={isOpen}
        currentLocation={currentLocation}
        onClose={closeDrawer}
        spotList={spotList}
      />
    </ThemeProvider>
  );

  // Check that the Drawer Header is there
  expect(queryByText("Spots Near You")).toBeInTheDocument();

  // * Close Drawer And Rerender *

  userEvent.click(getByRole("close-button"));

  rerender(
    <ThemeProvider>
      <SpotsNearMe
        isOpen={isOpen}
        currentLocation={currentLocation}
        onClose={closeDrawer}
        spotList={spotList}
      />
    </ThemeProvider>
  );

  // Make sure the close function has been called
  expect(closeDrawer).toHaveBeenCalledTimes(1);

  // Check that the Drawer Header is NOT there
  const drawerHeader = queryByText("Spots Near You");

  await waitForElementToBeRemoved(drawerHeader);
});
