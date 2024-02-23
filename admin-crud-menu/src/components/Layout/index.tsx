import { Outlet } from "react-router-dom";
import Sidebar from "../navigation/LeftNav";


const PrimaryLayout = () => {


  return (
    <>
      <div className="relative">

        {/* Modal popup when clicked each notification */}
        {/* <div className={`${ clicked ? 'block':'hidden' }`}>
          <div className="fixed w-[100%] h-[100%] z-50 bg-[#00000029] flex justify-center items-start">
            <div className="rounded-md w-[40%] shadow-md bg-white mt-10">
              <div className="px-7 py-3 border-b shadow-sm">
                <div className="flex justify-between">
                  <span className="font-bold text-[16px]">{ notif.info1 }</span>
                  <div className="flex items-start">
                    <p  onClick={ () => setClicked(false) } className="px-2 bg-[#F3F6F9] text-[#BABAC7] rounded-sm font-semibold cursor-pointer select-none">X</p>
                  </div>
                </div>
                <p className="text-[#707070] text-sm font-semibold">{ unixFromNow(notif.createdAt) }</p>
              </div>

              <div className="px-7 py-3">
                <img src={ Images.groupPeople } alt="people" className="mx-auto w-[35%] my-10" />

                <p className="text-[#333333] text-sm"  dangerouslySetInnerHTML={{ __html: notif.info2 }}></p>

                <button className="w-[15%] py-2 rounded-md bg-[#E4B01B] text-white float-right text-sm 
                font-semibold my-5" onClick={ () => setClicked(false) }>Close</button>
              </div>
            </div>
          </div>
        </div> */}


        <Sidebar/>

        <div className="md:pl-64">
          <main className="flex-1 min-h-screen bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    </>

  );
}

export default PrimaryLayout;