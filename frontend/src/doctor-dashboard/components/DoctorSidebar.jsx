import React, { useState } from "react";
import {
    LayoutDashboard,
    Calendar,
    TrendingUp,
    LogOut,
    Menu,
    X,
    ChevronRight,
} from "lucide-react";
import { useDoctorContext } from "../context/DoctorContext.jsx";

const DoctorSidebar = ({ currentPage, onNavigate, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { doctorAuth } = useDoctorContext();

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "history", label: "Appointment History", icon: Calendar },
        { id: "earnings", label: "Earnings", icon: TrendingUp },
    ];

    const handleNavigation = (pageId) => {
        onNavigate(pageId);
        setIsOpen(false);
    };

    const handleLogout = () => {
        onLogout();
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 rounded-lg text-white"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-700 transition-transform duration-300 z-40 ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="p-6 border-b border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">M</span>
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-lg">
                                    MedFlow
                                </h1>
                                <p className="text-xs text-gray-400">
                                    Doctor Portal
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="p-4 mx-3 mt-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                        <p className="text-xs text-gray-400">Logged in as</p>
                        <p className="text-sm font-semibold text-white truncate">
                            {doctorAuth?.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                            {doctorAuth?.email}
                        </p>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 px-3 py-6 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
                                            : "text-gray-400 hover:bg-slate-800 hover:text-white"
                                    }`}
                                >
                                    <Icon size={20} />
                                    <span className="flex-1 text-left font-medium">
                                        {item.label}
                                    </span>
                                    {isActive && <ChevronRight size={18} />}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-3 border-t border-slate-700">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-all cursor-pointer"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 md:hidden z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default DoctorSidebar;
