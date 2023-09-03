import axios from "axios";


const interceptor = axios.create({
    baseURL:
        process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_API_DEV
            : process.env.REACT_APP_API_PROD,
});

interceptor.interceptors.request.use(
    (req) => {
        // if (store.getState().auth.authData) {
        //     let decryptedDefaultData = getSate(store.getState().auth.authData);
        //     req.headers[
        //         "Authorization"
        //         ] = `Bearer ${decryptedDefaultData.token}`;
        // }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
)

interceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            // openErrorDialog(error.response.data.status, error.response.data.comment);
            // store.dispatch(getLogout());
            // window.location.replace("/login");
        } else {
            // openErrorDialog(error.response.data.status, error.response.data.comment);
        }
    }
);

export default interceptor;