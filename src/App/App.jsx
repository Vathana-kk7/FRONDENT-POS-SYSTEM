// src/App/App.jsx
import { RouterProvider } from "react-router-dom";
import { router } from "../routes/routes"; // 💡 កែមកឈ្មោះ routes វិញ

function App() {
  return <RouterProvider router={router} />;
}

export default App;