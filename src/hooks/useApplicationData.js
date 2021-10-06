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
      .then(() => updateSpots(id, appointments))
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
      .then(() => updateSpots(id, appointments))
      .catch(error => {
        throw error;
      })
  }

  const findDay = (days, id) => {
    for (let day of days) {
      for (let appintmentId of day.appointments) {
        if (appintmentId === id) {
          return day;
        }
      }
    }
  }

  /**
   * 
   * @param {int} id is the appointment's id
   * @param {object} appointments
   */
  function updateSpots(id, appointments) {
    const foundDay = findDay(state.days, id);

    let remainingSpots = 0;
    for (let appointmentId of foundDay.appointments) {
      if (appointments[appointmentId].interview === null) {
        remainingSpots++;
      }
    }

    foundDay.spots = remainingSpots;
    const foundDayIndex = state.days.findIndex(day => day.id === foundDay.id);
    const days = [...state.days];
    days[foundDayIndex] = foundDay;
    setDays(days);

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