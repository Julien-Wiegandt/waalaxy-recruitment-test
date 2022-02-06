import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Fifoqueue from "../components/Fifoqueue";
import { hexToRGB, randomColor, randomNumber, randomString } from "../utils";

test("renders Fifoqueue", () => {
  const fifoQueue = [];
  for (let i = 0; i < randomNumber(1, 5); i++) {
    fifoQueue.push({
      name: randomString(10),
      maxCredits: randomNumber(0, 100),
      color: randomColor(),
    });
  }
  const removeFifoqueue = jest.fn();

  render(<Fifoqueue fifoQueue={fifoQueue} removeFifoqueue={removeFifoqueue} />);

  // Testing buttons
  const buttons = screen.getAllByRole("button");
  fireEvent.click(buttons[0]);
  expect(removeFifoqueue).toHaveBeenCalledTimes(1);

  // Testing text content
  const texts = screen.getAllByRole("contentinfo")
    ? screen.getAllByRole("contentinfo")
    : [];
  for (let i = 0; i < fifoQueue.length; i++) {
    expect(texts[i]).toHaveTextContent(fifoQueue[i].name);
    expect(texts[i]).toHaveStyle("background-color: " + hexToRGB(fifoQueue[i].color));
  }
});
