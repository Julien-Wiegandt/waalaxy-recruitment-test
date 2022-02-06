import React from "react";
import "./Actions.css";
import creditCoin from "../assets/twemoji_coin.png";
import IAction from "../interfaces/Action";
import CreditsAction from "../interfaces/CreditsAction";

type actionProps = {
  action: IAction;
  credits: number;
  addAction: (action: IAction) => void;
};

/**
 * Action card button, with all action's parameters displayed, user's credits and handle
 * to add an action in the fifo queue.
 * @param props An action, user's credits and addAction callback function.
 * @returns a JSX element.
 */
function Action(props: actionProps) {
  return (
    <button
      className="action"
      onClick={() => props.addAction(props.action)}
      style={{ backgroundColor: props.action.color }}
    >
      <div className="action__texts">
        <p role="contentinfo" className="action__name">
          {props.action.name}
        </p>
        <p role="contentinfo" className="action__credits">
          {props.credits}
        </p>
      </div>
      <img src={creditCoin} alt="credit coin" />
      <p role="contentinfo" className="action__maxcredits">
        max : {props.action.maxCredits}
      </p>
    </button>
  );
}

type props = {
  actions: IAction[];
  addAction: (action: IAction) => void;
  credits: CreditsAction[];
};

/**
 * Actions container, with a title, and actions card buttons displayed flex.
 * @param props Actions array, addAction callback function and user's credits array.
 * @returns a JSX element.
 */
function Actions(props: props) {
  /**
   * Get user's credits for an action.
   * @param action an action.
   * @param credits user's credits array.
   * @returns credits.
   */
  function getCreditsByAction(action: IAction, credits: CreditsAction[]): number {
    let res: number = 0;
    for (let i: number = 0; i < credits.length; i++) {
      if (credits[i].name === action.name) {
        res = credits[i].credits;
      }
    }
    return res;
  }

  return (
    <div>
      <h2>Actions</h2>
      <div className="actions__container">
        {props.actions.map((action, index) => {
          return (
            <Action
              key={index}
              action={action}
              credits={getCreditsByAction(action, props.credits)}
              addAction={props.addAction}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Actions;
