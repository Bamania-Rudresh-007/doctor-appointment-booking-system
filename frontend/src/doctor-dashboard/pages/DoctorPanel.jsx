import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import DoctorSidebar from "../components/DoctorSidebar";
import { useDoctorContext } from "../context/DoctorContext.jsx";
import Loader from "../../components/Loader";

const DoctorPanel = () => {
    const { logout, loading, error } = useDoctorContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-linear-to-br from-slate-900 to-slate-950">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-linear-to-br from-slate-900 to-slate-950 overflow-hidden">
            {/* Sidebar */}
            <DoctorSidebar onLogout={handleLogout} />

            {/* Main Content */}
            <main className="flex-1 overflow-auto md:ml-64">
                {/* Mobile padding for fixed menu button */}
                <div className="p-4 md:p-8 pt-16 md:pt-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg flex items-center gap-3">
                            <AlertCircle
                                size={20}
                                className="text-red-400 shrink-0"
                            />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DoctorPanel;
