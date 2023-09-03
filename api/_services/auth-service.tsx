import * as api from "../index";
import {LoginValues} from "../../components/Login/Login";

export const AuthService = {
    login,
};

async function login(formData: LoginValues) {
    try {
        const {data} = await api.signIn(formData);

        return {isSuccess: true, data: data.data};
    } catch (error) {

        return {isSuccess: false, data: error};
    }
}