import axios from 'axios';
import  { notify } from "react-notify-toast";
const myColor = { background: "#0E1717", text: "#FFFFFF" };

export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

// export default setAuthToken;

export const __notify__ = res => {
  if (!res) return;
  for (let [key, value] of Object.entries(res)) {
    if (typeof(value) !== 'string' && value.length) {
      value.forEach(i => notify.show(i, "custom", 5000, myColor));
    } else {
      notify.show(value, "custom", 5000, myColor);
    }
  }
};

export const sendNotification = data =>{
    notify.show(data, "custom", 5000, myColor);
}