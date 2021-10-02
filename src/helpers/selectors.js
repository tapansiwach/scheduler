/**
 * [returns an array of appointments for that day]
 * @param {object} state 
 * @param {string} day 
 * @returns {object} appointments
 */
export function getAppointmentsForDay(state, day) {
  // if incoming data doesn't contain any days, return an empty array
  if (state.days.length === 0) return [];

  // find the days in the input state whose name matches with the provided day string
  const filteredDays = state.days.filter(x => x.name === day);

  // if no matching days are found in the state, return an empty array
  if (filteredDays.length === 0) {
    return [];
  }

  // get the found day
  const matchedDay = filteredDays[0]

  // extract the array of appointments from the state
  const appointments = Object.values(state.appointments);

  // find the appointments whose id is in the filtered day's appointments
  const result = appointments.filter(x => matchedDay.appointments.includes(x.id));
  return result;
}


/**
 * [returns an array of interviewers for that day]
 * @param {object} state 
 * @param {string} day 
 */
export function getInterviewersForDay(state, day) {

}



/**
 * returned the interview object from the interviewId
 * @param {object} state 
 * @param {object} interview 
 * @returns {object} interview
 */
export function getInterview(state, interview) {
  if (interview === null) return null;

  // get an array of interviewers
  const interviewers = Object.values(state.interviewers);

  // match the interviewer object which has the required id
  const filtered = interviewers.filter(x => x.id === interview.interviewer)

  // if no match is found, return null
  if (filtered.length === 0) return null;

  // return the desired interview object
  return {
    "student": interview.student,
    "interviewer": filtered[0]
  }
}
/* (sample) returned object looks like this
{
  "student": "Lydia Miller-Jones",
  "interviewer": {
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}
*/