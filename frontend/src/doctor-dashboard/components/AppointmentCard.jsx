import React, { useState, useEffect } from "react";
import { ChevronDown, Eye, AlertCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { useDoctorContext } from "../context/DoctorContext";

const AppointmentCard = ({ appointment, onStatusChange, onFeePaidChange }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const { updateStatus, updateFeePaid } = useDoctorContext();

    const handleStatusChange = (newStatus) => {
        updateStatus(appointment.id, newStatus);
        setShowStatusMenu(false);
    };

    const handleFeePaidToggle = () => {
        updateFeePaid(appointment.id, !appointment.feePaid);
    };

    const categoryColor =
        appointment.category === "Emergency"
            ? "bg-red-600/20 text-red-400 border-red-500/30"
            : "bg-blue-600/20 text-blue-400 border-blue-500/30";

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden transition-all hover:border-slate-600 hover:shadow-lg">
            {/* Card Header */}
            <div className="p-4 md:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <h3 className="text-lg font-bold text-white truncate">
                                {appointment.name}
                            </h3>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColor}`}
                            >
                                {appointment.category}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                            📞 {appointment.phoneNumber}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-3">
                            <span>📅 {appointment.appointmentDate}</span>
                            <span>⏰ {appointment.appointmentTime}</span>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-2">
                        <StatusBadge status={appointment.status} />
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-gray-300 hover:text-white cursor-pointer flex items-center gap-1 text-sm font-semibold"
                        >
                            <ChevronDown
                                size={20}
                                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} 
                            />
                            More Info 
                        </button>
                    </div>
                </div>

                {/* Fee Info */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Fee</p>
                        <p className="text-xl font-bold text-green-400">
                            ₹{appointment.fee}
                        </p>
                    </div>
                    <button
                        onClick={handleFeePaidToggle}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                            appointment.feePaid
                                ? "bg-green-600/20 text-green-400 border border-green-500/30"
                                : "bg-slate-700/50 text-gray-400 border border-slate-600 hover:bg-slate-700"
                        }`}
                    >
                        {appointment.feePaid ? "✓ Paid" : "Mark Paid"}
                    </button>
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="border-t border-slate-700 p-4 md:p-6 bg-slate-900/50 space-y-4">
                    {/* Symptoms Section */}
                    {appointment.symptoms && (
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle
                                    size={18}
                                    className="text-blue-400"
                                />
                                <p className="text-sm font-semibold text-gray-300">
                                    Symptoms / Notes
                                </p>
                            </div>
                            <p className="text-sm text-gray-400 bg-slate-800/50 p-3 rounded-lg">
                                {appointment.symptoms}
                            </p>
                        </div>
                    )}

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-400">Payment Method</p>
                            <p className="text-gray-200">
                                {appointment.paymentMethod}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Booked Date</p>
                            <p className="text-gray-200">
                                {appointment.bookedDate}
                            </p>
                        </div>
                    </div>

                    {/* Status Update */}
                    <div className="mt-2">
                        <p className="text-sm font-semibold text-gray-300 mb-2">
                            Update Status
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {["Pending", "Completed", "Cancelled"].map((status) => {
                                const isActive = appointment.status === status;
                                const colorMap = {
                                    Pending:   isActive ? "bg-yellow-600/30 text-yellow-400 border-yellow-500/40" : "text-gray-400 border-slate-600 hover:bg-yellow-600/10 hover:text-yellow-400 hover:border-yellow-500/30 cursor-pointer",
                                    Completed: isActive ? "bg-green-600/30 text-green-400 border-green-500/40"   : "text-gray-400 border-slate-600 hover:bg-green-600/10 hover:text-green-400 hover:border-green-500/30 cursor-pointer",
                                    Cancelled: isActive ? "bg-red-600/30 text-red-400 border-red-500/40"         : "text-gray-400 border-slate-600 hover:bg-red-600/10 hover:text-red-400 hover:border-red-500/30 cursor-pointer",
                                };
                                return (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusChange(status)}
                                        className={`flex-1 min-w-[90px] px-3 py-2 rounded-lg text-sm font-semibold border transition-all ${colorMap[status]}`}
                                    >
                                        {status === "Pending" && "🕐 "}
                                        {status === "Completed" && "✓ "}
                                        {status === "Cancelled" && "✕ "}
                                        {status}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentCard;
