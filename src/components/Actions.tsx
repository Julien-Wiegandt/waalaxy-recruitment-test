import React from "react";
import "./Actions.css";
import creditCoin from "../assets/twemoji_coin.png";
import IAction from "../interfaces/Action";

interface CreditsAction {
  credits: number;
  name: string;
}

type actionProps = {
  action: IAction;
  credits: number;
  addAction: (action: IAction) => number;
};

function Action(props: actionProps) {
  return (
    <button
      className="action"
      onClick={() => props.addAction(props.action)}
      style={{ backgroundColor: props.action.color }}
    >
      <div className="action__texts">
        <p className="action__name">{props.action.name}</p>
        <p className="action__credits">{props.credits}</p>
      </div>
      <img src={creditCoin} alt="credit coin" />
      <p className="action__maxcredits">max : {props.action.maxCredits}</p>
    </button>
  );
}

type props = {
  actions: IAction[];
  addAction: (action: IAction) => number;
  credits: CreditsAction[];
};

function Actions(props: props) {
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
