import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useDoctorContext } from "../context/DoctorContext";
import { DOCTOR_DUMMY_LOGIN } from "../utils/dummyData";

const DoctorLogin = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useDoctorContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Validate inputs
        if (!email || !password) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        // Simulate login (In production, this would call backend API)
        setTimeout(() => {
            try {
                login(email, password);
                setIsLoading(false);
                onLoginSuccess();
            } catch (err) {
                setError("Login failed. Please try again.");
                setIsLoading(false);
            }
        }, 500);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
            style={{
                background: "#0f172a",
                backgroundImage:
                    "radial-gradient(at 20% 80%, rgba(59,130,246,0.15) 0, transparent 50%), radial-gradient(at 80% 20%, rgba(147,51,234,0.1) 0, transparent 50%)",
            }}
        >
            {/* Background Elements */}
            <div
                className="fixed pointer-events-none"
                style={{
                    top: "10%",
                    left: "-5%",
                    width: "40vw",
                    height: "40vw",
                    background:
                        "linear-gradient(45deg, rgba(59,130,246,0.1), rgba(147,51,234,0.08))",
                    borderRadius: "43% 57% 41% 59% / 57% 45% 55% 43%",
                    filter: "blur(50px)",
                    zIndex: 0,
                }}
            />

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/50">
                                <span className="text-white font-bold text-2xl">
                                    M
                                </span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            MedFlow
                        </h1>
                        <p className="text-gray-400">Doctor's Admin Panel</p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg flex items-gap-3">
                            <AlertCircle
                                size={20}
                                className="text-red-400 flex-shrink-0"
                            />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Demo Credentials Info */}
                    <div className="mb-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                        <p className="text-xs text-gray-400 mb-2 font-semibold">
                            Demo Credentials:
                        </p>
                        <p className="text-xs text-blue-400 font-mono break-all mb-1">
                            Email: {DOCTOR_DUMMY_LOGIN.email}
                        </p>
                        <p className="text-xs text-blue-400 font-mono break-all">
                            Password: {DOCTOR_DUMMY_LOGIN.password}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={20}
                                    className="absolute left-3 top-3 text-gray-500"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="doctor@carefirst.com"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={20}
                                    className="absolute left-3 top-3 text-gray-500"
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-400 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/50 hover:shadow-blue-600/70 disabled:shadow-none"
                        >
                            {isLoading ? "Logging in..." : "Login to Dashboard"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-xs text-gray-500 mt-6">
                        For demo purposes only. In production, credentials will
                        be verified with backend API.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DoctorLogin;
