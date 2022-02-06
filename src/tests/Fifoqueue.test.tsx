import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Fifoqueue from "../components/Fifoqueue";
import { hexToRGB } from "../utils";

test("renders Fifoqueue", () => {
  const fifoQueue = [
    { name: "Action A", maxCredits: 27, color: "#F1C0E8" },
    { name: "Action B", maxCredits: 20, color: "#CFBAF0" },
  ];
  const removeFifoqueue = jest.fn();

  render(<Fifoqueue fifoQueue={fifoQueue} removeFifoqueue={removeFifoqueue} />);

  // Testing buttons
  const buttons = screen.getAllByRole("button");
  fireEvent.click(buttons[0]);
  expect(removeFifoqueue).toHaveBeenCalledTimes(1);

  // Testing text content
  const texts = screen.getAllByRole("contentinfo");
  for (let i = 0; i < fifoQueue.length; i++) {
    expect(texts[i]).toHaveTextContent(fifoQueue[i].name);
    expect(texts[i]).toHaveStyle("background-color: " + hexToRGB(fifoQueue[i].color));
  }
});
