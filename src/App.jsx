import Header from "./components/layout/Header";
import BottomNavigation from "./components/layout/BottomNavigation";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-canvas">
      <Header />
      <AppRoutes />
      <BottomNavigation />
    </div>
  );
}

export default App;
