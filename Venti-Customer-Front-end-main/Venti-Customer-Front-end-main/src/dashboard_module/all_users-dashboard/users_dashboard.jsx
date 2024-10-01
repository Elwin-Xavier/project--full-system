/* eslint-disable no-unused-vars */
import NavBar from '../common/navBar';
import Sidebar from '../common/sidebar';
import { Outlet } from 'react-router-dom';

const UsersDashboard = () => {
   
    return (
         <div className="flex dark:text-white dark:bg-black">
         <Sidebar />
         <div className="flex h-screen w-full flex-col">
           <NavBar />
           <div className="max-h-screen overflow-y-auto">
             <div className="flex gap-y-8 justify-center mb-10">
               <Outlet />
             </div>
           </div>
         </div>
       </div >
    );
}

export default UsersDashboard;
