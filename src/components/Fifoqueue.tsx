import React from "react";
import Action from "../interfaces/Action";
import "./Fifoqueue.css";

type actionItemProps = {
  name: string;
  color: string;
};

function ActionItem(props: actionItemProps) {
  return (
    <div className="actionitem" style={{ backgroundColor: props.color }}>
      <p className="action__name">{props.name}</p>
    </div>
  );
}

type props = {
  fifoQueue: Action[];
};

function Fifoqueue(props: props) {
  return (
    <div className="fifoqueue">
      <h2>FIFO queue</h2>
      <div className="fifoqueue__list">
        {props.fifoQueue.map((actionItem, index) => {
          return (
            <ActionItem key={index} name={actionItem.name} color={actionItem.color} />
          );
        })}
      </div>
    </div>
  );
}

export default Fifoqueue;
