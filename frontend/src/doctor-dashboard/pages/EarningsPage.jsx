import React, { useMemo } from "react";
import { TrendingUp, DollarSign, CheckCircle, Clock } from "lucide-react";
import { useDoctorContext } from "../context/DoctorContext";

const EarningsPage = () => {
    const { appointments } = useDoctorContext();

    // Calculate earnings statistics
    const earningsStats = useMemo(() => {
        const totalFee = appointments.reduce((sum, apt) => sum + apt.fee, 0);
        const paidFee = appointments
            .filter((apt) => apt.feePaid)
            .reduce((sum, apt) => sum + apt.fee, 0);
        const unpaidFee = appointments
            .filter((apt) => !apt.feePaid)
            .reduce((sum, apt) => sum + apt.fee, 0);
        const completedCount = appointments.filter(
            (apt) => apt.status === "Completed",
        ).length;
        const pendingCount = appointments.filter(
            (apt) => apt.status === "Pending",
        ).length;

        return {
            totalFee,
            paidFee,
            unpaidFee,
            completedCount,
            pendingCount,
            totalAppointments: appointments.length,
        };
    }, [appointments]);

    // Get transactions list
    const transactions = useMemo(() => {
        return appointments
            .filter((apt) => apt.feePaid)
            .sort((a, b) => new Date(b.bookedDate) - new Date(a.bookedDate))
            .map((apt) => ({
                ...apt,
                transactionType: "Payment Received",
            }));
    }, [appointments]);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Earnings & Revenue
                </h1>
                <p className="text-gray-400">
                    Track your daily earnings and payment status
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Total Earnings */}
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-lg p-6 backdrop-blur-sm hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-400 text-sm font-medium">
                            Total Earnings
                        </p>
                        <DollarSign size={24} className="text-blue-400" />
                    </div>
                    <p className="text-3xl font-bold text-white">
                        ₹{earningsStats.totalFee}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        {earningsStats.totalAppointments} appointments
                    </p>
                </div>

                {/* Paid Amount */}
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-400 text-sm font-medium">
                            Amount Paid
                        </p>
                        <CheckCircle size={24} className="text-green-400" />
                    </div>
                    <p className="text-3xl font-bold text-green-400">
                        ₹{earningsStats.paidFee}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        {transactions.length} paid appointments
                    </p>
                </div>

                {/* Unpaid Amount */}
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-lg p-6 backdrop-blur-sm hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-400 text-sm font-medium">
                            Pending Payment
                        </p>
                        <Clock size={24} className="text-orange-400" />
                    </div>
                    <p className="text-3xl font-bold text-orange-400">
                        ₹{earningsStats.unpaidFee}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        {appointments.filter((a) => !a.feePaid).length} unpaid
                        appointments
                    </p>
                </div>

                {/* Completed Appointments */}
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-400 text-sm font-medium">
                            Completed
                        </p>
                        <TrendingUp size={24} className="text-purple-400" />
                    </div>
                    <p className="text-3xl font-bold text-purple-400">
                        {earningsStats.completedCount}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        {earningsStats.pendingCount} still pending
                    </p>
                </div>
            </div>

            {/* Earnings Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Summary Cards */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-6">
                        Payment Summary
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                            <span className="text-gray-400">
                                Total Appointments
                            </span>
                            <span className="text-xl font-bold text-white">
                                {earningsStats.totalAppointments}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                            <span className="text-gray-400">Completed</span>
                            <span className="text-xl font-bold text-green-400">
                                {earningsStats.completedCount}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                            <span className="text-gray-400">Pending</span>
                            <span className="text-xl font-bold text-orange-400">
                                {earningsStats.pendingCount}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-400">Cancelled</span>
                            <span className="text-xl font-bold text-red-400">
                                {
                                    appointments.filter(
                                        (a) => a.status === "Cancelled",
                                    ).length
                                }
                            </span>
                        </div>
                    </div>
                </div>

                {/* Revenue Distribution */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-6">
                        Revenue Distribution
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-400 text-sm">
                                    Received
                                </span>
                                <span className="text-white font-bold">
                                    {earningsStats.totalFee > 0
                                        ? Math.round(
                                              (earningsStats.paidFee /
                                                  earningsStats.totalFee) *
                                                  100,
                                          )
                                        : 0}
                                    %
                                </span>
                            </div>
                            <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                                    style={{
                                        width: `${
                                            earningsStats.totalFee > 0
                                                ? (earningsStats.paidFee /
                                                      earningsStats.totalFee) *
                                                  100
                                                : 0
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-400 text-sm">
                                    Pending
                                </span>
                                <span className="text-white font-bold">
                                    {earningsStats.totalFee > 0
                                        ? Math.round(
                                              (earningsStats.unpaidFee /
                                                  earningsStats.totalFee) *
                                                  100,
                                          )
                                        : 0}
                                    %
                                </span>
                            </div>
                            <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all"
                                    style={{
                                        width: `${
                                            earningsStats.totalFee > 0
                                                ? (earningsStats.unpaidFee /
                                                      earningsStats.totalFee) *
                                                  100
                                                : 0
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-white mb-6">
                        Quick Stats
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">
                                Total Revenue
                            </p>
                            <p className="text-2xl font-bold text-blue-400">
                                ₹{earningsStats.totalFee}
                            </p>
                        </div>
                        <div className="p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">
                                Received
                            </p>
                            <p className="text-2xl font-bold text-green-400">
                                ₹{earningsStats.paidFee}
                            </p>
                        </div>
                        <div className="p-4 bg-orange-600/20 border border-orange-500/30 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">
                                Pending
                            </p>
                            <p className="text-2xl font-bold text-orange-400">
                                ₹{earningsStats.unpaidFee}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                    <h3 className="text-lg font-bold text-white">
                        Recent Payments Received
                    </h3>
                </div>

                {transactions.length > 0 ? (
                    <div className="divide-y divide-slate-700">
                        {transactions.slice(0, 8).map((transaction) => (
                            <div
                                key={transaction.id}
                                className="p-4 md:p-6 hover:bg-slate-800/50 transition-colors flex items-center justify-between gap-4"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-white truncate">
                                        {transaction.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {transaction.appointmentDate}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-green-400">
                                        +₹{transaction.fee}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {transaction.category}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <p className="text-gray-400">
                            No payments received yet
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EarningsPage;
