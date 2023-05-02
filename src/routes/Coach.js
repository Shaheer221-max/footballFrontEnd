import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";

// Import Components
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
import CoachNewsFeed from "../pages/NewsFeed";
import CoachAddskillpage2 from "../pages/Addskillpage2";
import CoachSelectedgroup from "../Components/Selectedgroup";
import CoachCategories from "../pages/Categories";
import CoachSidebar from '../Components/Sidebar';
import Groups from "../admin/8-Groups";
import Chats from "../admin/10-chats";
import GroupChat from "../admin/13-GroupChat";
import CoachChat from "../admin/CoachChat";

export default function Coach() {
  const CoachSideBarLayout = () => {
    return (
      <div className="flex ">
        <CoachSidebar />
        <Outlet />
      </div>
    );
  };
  return (
    <Routes>
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
        <Route exact path="/playerarea/skill" element={<CoachAddSkill />} />
        <Route
          exct
          path="/playerarea/addskill"
          element={<CoachPlayerareaSkill />}
        />
        <Route exact path="/traningdrill" element={<CoachTariningdrills />} />
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
        <Route exact path="/newsfeed/groups" element={<CoachGroups />} />
        <Route
          exact
          path="/selectgroup/addgroups"
          element={<CoachAddGroups />}
        />
        <Route exact path="/chat/:id" element={<CoachChat />} />
        <Route exact path="/newsfeed/addgroups" element={<CoachAddGroups />} />
        <Route exact path="/chat" element={<Chats />} />
        <Route exact path="/chat/group" element={<GroupChat />} />
        <Route exact path="/addskillpage2" element={<CoachAddskillpage2 />} />
        <Route exact path="/categories" element={<CoachCategories />} />
      </Route>
    </Routes>
  );
}
