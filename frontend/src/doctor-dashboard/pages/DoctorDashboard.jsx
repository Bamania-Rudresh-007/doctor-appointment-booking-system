import React, { useState, useMemo } from "react";
import { Clock, CheckCircle, XCircle, Users } from "lucide-react";
import StatCard from "../components/StatCard";
import FilterBar from "../components/FilterBar";
import AppointmentCard from "../components/AppointmentCard";
import { useDoctorContext } from "../context/DoctorContext";

const DoctorDashboard = () => {
    const { appointments } = useDoctorContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({ status: "", category: "" });

    // Calculate statistics
    const stats = useMemo(() => {
        const total = appointments.length;
        const pending = appointments.filter(
            (a) => a.status === "Pending",
        ).length;
        const completed = appointments.filter(
            (a) => a.status === "Completed",
        ).length;
        const cancelled = appointments.filter(
            (a) => a.status === "Cancelled",
        ).length;
        return { total, pending, completed, cancelled };
    }, [appointments]);

    // Filter appointments
    const filteredAppointments = useMemo(() => {
        return appointments.filter((apt) => {
            const matchesSearch =
                searchTerm === "" ||
                apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                apt.phoneNumber.includes(searchTerm);

            const matchesStatus =
                filters.status === "" || apt.status === filters.status;
            const matchesCategory =
                filters.category === "" || apt.category === filters.category;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [appointments, searchTerm, filters]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    States of current day:-
                </h1>
                <p className="text-gray-400">
                    Manage and monitor all your appointments for today
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard
                    title="Total Appointments"
                    count={stats.total}
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="Pending"
                    count={stats.pending}
                    icon={Clock}
                    color="yellow"
                />
                <StatCard
                    title="Completed"
                    count={stats.completed}
                    icon={CheckCircle}
                    color="green"
                />
                <StatCard
                    title="Cancelled"
                    count={stats.cancelled}
                    icon={XCircle}
                    color="red"
                />
            </div>

            {/* Filter Bar */}
            <FilterBar
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
            />

            {/* Appointments List */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                    Appointments List
                </h2>
                {filteredAppointments.length > 0 ? (
                    <div className="space-y-4">
                        {filteredAppointments.map((appointment) => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
                        <Users
                            size={48}
                            className="mx-auto text-gray-500 mb-4 opacity-50"
                        />
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">
                            No Appointments Found
                        </h3>
                        <p className="text-gray-400">
                            {searchTerm || filters.status || filters.category
                                ? "Try adjusting your search or filters"
                                : "No appointments scheduled for today"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
