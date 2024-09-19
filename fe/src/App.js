import { BrowserRouter, Routes, Route } from "react-router-dom";
import router from "./routers";
import component from "./components";
import "./style/globals.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {router.user && router.user.length > 0 ? (
          <Route path="/" element={component.layouts.user}>
            {router.user.map((item, index) => (
              <Route
                key={index}
                path={item.state === "Home" ? "" : item.path}
                element={item.element}
                index={item.state === "Home"} // This will make "Home" the index route
              />
            ))}
          </Route>
        ) : null}

        <Route path="/">
          {router.status && router.status.length > 0
            ? router.status.map((item, index) => (
                <Route key={index} path={item.path} element={item.element} />
              ))
            : null}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
