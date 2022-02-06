import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Actions from "../components/Actions";
import { hexToRGB } from "../utils";

test("renders Actions", () => {
  const actions = [
    { name: "Action A", maxCredits: 27, color: "#F1C0E8" },
    { name: "Action B", maxCredits: 20, color: "#CFBAF0" },
  ];
  const addAction = jest.fn();
  const credits = [
    { credits: 26, name: "Action A" },
    { credits: 20, name: "Action B" },
  ];

  render(<Actions actions={actions} addAction={addAction} credits={credits} />);

  // Testing buttons
  const buttons = screen.getAllByRole("button");
  buttons.forEach((button, index) => {
    fireEvent.click(button);
  });
  expect(addAction).toHaveBeenCalledTimes(buttons.length);

  // Testing text content
  const texts = screen.getAllByRole("contentinfo");
  for (let i = 0; i < actions.length; i++) {
    expect(texts[i * 3]).toHaveTextContent(actions[i].name);
    expect(texts[i * 3 + 1]).toHaveTextContent(credits[i].credits.toString());
    expect(texts[i * 3 + 2]).toHaveTextContent("max : " + actions[i].maxCredits);
    // Style too
    expect(texts[i * 3]).toHaveStyle("background-color: " + hexToRGB(actions[i].color));
  }
});
