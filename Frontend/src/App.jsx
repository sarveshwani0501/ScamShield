import React, { useState } from "react";
//import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import EducationCenter from "./components/EducationCenter";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import Settings from "./components/Settings";

function App() {
  // const [currentPage, setCurrentPage] = useState("home");

  // const renderPage = () => {
  //   switch (currentPage) {
  //     case "home":
  //       return <HomePage onPageChange={setCurrentPage} />;
  //     case "dashboard":
  //       return <DashboardPage onPageChange={setCurrentPage} />;
  //     case "education":
  //       return <EducationCenter />;
  //     case "login":
  //       return <LoginForm onPageChange={setCurrentPage} />;
  //     case "signup":
  //       return <SignupForm onPageChange={setCurrentPage} />;
  //     case "settings":
  //       return <Settings />;
  //     case "about":
  //       return (
  //         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
  //           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  //             <div className="text-center">
  //               <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
  //                 About SpamGuard
  //               </h1>
  //               <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
  //                 SpamGuard is a cutting-edge platform designed to protect you
  //                 from spam calls and emails using advanced AI technology. Our
  //                 mission is to keep you safe from fraud and scams.
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return <HomePage onPageChange={setCurrentPage} />;
  //   }
  // };

  // const showHeader = !["login", "signup", "dashboard"].includes(currentPage);
  // const showFooter = !["login", "signup", "dashboard"].includes(currentPage);

  // return (
  //   <ThemeProvider>
  //     <AuthProvider>
  //       <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
  //         {showHeader && (
  //           <Header currentPage={currentPage} onPageChange={setCurrentPage} />
  //         )}

  //         <main className={showHeader ? "" : "min-h-screen"}>
  //           {renderPage()}
  //         </main>

  //         {showFooter && <Footer />}
  //       </div>
  //     </AuthProvider>
  //   </ThemeProvider>
  // );
}

export default App;
