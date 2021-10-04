import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    days: [],
    day: "Monday",
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  let dailyAppointments = []

  function bookInterview(id, interview) {
    // console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(response => {
        setState({ ...state, appointments });
      })
      .catch(error => console.log(error.message));
  }

  function cancelInterview(id) {
    // note that this can't be done directly:
    // THIS... --> state.appointments[id].interview = null <-- ...WON'T WORK 
    // instead, have to use setState

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    setState({ ...state, appointments });

    // ---alternate patterns used earlier---
    // setState({
    //   ...state,
    //   appointments: {
    //     ...state.appointments,
    //     [id]: {
    //       ...state.appointments[id],
    //       interview: null
    //     }
    //   }
    // });
  }

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
      // setState.interviewers
      setState(prev => ({ ...prev, interviewers: all[2].data }))
    })
      .catch(error => console.log(error.message));
  }, [])
  // console.log("state", state);

  dailyAppointments = getAppointmentsForDay(state, state.day);
  // console.log("dailyAppointments", dailyAppointments);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    // console.log("interview", interview);
    const interviewers = getInterviewersForDay(state, state.day)
    // console.log("interviewers", interviewers);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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
        {schedule}
      </section>
    </main>
  );
}
