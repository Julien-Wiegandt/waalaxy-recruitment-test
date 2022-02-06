import React, { useEffect, useState } from "react";
import Timer from "../components/Timer";
import Actions from "../components/Actions";
import Fifoqueue from "../components/Fifoqueue";
import "./Fifo.css";
import Action from "../interfaces/Action";
import CreditsAction from "../interfaces/CreditsAction";
import CreditsActionService from "../services/CreditsActionService";
import FifoQueueService from "../services/FifoQueueService";

function Fifo() {
  const actionsData = [
    { name: "Action A", maxCredits: 27, color: "#F1C0E8" },
    { name: "Action B", maxCredits: 20, color: "#CFBAF0" },
    { name: "Action C", maxCredits: 14, color: "#90DBF4" },
    { name: "Action D", maxCredits: 15, color: "#A3C4F3" },
    { name: "Action E", maxCredits: 16, color: "#B9FBC0" },
    { name: "Action F", maxCredits: 10, color: "#98F5E1" },
  ];

  const [actions, setActions] = useState<Action[]>(actionsData);
  const [credits, setCredits] = useState<CreditsAction[]>([]);
  const [fifoQueue, setFifoQueue] = useState<Action[]>([]);

  /**
   * Generate random credits between 80% and 100% of the action's maxCredits.
   * @param action
   * @returns generated credits.
   */
  function generateCredits(action: Action): number {
    const min = action.maxCredits * 0.8;
    const range = action.maxCredits - min;
    return Math.round(min + Math.random() * range);
  }

  /**
   * Add action to fifoQueue.
   * @param action
   */
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
  };

  /**
   * Call reload user's action credits function.
   */
  const reloadCredits = () => {
    reload(actions);
  };

  /**
   * Re generate user's action credits.
   * @param actions
   */
  function reload(actions: Action[]) {
    let newCredits: CreditsAction[] = [];
    actions.forEach((action) => {
      newCredits.push({ credits: generateCredits(action), name: action.name });
    });
    setCredits(newCredits);
  }

  /**
   * Reset FIFO queue
   */
  const removeFifoqueue = () => {
    setFifoQueue([]);
  };

  useEffect(() => {
    // Get api credits if not empty, reload credits otherwise.
    CreditsActionService.getAll()
      .then((res) => {
        if (res.data.length > 0) {
          const newCredits: CreditsAction[] = [];
          res.data.forEach((creditsAction: CreditsAction) => {
            newCredits.push({ credits: creditsAction.credits, name: creditsAction.name });
          });
          setCredits(newCredits);
        } else {
          reload(actions);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    // Get api fifoqueue if not empty.
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
  }, []); //eslint-disable-line

  useEffect(() => {
    // Get api credits if not empty, reload credits otherwise.
    CreditsActionService.getAll()
      .then((res) => {
        if (res.data.length > 0) {
          const newCredits: CreditsAction[] = [];
          res.data.forEach((creditsAction: CreditsAction) => {
            newCredits.push({ credits: creditsAction.credits, name: creditsAction.name });
          });
          setCredits(newCredits);
        } else {
          reload(actions);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [actions]); //eslint-disable-line

  // Update api's credits on user's credits change.
  useEffect(() => {
    CreditsActionService.update(credits)
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  }, [credits]);

  // Update api's fifo queue on fifo queue change.
  useEffect(() => {
    FifoQueueService.update(fifoQueue)
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  }, [fifoQueue]);

  return (
    <div className="fifo">
      <Timer reloadCredits={() => reloadCredits()} />
      <div className="fifo__container">
        <Actions actions={actions} addAction={addAction} credits={credits} />
        <Fifoqueue fifoQueue={fifoQueue} removeFifoqueue={removeFifoqueue} />
      </div>
    </div>
  );
}

export default Fifo;
