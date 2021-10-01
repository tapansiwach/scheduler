import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  let dailyAppointments = []


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      // console.log("days", all[0].data)
      // setState.days
      setDays(all[0].data)

      // console.log("appointments", all[1].data)
      // setState.appointments
      setState(prev => ({ ...prev, appointments: all[1].data }))

      // console.log("interviewers", all[2].data)
    })
      .catch(error => console.log(error.message));
  }, [])
  // console.log("state", state);

  dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log("dailyAppointments", dailyAppointments);
  const parsedAppointments = dailyAppointments.map(appointment => <Appointment
    {...appointment}
    key={appointment.id}
  />)

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
