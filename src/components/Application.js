import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";

export default function Application(props) {

  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  const dailyAppointments = []

  const parsedAppointments = dailyAppointments.map(appointment => <Appointment
    {...appointment}
    key={appointment.id}
  />)

  useEffect(() => {
    axios.get("/api/days")
      .then(response => {
        setDays(response.data)
      });
  }, [])

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      console.log("days", all[0])
      console.log("appointments", all[1])
      console.log("interviewers", all[2])
    }).catch(error => console.log(error.message));
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      </section>
      <section className="schedule">
        {parsedAppointments}
      </section>
    </main>
  );
}
