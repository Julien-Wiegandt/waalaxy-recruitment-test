import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Actions from "../components/Actions";
import { hexToRGB, randomColor, randomNumber, randomString } from "../utils";

test("renders Actions", () => {
  const actions = [];
  for (let i = 0; i < randomNumber(1, 5); i++) {
    actions.push({
      name: randomString(10),
      maxCredits: randomNumber(0, 100),
      color: randomColor(),
    });
  }
  const addAction = jest.fn();
  const credits = actions.map((action) => {
    return { credits: randomNumber(0, 100), name: action.name };
  });

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
