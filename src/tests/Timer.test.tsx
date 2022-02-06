import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Timer from "../components/Timer";

test("renders Timer", () => {
  const reloadCredits = jest.fn();

  render(<Timer reloadCredits={reloadCredits} />);

  // Testing callback function
  expect(reloadCredits).toBeCalledTimes(1);

  // Testing text content
  const timer = screen.getByRole("contentinfo");
  expect(timer).toHaveTextContent("23 H 59 MIN");
});
