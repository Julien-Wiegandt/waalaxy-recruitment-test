import React, { useState } from "react";
import Action from "../interfaces/Action";
import "./Fifoqueue.css";
import arrowIcon from "../assets/ant-design_arrow-down-outlined.png";

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
  removeFifoqueue: () => number;
};

function Fifoqueue(props: props) {
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="fifoqueue">
      <div className="fifoqueue__header">
        <h2>FIFO queue</h2>
        <button onClick={props.removeFifoqueue}>remove all</button>
      </div>

      <div className="fifoqueue__list">
        {props.fifoQueue.map((actionItem, index) => {
          if (index < 5 || showAll) {
            return (
              <ActionItem key={index} name={actionItem.name} color={actionItem.color} />
            );
          }
        })}
      </div>
      {props.fifoQueue.length > 5 && (
        <div className="arrow__div">
          <img
            src={arrowIcon}
            onClick={() => {
              setShowAll(!showAll);
            }}
            alt="show all icon"
            className={showAll ? "arrow__icon__up" : "arrow__icon__down"}
          />
        </div>
      )}
    </div>
  );
}

export default Fifoqueue;
