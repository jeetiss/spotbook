import React from "react";
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import NewSpotForm from "./NewSpotForm";

import { ThemeProvider } from "@chakra-ui/core";

import userEvent from "@testing-library/user-event";

const newSpotLocation = { lat: 89.99999, lng: 89.99999 };

jest.mock("@uploadcare/react-widget");

test("renders NewSpotForm with header", () => {
  const { getByText, getByLabelText } = render(
    <ThemeProvider>
      <NewSpotForm
        newSpotLocation={newSpotLocation}
        onClose={noop}
        onSubmit={noop}
      />
    </ThemeProvider>
  );

  // Check that the Drawer Header is there
  expect(getByText("Create a New Spot")).toBeInTheDocument();

  // Check that one of the inputs is there
  expect(getByLabelText("Name of Spot")).toBeInTheDocument();
});

test("does NOT render NewSpotForm when newSpotLocation is null", () => {
  const { queryByText } = render(
    <ThemeProvider>
      <NewSpotForm newSpotLocation={null} onClose={noop} onSubmit={noop} />
    </ThemeProvider>
  );

  // Check that the Drawer Header is NOT there
  expect(queryByText("Create a New Spot")).not.toBeInTheDocument();
});

test("NewSpotForm opens and closes", async () => {
  let dynamicNewSpotLocation = null;

  const closeDrawer = jest.fn(() => (dynamicNewSpotLocation = null));

  // * Render with newSpotLocation = null *

  const { getByRole, queryByText, rerender } = render(
    <ThemeProvider>
      <NewSpotForm
        newSpotLocation={dynamicNewSpotLocation}
        onClose={closeDrawer}
        onSubmit={noop}
      />
    </ThemeProvider>
  );

  // Check that the Drawer Header is NOT there
  expect(queryByText("Create a New Spot")).not.toBeInTheDocument();

  // * Rerender with newSpotLocation *

  dynamicNewSpotLocation = newSpotLocation;

  rerender(
    <ThemeProvider>
      <NewSpotForm
        newSpotLocation={dynamicNewSpotLocation}
        onClose={closeDrawer}
        onSubmit={noop}
      />
    </ThemeProvider>
  );

  // Check that the Drawer Header is there
  expect(queryByText("Create a New Spot")).toBeInTheDocument();

  // * Close Drawer And Rerender *

  userEvent.click(getByRole("close-button"));

  rerender(
    <ThemeProvider>
      <NewSpotForm
        newSpotLocation={dynamicNewSpotLocation}
        onClose={closeDrawer}
        onSubmit={noop}
      />
    </ThemeProvider>
  );

  // Make sure the close function has been called
  expect(closeDrawer).toHaveBeenCalledTimes(1);

  // Check that the Drawer Header is NOT there
  const drawerHeader = queryByText("Create a New Spot");

  await waitForElementToBeRemoved(drawerHeader);
});

test("NewSpotForm calls onSubmit with correct details", async () => {
  const closeDrawer = jest.fn();
  const onSubmit = jest.fn();

  const newSpot = {
    name: "Spot Test #X",
    difficulty: "xtreme",
    popularity: "medium",
    type: "kinked rail",
    description: "This is a test for a spot. Ignore this.",
    ...newSpotLocation,
  };

  const { getByLabelText, getByText, getByTestId } = render(
    <ThemeProvider>
      <NewSpotForm
        newSpotLocation={newSpotLocation}
        onClose={closeDrawer}
        onSubmit={onSubmit}
      />
    </ThemeProvider>
  );

  await userEvent.type(getByLabelText("Name of Spot"), newSpot.name);
  await userEvent.type(getByLabelText("Description"), newSpot.description);

  userEvent.selectOptions(
    getByLabelText("Select Difficulty"),
    newSpot.difficulty
  );
  userEvent.selectOptions(
    getByLabelText("Select Popularity"),
    newSpot.popularity
  );
  userEvent.selectOptions(getByLabelText("Select Type of Spot"), newSpot.type);

  // Upload a picture
  userEvent.click(getByText("Choose a file"));

  // Wait until the picture is SELECTED and the disabled attribute is enabled
  expect(getByTestId("submit-button")).toHaveAttribute("aria-disabled", "true");

  // Wait until the picture is UPLOADED and the disabled attribute is REMOVED
  await waitFor(() =>
    expect(getByTestId("submit-button")).toHaveAttribute(
      "aria-disabled",
      "false"
    )
  );

  // Submit the form
  userEvent.click(getByTestId("submit-button"));

  // Make sure onSubmit function was called with correct spot info
  expect(onSubmit).toHaveBeenCalledWith({
    ...newSpot,
    imageUrl:
      "https://ucarecdn.com/2425c2b5-71f9-4079-b0f2-69bcd03b9173/-/scale_crop/400x400/",
  });

  // Make sure the close function has been called
  expect(closeDrawer).toHaveBeenCalledTimes(1);
}, 20000);
