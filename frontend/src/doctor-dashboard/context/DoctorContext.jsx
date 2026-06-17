import React, { createContext, useState, useCallback, useEffect } from "react";
import userService from "../../api/userService";
import {
    saveDoctorLogin,
    getDoctorAuth,
    getAccessToken,
    saveAccessToken,
    logoutDoctor,
} from "../utils/localStorage";

export const DoctorContext = createContext();

const mapAppointmentFromApi = (apt) => ({
    ...apt,
    id: apt._id || apt.id,
    category: apt.category
        ? apt.category.charAt(0).toUpperCase() + apt.category.slice(1).toLowerCase()
        : apt.category,
    bookedDate: apt.createdAt
        ? new Date(apt.createdAt).toLocaleDateString("en-US", { dateStyle: "short" })
        : apt.bookedDate || "",
});

export const DoctorProvider = ({ children }) => {
    const [doctorAuth, setDoctorAuth] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAppointments = useCallback(async () => {
        const response = await userService.getAllAppointments();
        const list = response?.data?.appointments || [];
        setAppointments(list.map(mapAppointmentFromApi));
    }, []);

    useEffect(() => {
        const init = async () => {
            try {
                setLoading(true);
                setError(null);
                const token = getAccessToken();
                const auth = getDoctorAuth();
                if (token && auth) {
                    setDoctorAuth(auth);
                    await fetchAppointments();
                }
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                        err.message ||
                        "Failed to load appointments",
                );
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [fetchAppointments]);

    const login = useCallback(
        async (email, password) => {
            setError(null);
            const response = await userService.login({ email, password });
            if (!response?.success) {
                throw new Error(response?.message || "Login failed");
            }
            saveAccessToken(response.data.accessToken);
            const doctor = saveDoctorLogin(email);
            setDoctorAuth(doctor);
            await fetchAppointments();
            return doctor;
        },
        [fetchAppointments],
    );

    const logout = useCallback(async () => {
        try {
            await userService.logout();
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            logoutDoctor();
            setDoctorAuth(null);
            setAppointments([]);
            setError(null);
        }
    }, []);

    const updateStatus = useCallback(async (appointmentId, status) => {
        try {
            setError(null);
            const response = await userService.updateAppointment({
                _id: appointmentId,
                changes: { status },
            });
            const updated = response?.data?.appointment;
            if (updated) {
                setAppointments((prev) =>
                    prev.map((apt) =>
                        apt.id === appointmentId
                            ? mapAppointmentFromApi(updated)
                            : apt,
                    ),
                );
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Failed to update appointment status",
            );
            throw err;
        }
    }, []);

    const updateFeePaid = useCallback(async (appointmentId, feePaid) => {
        try {
            setError(null);
            const response = await userService.updateAppointment({
                _id: appointmentId,
                changes: { feePaid },
            });
            const updated = response?.data?.appointment;
            if (updated) {
                setAppointments((prev) =>
                    prev.map((apt) =>
                        apt.id === appointmentId
                            ? mapAppointmentFromApi(updated)
                            : apt,
                    ),
                );
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Failed to update payment status",
            );
            throw err;
        }
    }, []);

    const value = {
        doctorAuth,
        appointments,
        loading,
        error,
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
