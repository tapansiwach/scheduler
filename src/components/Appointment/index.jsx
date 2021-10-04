import React from "react";

import "components/Appointment/styles.scss"
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...props.interview} />}
      {mode === CREATE && <Form
        name=""
        // interviewer={}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
}