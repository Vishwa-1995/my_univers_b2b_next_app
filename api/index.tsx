import api from "./interceptor";

export const signIn = (formData: { email: string, password: string }) => {
    let postData = {
        email: formData.email,
        password: formData.password,
    };

    return api.post("/api/v1/login", postData);
};