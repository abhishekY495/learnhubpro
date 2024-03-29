import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { CoursePage } from "./pages/CoursePage";
import { EnrolledCoursePage } from "./pages/EnrolledCoursePage";

export const App = () => {
  return (
    <div className="mb-36">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route
          path="/enrolledcourse/:id"
          element={
            <ProtectedRoute>
              <EnrolledCoursePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};
