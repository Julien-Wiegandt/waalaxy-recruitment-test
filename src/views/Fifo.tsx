import React, { useEffect, useState } from "react";
import Timer from "../components/Timer";
import Actions from "../components/Actions";
import Fifoqueue from "../components/Fifoqueue";
import "./Fifo.css";
import Action from "../interfaces/Action";
import CreditsAction from "../interfaces/CreditsAction";
import CreditsActionService from "../services/CreditsActions";
import FifoQueueService from "../services/Fifoqueue";

const actionsData = [
  { name: "Action A", maxCredits: 27, color: "#F1C0E8" },
  { name: "Action B", maxCredits: 20, color: "#CFBAF0" },
  { name: "Action C", maxCredits: 14, color: "#90DBF4" },
  { name: "Action D", maxCredits: 15, color: "#A3C4F3" },
  { name: "Action E", maxCredits: 16, color: "#B9FBC0" },
  { name: "Action F", maxCredits: 10, color: "#98F5E1" },
];

function generateCredits(action: Action): number {
  const min = action.maxCredits * 0.8;
  const range = action.maxCredits - min;
  return Math.round(min + Math.random() * range);
}

function Fifo() {
  const [actions, setActions] = useState<Action[]>([]);
  const [credits, setCredits] = useState<CreditsAction[]>([]);
  const [fifoQueue, setFifoQueue] = useState<Action[]>([]);

  // Add action to fifoQueue
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

  const reloadCredits = () => {
    let newCredits: CreditsAction[] = [];
    actions.forEach((action) => {
      newCredits.push({ credits: generateCredits(action), name: action.name });
    });
    setCredits(newCredits);
    return 0;
  };

  const removeFifoqueue = () => {
    setFifoQueue([]);
    return 0;
  };

  useEffect(() => {
    // Create actions on load
    let newActions: Action[] = [];
    actionsData.forEach((action) => {
      newActions.push(action);
    });
    setActions(newActions);

    // Get api credits if not empty
    CreditsActionService.getAll()
      .then((res) => {
        if (res.data !== []) {
          const newCredits: CreditsAction[] = [];
          res.data.forEach((creditsAction: CreditsAction) => {
            newCredits.push({ credits: creditsAction.credits, name: creditsAction.name });
          });
          setCredits(newCredits);
        } else {
          reloadCredits();
        }
      })
      .catch((e) => {
        console.log(e);
      });

    // Get api fifoqueue if not empty
    FifoQueueService.getAll()
      .then((res) => {
        if (res.data !== []) {
          const newFifoQueue: Action[] = [];
          res.data.forEach((action: Action) => {
            newFifoQueue.push({
              name: action.name,
              maxCredits: action.maxCredits,
              color: action.color,
            });
          });
          setFifoQueue(newFifoQueue);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    CreditsActionService.update(credits)
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  }, [credits]);

  useEffect(() => {
    FifoQueueService.update(fifoQueue)
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  }, [fifoQueue]);

  useEffect(() => {
    reloadCredits();
  }, [actions]);

  return (
    <div className="fifo">
      <Timer reloadCredits={reloadCredits} />
      <div className="fifo__container">
        <Actions actions={actions} addAction={addAction} credits={credits} />
        <Fifoqueue fifoQueue={fifoQueue} removeFifoqueue={removeFifoqueue} />
      </div>
    </div>
  );
}

export default Fifo;
