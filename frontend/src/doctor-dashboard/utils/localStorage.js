import { DUMMY_APPOINTMENTS, DOCTOR_DUMMY_LOGIN } from "./dummyData";

const STORAGE_KEYS = {
    DOCTOR_AUTH: "doctor_auth",
    DOCTOR_APPOINTMENTS: "doctor_appointments",
    ACCESS_TOKEN: "accessToken",
};

export const saveAccessToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

export const getAccessToken = () => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const clearAccessToken = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const initializeDoctorData = () => {
    if (!localStorage.getItem(STORAGE_KEYS.DOCTOR_APPOINTMENTS)) {
        localStorage.setItem(
            STORAGE_KEYS.DOCTOR_APPOINTMENTS,
            JSON.stringify(DUMMY_APPOINTMENTS),
        );
    }
};

export const saveDoctorLogin = (email) => {
    const doctorData = {
        email,
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
        name: DOCTOR_DUMMY_LOGIN.name,
        specialization: DOCTOR_DUMMY_LOGIN.specialization,
        clinicName: DOCTOR_DUMMY_LOGIN.clinicName,
    };
    localStorage.setItem(STORAGE_KEYS.DOCTOR_AUTH, JSON.stringify(doctorData));
    return doctorData;
};

export const getDoctorAuth = () => {
    const data = localStorage.getItem(STORAGE_KEYS.DOCTOR_AUTH);
    return data ? JSON.parse(data) : null;
};

export const getDoctorAppointments = () => {
    const data = localStorage.getItem(STORAGE_KEYS.DOCTOR_APPOINTMENTS);
    return data ? JSON.parse(data) : [];
};

export const updateDoctorAppointments = (appointments) => {
    localStorage.setItem(
        STORAGE_KEYS.DOCTOR_APPOINTMENTS,
        JSON.stringify(appointments),
    );
};

export const updateAppointmentStatus = (appointmentId, status) => {
    const appointments = getDoctorAppointments();
    const updated = appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status } : apt,
    );
    updateDoctorAppointments(updated);
    return updated;
};

export const updateAppointmentFeePaid = (appointmentId, feePaid) => {
    const appointments = getDoctorAppointments();
    const updated = appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, feePaid } : apt,
    );
    updateDoctorAppointments(updated);
    return updated;
};

export const logoutDoctor = () => {
    localStorage.removeItem(STORAGE_KEYS.DOCTOR_AUTH);
    clearAccessToken();
};

export const isDoctorAuthenticated = () => {
    return Boolean(getAccessToken() && getDoctorAuth()?.isAuthenticated);
};
