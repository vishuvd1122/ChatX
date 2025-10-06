import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";

const HomePage = () => {
    const navigate = useNavigate();

    const [selectedUser,setSelectedUser]=useState(false)
    const [loggedInUser,setLoggedInUser] = useState('');
    useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
      // setUserInitial(user.charAt(0).toUpperCase());
    } else {
      // If no user found, redirect to login
      navigate("/login");
    }
  }, [navigate]); // Added navigate to dependency array



    return (
      <div className="border w-full h-screen sm:px-[10%] sm:py-[5%]"> {/* Reduced side padding for more width */}
        <div className={`backdrop-blur-xl border-2 border-grey-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1.2fr_1.7fr_1.2fr] xl:grid-cols-[1.1fr_2.2fr_1.1fr]' : 'md:grid-cols-2' }`}>
          <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        </div>
      </div>
    )
}

export default HomePage;