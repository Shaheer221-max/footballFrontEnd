import React, { useContext, useState } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import AdminSideBar from "./AdminSidebar";
import Dashboard from "./1-Admindashbord";
import UserArea from "./2-UserArea";
import UserAreaCoach from "./2-UserArea(Coach)";
import VerificationCenter from "./12-VerificationCenter";
import CreateProfile from "./3-CreateProfile";
import Playerprofile from "./4-PlayersProfile";
import PlayerTimeline from "./5-playerTimeline";
import NewsFeed from "./6-newsfeed";
import Selectedgroup from "./7-SelectedGroup";
import Groups from "./8-Groups";
import AddGroups from "./9-CreateNewGroup";
import Chats from "./10-chats";
import GroupChat from "./13-GroupChat";
import ClubHub from "./11-clubhub";
import ShopDashboard from "./Shop/dashboard";
import Orders from "./Shop/Orders";
import Items from "./Shop/Items";
import AddItems from "./Shop/addItems";
import CoachSidebar from "../Components/Sidebar";
import SignUp from "./SignUp";
import Files from "./Files";
import EditItem from "./Shop/EditItem";
import GroupTimeline from "../Components/GroupTimeline";
import Comments from "../Components/Comments";
import Notifications from "../Components/Notifications";

import CoachDashboard from "../pages/Dashboard";
import CoachPlayerareaAttendence from "../pages/PlayerareaAttendence";
import CoachPlayerareaPlayers from "../pages/PlayerareaPlayers";
import CoachPlayerareaSkill from "../pages/PlayerareaSkill";
import CoachAddSkill from "../pages/AddSkill";
import CoachTariningdrills from "../pages/Tariningdrills";
import CoachAllDrills from "../pages/AllDrills";
import CoachUploadingDrill from "../pages/UploadingDrill";
import CoachPlayerprofile from "../pages/Playerprofile";
import CoachTimline from "../pages/Timline";
import CoachGroups from "../pages/Groups";
import CoachAddGroups from "../pages/AddGroups";
import CoachChat from "../pages/Chat";
import CoachNewsFeed from "../pages/NewsFeed";
import CoachAddskillpage2 from "../pages/Addskillpage2";
import CoachSelectedgroup from "../Components/Selectedgroup";
import CoachCategories from "../pages/Categories";
import AdminAddSkill from "./AdminAddSkill";
import Category from "./Shop/category";
import Settings from "../Components/Settings";
import VerificationCenterCoach from "./VerificationCenter(Coach)";

export const AuthContext = React.createContext();

const AdminSideBarLayout = () => {
  return (
    <div className="flex ">
      <AdminSideBar />
      <Outlet />
    </div>
  );
};
const CoachSideBarLayout = () => {
  return (
    <div className="flex ">
      <CoachSidebar />
      <Outlet />
    </div>
  );
};

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(false);
  const [id, setId] = useState(false);
  const [group, setGroup] = useState(false);
  const value = {
    setUser: setCurrentUser,
    setActiveId: setId,
    setActiveGroup: setGroup,
    group: group,
    id: id,
  };

  const current = localStorage.getItem("current");
  return (
    <>
      <AuthContext.Provider value={value}>
        {/* calling screens */}
        <Routes>
          <>
            <Route exact path="/" element={children} />
            <Route exact path="/SignUp" element={<SignUp />} />
            {current === "Admin" ? (
              <>
                <Route exact element={<AdminSideBarLayout />}>
                  <Route exact path="/dashboard" element={<Dashboard />} />
                  <Route exact path="/userarea" element={<UserArea />} />
                  <Route
                    exact
                    path="/userarea/coach"
                    element={<UserAreaCoach />}
                  />
                  <Route
                    exact
                    path="/verificationCenter"
                    element={<VerificationCenter />}
                  />
                  <Route
                    exact
                    path="/verificationCenter/coach"
                    element={<VerificationCenterCoach />}
                  />
                  <Route exact path="/comments" element={<Comments />} />
                  <Route
                    exact
                    path="/notification"
                    element={<Notifications />}
                  />
                  <Route
                    exact
                    path="/playerarea/skill"
                    element={<AdminAddSkill />}
                  />
                  <Route
                    exct
                    path="/playerarea/addskill"
                    element={<CoachPlayerareaSkill />}
                  />
                  <Route
                    exact
                    path="/userarea/createProfile"
                    element={<CreateProfile />}
                  />
                  <Route
                    exact
                    path="/userarea/playerprofile/profile"
                    element={<Playerprofile />}
                  />
                  <Route
                    exact
                    path="/userarea/playerprofile/timeline"
                    element={<PlayerTimeline />}
                  />
                  <Route exact path="/newsfeed" element={<NewsFeed />} />
                  <Route exact path="/selectgroup" element={<Groups />} />
                  <Route
                    exact
                    path="/selectgroup/groups"
                    element={<Selectedgroup />}
                  />
                  <Route
                    exact
                    path="/selectgroup/addgroups"
                    element={<AddGroups />}
                  />
                  <Route exact path="/chat" element={<Chats />} />
                  <Route exact path="/chat/:id" element={<Chats />} />
                  <Route exact path="/chat/group" element={<GroupChat />} />
                  <Route exact path="/clubhub" element={<ClubHub />} />
                  <Route exact path="/setting" element={<Settings />} />
                  <Route
                    exact
                    path="ShopDashboard"
                    element={<ShopDashboard />}
                  />
                  <Route
                    exact
                    path="/shopDashboard"
                    element={<ShopDashboard />}
                  />
                  <Route exact path="/category" element={<Category />} />
                  <Route exact path="/editItem" element={<EditItem />} />
                  <Route exact path="/allItems" element={<Items />} />
                  <Route
                    exact
                    path="/allItems/addItem"
                    element={<AddItems />}
                  />
                  <Route exact path="/allOrders" element={<Orders />} />
                </Route>
              </>
            ) : (
              <>
                <Route element={<CoachSideBarLayout />}>
                  <Route exact path="/dashboard" element={<CoachDashboard />} />
                  <Route
                    exact
                    path="/playerarea"
                    element={<CoachPlayerareaAttendence />}
                  />
                  <Route
                    exact
                    path="/playerarea/attendence"
                    element={<CoachPlayerareaAttendence />}
                  />
                  <Route
                    exact
                    path="/playerarea/players"
                    element={<CoachPlayerareaPlayers />}
                  />
                  <Route
                    exact
                    path="/playerarea/skill"
                    element={<CoachAddSkill />}
                  />
                  <Route
                    exct
                    path="/playerarea/addskill"
                    element={<CoachPlayerareaSkill />}
                  />
                  <Route
                    exact
                    path="/traningdrill"
                    element={<CoachTariningdrills />}
                  />
                  <Route
                    exact
                    path="/traningdrill/alldrills"
                    element={<CoachAllDrills />}
                  />
                  <Route
                    exact
                    path="/traningdrill/uploaddrills"
                    element={<CoachUploadingDrill />}
                  />

                  <Route
                    exact
                    path="/playerprofile/profile"
                    element={<CoachPlayerprofile />}
                  />
                  <Route
                    exact
                    path="/playerprofile/timeline"
                    element={<CoachTimline />}
                  />
                  <Route exact path="/newsfeed" element={<CoachNewsFeed />} />
                  <Route
                    exact
                    path="/newsfeed/selectedGroup"
                    element={<CoachSelectedgroup />}
                  />
                  <Route
                    exact
                    path="/selectgroup/groups"
                    element={<CoachSelectedgroup />}
                  />
                  <Route exact path="/selectedGroup" element={<Groups />} />
                  <Route
                    exact
                    path="/newsfeed/groups"
                    element={<CoachGroups />}
                  />
                  <Route
                    exact
                    path="/selectgroup/addgroups"
                    element={<CoachAddGroups />}
                  />
                  <Route
                    exact
                    path="/newsfeed/addgroups"
                    element={<CoachAddGroups />}
                  />
                  <Route exact path="/chat" element={<Chats />} />
                  <Route exact path="/chat/group" element={<GroupChat />} />
                  <Route
                    exact
                    path="/addskillpage2"
                    element={<CoachAddskillpage2 />}
                  />
                  <Route
                    exact
                    path="/categories"
                    element={<CoachCategories />}
                  />
                </Route>
              </>
            )}
          </>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}
export default AuthProvider;
