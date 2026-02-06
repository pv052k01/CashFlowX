import React, { useContext, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { BASE_URL } from "../../utils/apiPaths";

const SideMenu = ({ activeMenu, mobileClose }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  React.useEffect(() => {
    setImageError(false);
  }, [user?.profileImageUrl]);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(route);
      if (mobileClose) mobileClose();
    }
  };

  return (
    <div className="h-full w-full md:w-64 p-5 flex flex-col md:sticky md:top-[74px] md:h-[calc(100vh-74px)]"
         style={{ backgroundColor: 'transparent', borderRight: '1px solid var(--border-subtle)' }}>
      
      {/* User Info Section */}
      <div className="flex flex-col items-center justify-center gap-4 mt-4 mb-8">
        <div className="relative group">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 blur-sm"></div>
           {user?.profileImageUrl && !imageError ? (
            <img
              src={user.profileImageUrl.startsWith('http') ? user.profileImageUrl : `${BASE_URL}${user.profileImageUrl}`}
              alt="Profile"
              className="relative w-24 h-24 rounded-full object-cover border-4 border-black shadow-xl"
              onError={() => setImageError(true)}
            />
          ) : (
             <div className="relative rounded-full border-4 border-black overflow-hidden">
                <CharAvatar
                  fullName={user?.fullName || ""}
                  width="w-24"
                  height="h-24"
                  style="text-3xl"
                />
             </div>
          )}
        </div>
        
        <div className="text-center">
            <h5 className="font-semibold text-lg tracking-wide" style={{ color: 'var(--text-main)' }}>
            {user?.fullName || "User"}
            </h5>
            <p className="text-xs font-medium uppercase tracking-wider mt-1 opacity-60" style={{ color: 'var(--text-muted)' }}>Pro Member</p>
        </div>
      </div>

      {/* Menu Buttons */}
      <div className="flex-1 space-y-2">
        {SIDE_MENU_DATA.map((item, index) => (
            <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] font-medium px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden`}
            style={
                activeMenu === item.label
                ? { 
                    background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.15), rgba(124, 58, 237, 0.05))', 
                    color: '#ddd6fe',
                    borderLeft: '4px solid var(--primary-500)'
                  }
                : { color: 'var(--text-muted)' }
            }
            onClick={() => handleClick(item.path)}
            >
             <span className={`block absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity ${activeMenu === item.label ? '' : 'bg-white'}`}></span>
             
             <item.icon className={`text-xl transition-transform group-hover:scale-110 ${activeMenu === item.label ? 'text-primary-500' : 'text-gray-500 group-hover:text-white'}`} />
             
             <span className={`${activeMenu === item.label ? 'font-semibold' : ''}`}>{item.label}</span>
            </button>
        ))}
      </div>

      <div className="mt-auto pt-6 text-center text-xs opacity-30">
        <p>© 2025 Finance Flow</p>
      </div>
    </div>
  );
};

export default SideMenu;
