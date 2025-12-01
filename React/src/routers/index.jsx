
import { AUTHENTICATE_STATUS, useAuthenticate } from '@src/contexts/AuthenticateContext';
import { ROLES } from '@src/enums';
import AdminLayout from '@src/layouts/AdminLayout';
import MainLayout from '@src/layouts/Main';
import AboutPage from '@src/pages/AboutPage';
import AdminAppointmentsPage from '@src/pages/AdminAppointmentsPage';
import AdminCustomersPage from '@src/pages/AdminCustomersPage';
import AdminDashboard from '@src/pages/AdminDashboard';
import AdminPromotionsPage from '@src/pages/AdminPromotionsPage';
import AdminReportsPage from '@src/pages/AdminReportsPage';
import AdminServicesPage from '@src/pages/AdminServicesPage';
import AdminSettingsPage from '@src/pages/AdminSettingsPage';
import AdminUsersPage from '@src/pages/AdminUsersPage';
import BookingPage from '@src/pages/BookingPage';
import BookingVNPayPage from '@src/pages/BookingVNPayPage';
import ContactPage from '@src/pages/ContactPage';
import CustomerSettingsPage from '@src/pages/CustomerSettingsPage';
import ForgotPage from '@src/pages/ForgotPage';
import HomePage from '@src/pages/HomePage';
import LoginPage from '@src/pages/LoginPage';
import MaintenancePage from '@src/pages/MaintenancePage';
import ManageAppointmentsPage from '@src/pages/ManageAppointmentsPage';
import MyAppointmentsPage from '@src/pages/MyAppointmentsPage';
import ProfilePage from '@src/pages/ProfilePage';
import RegisterPage from '@src/pages/RegisterPage';
import ResetPage from '@src/pages/ResetPage';
import ServicesPage from '@src/pages/ServicesPage';
import { Navigate, Route, Routes } from 'react-router-dom';





const AppRouter = () => {

    const { store } = useAuthenticate()


    if (store.status === AUTHENTICATE_STATUS.LOADING) {
        return null;
    }

    if (store.status === AUTHENTICATE_STATUS.UNAUTHENTICATED) {
        return (
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="*" element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="booking" element={<BookingPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="forgot-password" element={<ForgotPage />} />
                    <Route path="reset-password" element={<ResetPage />} />

                </Route>
                <Route path="maintenance" element={<MaintenancePage />} />
            </Routes>
        )
    }

    if (store?.user?.role === ROLES.ADMIN.value) {

        return (
            <Routes>
                <Route path="*" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="booking" element={<BookingPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="my-appointments" element={<MyAppointmentsPage />} />

                    <Route path="settings" element={<CustomerSettingsPage />} />
                </Route>
                <Route
                    path="/manage"
                    element={<AdminLayout />}
                >
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="services" element={<AdminServicesPage />} />
                    <Route path="appointments" element={<AdminAppointmentsPage />} />
                    <Route path="customers" element={<AdminCustomersPage />} />
                    <Route path="users" element={<AdminUsersPage />} />
                    <Route path="promotions" element={<AdminPromotionsPage />} />
                    <Route path="reports" element={<AdminReportsPage />} />
                    <Route path="settings" element={<AdminSettingsPage />} />
                    <Route element={<Navigate to="/manage/dashboard" replace />} />
                </Route>
            </Routes>

        )

    }

    if (store?.user?.role === ROLES.STAFF.value) {

        return (
            <Routes>
                <Route path="*" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="booking" element={<BookingPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="manage/appointments" element={<ManageAppointmentsPage />} />
                    <Route path="settings" element={<CustomerSettingsPage />} />
                </Route>
                <Route path="maintenance" element={<MaintenancePage />} />
            </Routes>

        )

    }



    return (
        <Routes>
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/" element={<MainLayout />} >
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="booking" element={<BookingPage />} />
                <Route path="booking/vn-pay" element={<BookingVNPayPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="my-appointments" element={<MyAppointmentsPage />} />
                <Route path="settings" element={<CustomerSettingsPage />} />

            </Route>
        </Routes>
    );
};

export default AppRouter;
