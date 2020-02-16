import React from "react";
import { render, wait } from "@testing-library/react";

import SpotPreview from "./SpotPreview";

import { ThemeProvider } from "@chakra-ui/core";

import userEvent from "@testing-library/user-event";

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

test("renders SpotPreview with selectedSpot", () => {
  const { getByText } = render(
    <ThemeProvider>
      <SpotPreview selectedSpot={spot} onClose={noop} />
    </ThemeProvider>
  );

  // Just make sure the Spot Card's name is there
  expect(getByText(spot.name)).toBeInTheDocument();

  // Check that the Drawer Header is there
  expect(getByText("Previewing a Spot")).toBeInTheDocument();
});

test("does NOT render SpotPreview with no selectedSpot", () => {
  const { queryByText } = render(
    <ThemeProvider>
      <SpotPreview selectedSpot={null} onClose={noop} />
    </ThemeProvider>
  );

  // Just make sure the Spot Card's name is NOT there
  expect(queryByText(spot.name)).not.toBeInTheDocument();

  // Check that the Drawer Header is NOT there
  expect(queryByText("Previewing a Spot")).not.toBeInTheDocument();
});

test("SpotPreview opens and closes", async () => {
  let dynamicSpot = null;

  const closeDrawer = jest.fn(() => (dynamicSpot = null));

  // * Render Without selectedSpot *

  const { getByRole, queryByText, rerender } = render(
    <ThemeProvider>
      <SpotPreview selectedSpot={dynamicSpot} onClose={closeDrawer} />
    </ThemeProvider>
  );

  // Check that the Drawer Header is NOT there
  expect(queryByText("Previewing a Spot")).not.toBeInTheDocument();

  // * Rerender With selectedSpot *

  dynamicSpot = spot;

  rerender(
    <ThemeProvider>
      <SpotPreview selectedSpot={dynamicSpot} onClose={closeDrawer} />
    </ThemeProvider>
  );

  // Check that the Drawer Header is there
  expect(queryByText("Previewing a Spot")).toBeInTheDocument();

  // * Close Drawer And Rerender *

  userEvent.click(getByRole("close-button"));

  rerender(
    <ThemeProvider>
      <SpotPreview selectedSpot={dynamicSpot} onClose={closeDrawer} />
    </ThemeProvider>
  );

  // Make sure the close function has been called
  expect(closeDrawer).toHaveBeenCalledTimes(1);

  // Check that the Drawer Header is NOT there
  await wait(() =>
    expect(queryByText("Previewing a Spot")).not.toBeInTheDocument()
  );
});
