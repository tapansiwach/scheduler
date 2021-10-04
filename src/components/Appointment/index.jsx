import React, { useState } from "react";

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
const EDIT = "EDIT"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const ERROR_SAVE = "ERROR SAVE";
const ERROR_DELETE = "ERROR DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  const [errorMessage, setErrorMessage] = useState("");

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(error => {
        setErrorMessage(error.message)
        transition(ERROR_SAVE, true);
      });
  }

  function cancel() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        setErrorMessage(error.message)
        transition(ERROR_DELETE, true);
      });
  }

  function confirmDeletion() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...props.interview}
        onDelete={confirmDeletion}
        onEdit={() => transition(EDIT)}
      />}
      {mode === CREATE && <Form
        name=""
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === EDIT && <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
      />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to Delete?"
        onCancel={() => transition(SHOW)}
        onConfirm={cancel}
      />}
      {mode === ERROR_SAVE && <Error message={errorMessage} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={errorMessage} onClose={back} />}
    </article>
  );
}