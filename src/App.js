import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ContactForm from "./components/page/ContactForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/contact-me" element={<ContactForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
