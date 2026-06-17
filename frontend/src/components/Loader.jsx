import React from "react";

const Loader = ({ className = "" }) => {
    return (
        <div
            className={`flex items-center justify-center ${className}`}
            role="status"
            aria-label="Loading"
        >
            <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
    );
};

export default Loader;
