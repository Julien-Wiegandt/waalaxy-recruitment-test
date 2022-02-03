import React, { useEffect, useState } from "react";
import Timer from "../components/Timer";
import Actions from "../components/Actions";
import Fifoqueue from "../components/Fifoqueue";
import "./Fifo.css";
import Action from "../interfaces/Action";

const actionsData = [
  { name: "Action A", maxCredits: 27, color: "#F1C0E8" },
  { name: "Action B", maxCredits: 20, color: "#CFBAF0" },
  { name: "Action C", maxCredits: 14, color: "#90DBF4" },
  { name: "Action D", maxCredits: 15, color: "#A3C4F3" },
  { name: "Action E", maxCredits: 16, color: "#B9FBC0" },
  { name: "Action F", maxCredits: 10, color: "#98F5E1" },
];

interface CreditsAction {
  credits: number;
  name: string;
}

function getMyCredits(action: Action): number {
  const min = action.maxCredits * 0.8;
  const range = action.maxCredits - min;
  return Math.round(min + Math.random() * range);
}

function Fifo() {
  const [actions, setActions] = useState<Action[]>([]);
  const [credits, setCredits] = useState<CreditsAction[]>([]);
  useEffect(() => {
    let newActions: Action[] = [];
    actionsData.forEach((action) => {
      newActions.push(action);
    });
    setActions(newActions);
  }, []);

  useEffect(() => {
    let newCredits: CreditsAction[] = [];
    actions.forEach((action) => {
      newCredits.push({ name: action.name, credits: getMyCredits(action) });
    });
    setCredits(newCredits);
  }, [actions]);

  const [fifoQueue, setFifoQueue] = useState<Action[]>([]);

  const addAction = (action: Action) => {
    credits.forEach((creditsAction, index) => {
      if (creditsAction.name === action.name) {
        if (creditsAction.credits > 0) {
          credits.splice(index, 1);
          setCredits([
            ...credits,
            { credits: creditsAction.credits - 1, name: creditsAction.name },
          ]);
          setFifoQueue([...fifoQueue, action]);
        }
      }
    });
    return 0;
  };

  return (
    <div className="fifo">
      <Timer />
      <div className="fifo__container">
        <Actions actions={actions} addAction={addAction} credits={credits} />
        <Fifoqueue fifoQueue={fifoQueue} />
      </div>
    </div>
  );
}

export default Fifo;
