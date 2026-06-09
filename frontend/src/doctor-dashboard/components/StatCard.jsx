import React from "react";
import { Clock, CheckCircle, XCircle, Users } from "lucide-react";

const StatCard = ({ title, count, icon: Icon, color }) => {
    const colorStyles = {
        blue: "bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400",
        yellow: "bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400",
        green: "bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30 text-green-400",
        red: "bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/30 text-red-400",
    };

    return (
        <div
            className={`border rounded-lg p-6 backdrop-blur-sm transition-all hover:shadow-lg ${colorStyles[color] || colorStyles.blue}`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-medium mb-2">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-white">{count}</p>
                </div>
                <div className="p-3 rounded-lg bg-black/30">
                    <Icon size={28} className="text-current" />
                </div>
            </div>
        </div>
    );
};

export default StatCard;
