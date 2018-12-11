import { GET_ADMIN_USER } from "../actionTypes";
import { config } from '../../config';
import token from '../../helpers/jwtDecode';
import axios from "axios";


export const baseUrl = config.ANDELAEATS_API_BASE_URL;
export const userID = token().id;

export const setAdminUser = role => ({
    type: GET_ADMIN_USER,
    payload: role
  });

  export const getAdminUser = () => dispatch => {
    return axios.get(`${baseUrl}/roles/user/${userID}`)
      .then((response) => {
        dispatch(setAdminUser(response.data.payload.user_role[0].roleId));
      });
  };