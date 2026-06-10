import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DoctorSidebar from "../components/DoctorSidebar";
import { useDoctorContext } from "../context/DoctorContext.jsx";

const DoctorPanel = () => {
    const { logout } = useDoctorContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="flex h-screen bg-linear-to-br from-slate-900 to-slate-950 overflow-hidden">
            {/* Sidebar */}
            <DoctorSidebar onLogout={handleLogout} />

            {/* Main Content */}
            <main className="flex-1 overflow-auto md:ml-64">
                {/* Mobile padding for fixed menu button */}
                <div className="p-4 md:p-8 pt-16 md:pt-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DoctorPanel;
