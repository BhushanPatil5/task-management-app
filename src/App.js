import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const TaskPage = lazy(() => import("./pages/TasksPage"));
const Navigation = lazy(() => import("./components/Navigation"));
const Home = lazy(() => import("./components/Home"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<h3 className="loading-text">Loading...</h3>}>
        <Navigation />
        <Routes>
          {/* Tasks Route */}
          <Route path="/tasks" element={<TaskPage />} />

          {/* Categories Route */}
          <Route path="/categories" element={<CategoriesPage />} />

          {/* Default Route */}
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
