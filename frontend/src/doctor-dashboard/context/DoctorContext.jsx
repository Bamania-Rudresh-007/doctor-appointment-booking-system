import React, { createContext, useState, useCallback, useEffect } from "react";
import {
    saveDoctorLogin,
    getDoctorAuth,
    getDoctorAppointments,
    updateAppointmentStatus,
    updateAppointmentFeePaid,
    logoutDoctor,
    initializeDoctorData,
} from "../utils/localStorage";

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
    const [doctorAuth, setDoctorAuth] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initialize doctor data on mount
    useEffect(() => {
        initializeDoctorData();
        const auth = getDoctorAuth();
        if (auth) {
            setDoctorAuth(auth);
            setAppointments(getDoctorAppointments());
        }
        setLoading(false);
    }, []);

    const login = useCallback((email, password) => {
        const doctor = saveDoctorLogin(email, password);
        setDoctorAuth(doctor);
        setAppointments(getDoctorAppointments());
        return doctor;
    }, []);

    const logout = useCallback(() => {
        logoutDoctor();
        setDoctorAuth(null);
        setAppointments([]);
    }, []);

    const updateStatus = useCallback((appointmentId, status) => {
        const updated = updateAppointmentStatus(appointmentId, status);
        setAppointments(updated);
    }, []);

    const updateFeePaid = useCallback((appointmentId, feePaid) => {
        const updated = updateAppointmentFeePaid(appointmentId, feePaid);
        setAppointments(updated);
    }, []);

    const value = {
        doctorAuth,
        appointments,
        loading,
        login,
        logout,
        updateStatus,
        updateFeePaid,
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};

export const useDoctorContext = () => {
    const context = React.useContext(DoctorContext);
    if (!context) {
        throw new Error("useDoctorContext must be used within DoctorProvider");
    }
    return context;
};
