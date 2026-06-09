import React from "react";
import { Check, Clock, X } from "lucide-react";

const StatusBadge = ({ status }) => {
    const statusStyles = {
        Pending: {
            bg: "bg-yellow-100 dark:bg-yellow-900/30",
            text: "text-yellow-700 dark:text-yellow-400",
            icon: Clock,
            label: "Pending",
        },
        Completed: {
            bg: "bg-green-100 dark:bg-green-900/30",
            text: "text-green-700 dark:text-green-400",
            icon: Check,
            label: "Completed",
        },
        Cancelled: {
            bg: "bg-red-100 dark:bg-red-900/30",
            text: "text-red-700 dark:text-red-400",
            icon: X,
            label: "Cancelled",
        },
    };

    const style = statusStyles[status] || statusStyles.Pending;
    const Icon = style.icon;

    return (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${style.bg} ${style.text}`}
        >
            <Icon size={16} />
            <span className="text-sm font-medium">{style.label}</span>
        </div>
    );
};

export default StatusBadge;
