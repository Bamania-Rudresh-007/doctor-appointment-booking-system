import React, { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { useDoctorContext } from "../context/DoctorContext";

const AppointmentsHistory = () => {
    const { appointments } = useDoctorContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [sortBy, setSortBy] = useState("date-desc");

    // Filter and sort appointments
    const filteredAppointments = useMemo(() => {
        let filtered = appointments.filter((apt) => {
            const matchesSearch =
                searchTerm === "" ||
                apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                apt.phoneNumber.includes(searchTerm);

            const matchesStatus =
                selectedStatus === "" || apt.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });

        // Sort
        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "date-desc":
                    return new Date(b.bookedDate) - new Date(a.bookedDate);
                case "date-asc":
                    return new Date(a.bookedDate) - new Date(b.bookedDate);
                case "name-asc":
                    return a.name.localeCompare(b.name);
                case "name-desc":
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

        return sorted;
    }, [appointments, searchTerm, selectedStatus, sortBy]);

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedStatus("");
        setSortBy("date-desc");
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Appointments History
                </h1>
                <p className="text-gray-400">
                    View all your past and current appointments
                </p>
            </div>

            {/* Filter Section */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 md:p-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search
                        size={20}
                        className="absolute left-3 top-3 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search by patient name or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Status
                        </label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Sort By */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Sort By
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                            <option value="date-desc">Latest First</option>
                            <option value="date-asc">Oldest First</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                        </select>
                    </div>

                    {/* Clear Filters */}
                    {(searchTerm ||
                        selectedStatus ||
                        sortBy !== "date-desc") && (
                        <div className="flex items-end">
                            <button
                                onClick={clearFilters}
                                className="flex items-center justify-center gap-2 px-4 py-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                            >
                                <X size={18} />
                                <span className="text-sm">Clear Filters</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Appointments Grid */}
            {filteredAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {filteredAppointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 md:p-6 hover:border-slate-600 hover:shadow-lg transition-all"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-white truncate">
                                        {appointment.name}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        📞 {appointment.phoneNumber}
                                    </p>
                                </div>
                                <StatusBadge status={appointment.status} />
                            </div>

                            {/* Category Badge */}
                            <div className="mb-4">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                                        appointment.category === "Emergency"
                                            ? "bg-red-600/20 text-red-400 border-red-500/30"
                                            : "bg-blue-600/20 text-blue-400 border-blue-500/30"
                                    }`}
                                >
                                    {appointment.category}
                                </span>
                            </div>

                            {/* Date and Time */}
                            <div className="space-y-2 mb-4 pb-4 border-b border-slate-700 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Appointment Date:
                                    </span>
                                    <span className="text-white font-semibold">
                                        {appointment.appointmentDate}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Appointment Time:
                                    </span>
                                    <span className="text-white font-semibold">
                                        {appointment.appointmentTime}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Booked On:
                                    </span>
                                    <span className="text-white font-semibold">
                                        {appointment.bookedDate}
                                    </span>
                                </div>
                            </div>

                            {/* Fee and Payment Status */}
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">
                                        Fee
                                    </p>
                                    <p className="text-xl font-bold text-green-400">
                                        ₹{appointment.fee}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">
                                        Payment Status
                                    </p>
                                    <span
                                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                                            appointment.feePaid
                                                ? "bg-green-600/20 text-green-400 border border-green-500/30"
                                                : "bg-red-600/20 text-red-400 border border-red-500/30"
                                        }`}
                                    >
                                        {appointment.feePaid
                                            ? "✓ Paid"
                                            : "✗ Unpaid"}
                                    </span>
                                </div>
                            </div>

                            {/* Symptoms */}
                            {appointment.symptoms && (
                                <div className="bg-slate-900/50 p-3 rounded-lg">
                                    <p className="text-xs text-gray-400 mb-1">
                                        Symptoms / Notes:
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        {appointment.symptoms}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
                    <p className="text-gray-400 text-lg">
                        {searchTerm || selectedStatus
                            ? "No appointments found matching your filters"
                            : "No appointment history available"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AppointmentsHistory;
