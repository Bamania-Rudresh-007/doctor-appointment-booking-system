import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";

const FilterBar = ({ onFilterChange, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        onSearch(value);
    };

    const handleStatusChange = (value) => {
        setSelectedStatus(value);
        onFilterChange({ status: value, category: selectedCategory });
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        onFilterChange({ status: selectedStatus, category: value });
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedStatus("");
        setSelectedCategory("");
        onSearch("");
        onFilterChange({ status: "", category: "" });
    };

    return (
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
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
            </div>

            {/* Filters Toggle Button (Mobile) */}
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-600/30 transition-colors"
            >
                <Filter size={18} />
                <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
            </button>

            {/* Filters (Hidden on mobile by default) */}
            <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
                    showFilters ? "block" : "hidden md:grid"
                }`}
            >
                {/* Status Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                    </label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                        <option value="">All Categories</option>
                        <option value="Regular">Regular</option>
                        <option value="Emergency">Emergency</option>
                    </select>
                </div>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || selectedStatus || selectedCategory) && (
                <button
                    onClick={clearFilters}
                    className="flex items-center justify-center gap-2 px-4 py-2 w-full md:w-auto bg-slate-700/50 border border-slate-600 rounded-lg text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                    <X size={18} />
                    <span className="text-sm">Clear Filters</span>
                </button>
            )}
        </div>
    );
};

export default FilterBar;
