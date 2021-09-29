import React from "react";
import classnames from "classnames"
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  const liClassNames = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  const imgClassNames = classnames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
  });

  return (
    <li className={liClassNames}>
      <img
        className={imgClassNames}
        src={props.avatar}
        alt={props.name}
        onClick={props.setInterviewer}
      />
      {props.name}
    </li>
  );
}