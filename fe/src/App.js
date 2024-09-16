import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import router from "./routers";
import layouts from "./compnents/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={layouts.user}>
          {router.user.map((item) =>
            item.state === "index" ? (
              <Route
                index
                key={item.path}
                path={item.path}
                element={item.element}
              />
            ) : (
              <Route key={item.path} path={item.path} element={item.element} />
            )
          )}
        </Route>
        <Route path="/admin" element={layouts.admin}>
          {router.user.map((item) =>
            item.state === "index" ? (
              <Route
                index
                key={item.path}
                path={item.path}
                element={item.element}
              />
            ) : (
              <Route key={item.path} path={item.path} element={item.element} />
            )
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
