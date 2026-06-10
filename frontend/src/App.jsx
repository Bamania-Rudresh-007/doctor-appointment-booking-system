import React from "react";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import Header from "./components/Header";
import FormCard from "./components/FormCard";
import Sidebar from "./components/Sidebar";
import ReceiptCard from "./components/ReceiptCard";
import { useAppointment } from "./context/AppointmentContext";
import {
    DoctorProvider,
    useDoctorContext,
} from "./doctor-dashboard/context/DoctorContext";
import DoctorLogin from "./doctor-dashboard/pages/DoctorLogin";
import DoctorPanel from "./doctor-dashboard/pages/DoctorPanel";
import DoctorDashboard from "./doctor-dashboard/pages/DoctorDashboard";
import AppointmentsHistory from "./doctor-dashboard/pages/AppointmentsHistory";
import EarningsPage from "./doctor-dashboard/pages/EarningsPage";

const ClientHomePage = () => {
    const { isBooked } = useAppointment();
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen relative"
            style={{
                background: "#f3f4f6",
                backgroundImage:
                    "radial-gradient(at 0% 0%, rgba(219,234,254,0.6) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(243,232,255,0.7) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(224,242,254,0.6) 0, transparent 50%), radial-gradient(at 0% 100%, rgba(253,226,226,0.5) 0, transparent 50%), linear-gradient(135deg, rgba(239,246,255,0.4) 0%, rgba(245,243,255,0.4) 100%)",
            }}
        >
            {/* Dynamic Background Elements */}
            <div
                className="fixed pointer-events-none"
                style={{
                    top: "20%",
                    left: "-10%",
                    width: "40vw",
                    height: "40vw",
                    background:
                        "linear-gradient(45deg, rgba(59,130,246,0.12), rgba(147,51,234,0.08))",
                    borderRadius: "43% 57% 41% 59% / 57% 45% 55% 43%",
                    filter: "blur(40px)",
                    zIndex: 0,
                }}
            />
            <div
                className="fixed pointer-events-none"
                style={{
                    bottom: "-5%",
                    right: "-5%",
                    width: "35vw",
                    height: "35vw",
                    background:
                        "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(59,130,246,0.08))",
                    borderRadius: "50% 50% 30% 70% / 50% 60% 40% 50%",
                    filter: "blur(50px)",
                    zIndex: 0,
                }}
            />

            <Header onDoctorClick={() => navigate("/login")} />

            <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                {!isBooked ? (
                    <>
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-6 tracking-tight">
                                Your Health Is Our{" "}
                                <span className="text-blue-600">
                                    Top Priority
                                </span>
                            </h2>
                            <p className="text-lg text-gray-500 font-medium leading-relaxed">
                                Book an appointment with our experienced local
                                doctor in under 2 minutes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                            <div className="lg:col-span-2">
                                <FormCard />
                            </div>
                            <div className="lg:col-span-1">
                                <Sidebar />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="py-10">
                        <ReceiptCard />
                    </div>
                )}
            </main>

            <footer className="text-center py-12 text-gray-400 text-sm">
                <p>
                    © {new Date().getFullYear()} CareFirst Clinic. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
};

const DoctorRouteGuard = () => {
    const { doctorAuth, loading } = useDoctorContext();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen bg-slate-950" />;
    }

    if (!doctorAuth) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

const PublicDoctorRoute = () => {
    const { doctorAuth, loading } = useDoctorContext();

    if (loading) {
        return <div className="min-h-screen bg-slate-950" />;
    }

    if (doctorAuth) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

const App = () => {
    return (
        <DoctorProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ClientHomePage />} />
                    <Route element={<PublicDoctorRoute />}>
                        <Route path="/login" element={<DoctorLogin />} />
                    </Route>
                    <Route element={<DoctorRouteGuard />}>
                        <Route path="/admin" element={<DoctorPanel />}>
                            <Route index element={<DoctorDashboard />} />
                        </Route>
                        <Route path="/history" element={<DoctorPanel />}>
                            <Route index element={<AppointmentsHistory />} />
                        </Route>
                        <Route path="/earnings" element={<DoctorPanel />}>
                            <Route index element={<EarningsPage />} />
                        </Route>
                        <Route
                            path="/earnigns"
                            element={<Navigate to="/earnings" replace />}
                        />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </DoctorProvider>
    );
};

export default App;
