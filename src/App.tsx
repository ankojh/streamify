import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Details from "./pages/Details/Details";

function App() {
  return (
    <div id="app" className="flex flex-col h-screen">
      <Header />
      <div id="app-content" className="overflow-y-scroll ">
        <div className="p-5 xl:w-[1280px] lg:w-[1000px] md:w-[800px] sm:w-[600px] w-[450] sm:mx-auto mx-0">
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/details" element={<Details />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
