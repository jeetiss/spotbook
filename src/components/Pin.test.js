import React from "react";
import { render } from "@testing-library/react";

import Pin from "./Pin";

test("renders Pin with no props", () => {
  const { container } = render(<Pin />);

  const pin = container.firstChild;

  expect(pin).toBeInTheDocument();

  expect(pin).toHaveAttribute(`height`, `60`);
  expect(pin).toHaveStyle(`fill: #d00`);
});

test("renders Pin with custom color and size", () => {
  const color = "teal";
  const size = 20;

  const { container } = render(<Pin color={color} size={size} />);

  const pin = container.firstChild;

  expect(pin).toBeInTheDocument();

  expect(pin).toHaveAttribute(`height`, `${size}`);
  expect(pin).toHaveStyle(`fill: ${color}`);
});
