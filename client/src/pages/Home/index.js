import Navbar from "../../components/Navbar";
import Header from "../../components/Header";

import Dashboard from "../../pages/Dashboard";

import Login from "../../pages/Login";

function Home() {
  const token = localStorage.getItem("token");

  return (
    <>
      {!token ? (
        <Login />
      ) : (
        <>
          <Navbar token={token} />
          <div className="flex flex-col p-16 h-screen w-auto overflow-x-hidden overflow-y-auto">
            <Header token={token} />
            <Dashboard token={token} />
          </div>
        </>
      )}
    </>
  );
}

export default Home;