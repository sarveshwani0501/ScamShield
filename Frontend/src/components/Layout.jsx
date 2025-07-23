// import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import { Outlet, useLocation } from "react-router-dom";
// function Layout() {
//   const location = useLocation();
//   const hideHeaderRoutes = ["/dashboard", "/login", "/signup"];
//   const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);
//   return (
//     <>
//       {!shouldHideHeader && <Header />}
//       <Outlet />
//       <Footer />
//     </>
//   );
// }
// export default Layout;
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  // Routes where header should not be shown
  const hideHeaderRoutes = ["/dashboard", "/login", "/signup"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {!shouldHideHeader && <Header />}
      <main className={shouldHideHeader ? "" : "pt-0"}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
