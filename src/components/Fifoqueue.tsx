import React, { useEffect, useState } from "react";
import Action from "../interfaces/Action";
import "./Fifoqueue.css";
import arrowIcon from "../assets/ant-design_arrow-down-outlined.png";

type actionItemProps = {
  name: string;
  color: string;
};

/**
 * Fifoqueue's action item, display the action's name and the corresponding background color.
 * @param props Action's name and color.
 * @returns JSX element.
 */
function ActionItem(props: actionItemProps) {
  return (
    <div className="actionitem" style={{ backgroundColor: props.color }}>
      <p className="action__name" role="contentinfo">
        {props.name}
      </p>
    </div>
  );
}

type props = {
  fifoQueue: Action[];
  removeFifoqueue: () => void;
};

/**
 * FIFO actions queue.
 * @param props fifo queue and removeFifoQueue callback function.
 * @returns a JSX element.
 */
function Fifoqueue(props: props) {
  const [showAll, setShowAll] = useState(false);
  const [displayedQueue, setDisplayedQueue] = useState<Action[]>([]);

  /**
   * Filter fifo queue action's to display.
   * @param action action from fifo queue.
   * @param index action's index.
   * @returns boolean true if action stay in array, false if action is filtered.
   */
  function filterActionsToDisplay(action: Action, index: number) {
    return index < 5 || showAll;
  }

  // Set displayed actions in fifo queue on showAll or fifoQueue change.
  useEffect(() => {
    setDisplayedQueue(props.fifoQueue.filter(filterActionsToDisplay));
  }, [props.fifoQueue, showAll]); //eslint-disable-line

  return (
    <div className="fifoqueue">
      <div className="fifoqueue__header">
        <h2>FIFO queue</h2>
        <button onClick={props.removeFifoqueue}>remove all</button>
      </div>

      <div className="fifoqueue__list">
        {displayedQueue.map((actionItem, index) => {
          return (
            <ActionItem key={index} name={actionItem.name} color={actionItem.color} />
          );
        })}
      </div>
      {props.fifoQueue.length > 5 && (
        <div className="arrow__div">
          <button className="arrow__btn">
            <img
              src={arrowIcon}
              onClick={() => {
                setShowAll(!showAll);
              }}
              alt="show all icon"
              className={showAll ? "arrow__icon__up" : "arrow__icon__down"}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default Fifoqueue;
