import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import DashboardPage from "./components/pages/DashboardPage.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import EducationCenter from "./components/EducationCenter.jsx";
import ArticleDetail from "./components/ArticleDetail.jsx";
import SignupForm from "./components/auth/SignupForm.jsx";
import About from "./components/pages/About.jsx";
import ContactUs from "./components/pages/ContactUs.jsx";
import AnalyticsPage from "./components/pages/AnalyticsPage.jsx";
import PrivacyPolicy from "./components/pages/PrivacyPolicy.jsx";
import TermsOfService from "./components/pages/TermsOfService.jsx";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import checkUserAuthLoader from "./AuthLoader.js";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="/education-center" element={<EducationCenter />} />
        <Route path="/education-center/article/:id" element={<ArticleDetail />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route
          path="/dashboard"
          element={<DashboardPage />}
          loader={checkUserAuthLoader}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
