import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

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
      .catch((error => {
        throw error;
      }));
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(response => {
        setState({ ...state, appointments });
      })
      .catch(error => {
        throw error;
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setDays(all[0].data)

      setState(prev => ({ ...prev, appointments: all[1].data }))

      setState(prev => ({ ...prev, interviewers: all[2].data }))
    })
      .catch(error => console.log(error.message));
  }, [])


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}