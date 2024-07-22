import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/index";
import Feed from "./pages/Feed/Feed";
import Protected from "./components/Protected/index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
