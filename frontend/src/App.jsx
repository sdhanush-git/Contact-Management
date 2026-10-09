import React from "react";
import Hero from "./pages/Hero";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-900">
      <Toast />
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default App;
