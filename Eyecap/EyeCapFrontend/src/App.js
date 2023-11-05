import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Quizzes from "./pages/quizzes";
import Quiz from "./pages/quiz";
import AddQuiz from "./pages/AddQuiz";

// import AddQuiz from "./pages/AddQuiz";

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/aboutus" element={<AboutUs />} />

        <Route path="/quizzes" element={<Quizzes user={user} />} />
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/Quiz/:name" element={<Quiz />} />

        <Route
          path="/"
          // element={user ? <Home /> : <Navigate to="/login"/>}
          element={<Home />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
