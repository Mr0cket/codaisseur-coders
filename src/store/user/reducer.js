import { FETCHINGUSER, GOTUSER } from "./action-types";

const inititialState = {
  auth
  loading: false,
  jwt: null,
  email: null,
  name: null,
  additionalUserDetails: {},
}; // Don't store password here/anywhere in state!
// only use the password to send the login request then forget it.

export default function reducer(state = inititialState, action) {
  switch (action.type) {
    case FETCHINGUSER: {
    }
    case GOTUSER: {
    }
    default:
      return state;
  }
}
