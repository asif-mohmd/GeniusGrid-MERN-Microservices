import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRouters from "./routes/adminRouter/AdminRouters";
import { InstructorRouter } from "./routes/instructorRouter/InstructorRouter";
import UserRouters from "./routes/userRouter/UserRouters";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/*" element={<UserRouters />} />
            <Route path="/admin/*" element={<AdminRouters />} />
            <Route path="/instructor/*" element={<InstructorRouter />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
