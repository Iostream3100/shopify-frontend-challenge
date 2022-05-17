import logo from "./logo.svg";
import "./App.css";
import FormPage from "./pages/FormPage";
import { BackdropContextProvider } from "./context/BackdropContext";
import { NotificationContextProvider } from "./context/NotificationContext";
import AppBackdrop from "./components/AppBackdrop";
import NotificationSnackbar from "./components/NotificationSnackbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BackdropContextProvider>
      <NotificationContextProvider>
        <div className="App">
          <FormPage />
          <AppBackdrop />
          <NotificationSnackbar />
          <Footer />
        </div>
      </NotificationContextProvider>
    </BackdropContextProvider>
  );
}

export default App;
