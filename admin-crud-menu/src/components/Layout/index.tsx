import { Outlet } from "react-router-dom";
import Sidebar from "../navigation/LeftNav";


const PrimaryLayout = () => {


  return (
    <>
      <div className="relative">

        <Sidebar/>

        <div className="md:pl-64">
          <main className="flex-1 relative py-2 h-full min-h-screen bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    </>

  );
}

export default PrimaryLayout;