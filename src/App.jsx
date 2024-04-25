import { Routes, Route } from "react-router-dom";
import { Home, Update, Create, Error } from "./page";
import path from "./utils/path";

function App() {
  return (
    <div>
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.UPDATE__USER} element={<Update />} />
        <Route path={path.CREATE} element={<Create />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
