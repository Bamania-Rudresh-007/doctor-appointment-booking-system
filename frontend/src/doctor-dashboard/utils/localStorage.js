import { DUMMY_APPOINTMENTS, DOCTOR_DUMMY_LOGIN } from "./dummyData";

const STORAGE_KEYS = {
    DOCTOR_AUTH: "doctor_auth",
    DOCTOR_APPOINTMENTS: "doctor_appointments",
};

export const initializeDoctorData = () => {
    if (!localStorage.getItem(STORAGE_KEYS.DOCTOR_APPOINTMENTS)) {
        localStorage.setItem(
            STORAGE_KEYS.DOCTOR_APPOINTMENTS,
            JSON.stringify(DUMMY_APPOINTMENTS),
        );
    }
};

export const saveDoctorLogin = (email, password) => {
    const doctorData = {
        email,
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
        ...DOCTOR_DUMMY_LOGIN,
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
};

export const isDoctorAuthenticated = () => {
    const auth = getDoctorAuth();
    return auth && auth.isAuthenticated;
};
