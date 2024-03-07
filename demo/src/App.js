import { BrowserRouter as Router, Route, Routes, Link, Outlet} from "react-router-dom";
import NasaApodPage from "./pages/NasaApodPage";

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/nasa-apod">NASA APOD</Link>
                        </li>
                    </ul>
                </nav>

                <Outlet />

                <Routes>
                    <Route path="/nasa-apod" element={<NasaApodPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;