import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NasaApodPage from "./pages/NasaApodPage";
import App from './App';

export default function MainApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NasaApodPage />}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainApp />);