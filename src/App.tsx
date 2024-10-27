import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import { lazy, Suspense } from "react";
import { DashboardSkeleton } from "./pages/Dashboard/DashboardSkeleton";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));

function App() {
  return (
    <div id="app" className="flex flex-col h-screen">
      <Header />
      <div id="app-content" className="overflow-y-scroll ">
        <div className="p-5 xl:w-[1280px] lg:w-[1000px] md:w-[800px] sm:w-[600px] w-[450] sm:mx-auto mx-0">
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<DashboardSkeleton />}>
                    <Dashboard />
                  </Suspense>
                }
              />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
