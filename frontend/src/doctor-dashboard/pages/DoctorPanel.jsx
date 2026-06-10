import React, { useState } from "react";
import DoctorSidebar from "../components/DoctorSidebar";
import DoctorDashboard from "./DoctorDashboard";
import AppointmentsHistory from "./AppointmentsHistory";
import EarningsPage from "./EarningsPage";
import { useDoctorContext } from "../context/DoctorContext.jsx";

const DoctorPanel = ({ onLogout }) => {
    const [currentPage, setCurrentPage] = useState("dashboard");
    const { logout } = useDoctorContext();

    const renderPage = () => {
        switch (currentPage) {
            case "dashboard":
                return <DoctorDashboard />;
            case "history":
                return <AppointmentsHistory />;
            case "earnings":
                return <EarningsPage />;
            default:
                return <DoctorDashboard />;
        }
    };

    const handleLogout = () => {
        logout();
        onLogout();
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden">
            {/* Sidebar */}
            <DoctorSidebar
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-auto md:ml-64">
                {/* Mobile padding for fixed menu button */}
                <div className="p-4 md:p-8 pt-16 md:pt-8">{renderPage()}</div>
            </main>
        </div>
    );
};

export default DoctorPanel;
