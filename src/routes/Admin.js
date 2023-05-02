import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Import Components
import Dashboard from "../admin/1-Admindashbord";
import UserArea from "../admin/2-UserArea";
import UserAreaCoach from "../admin/2-UserArea(Coach)";
import VerificationCenter from "../admin/12-VerificationCenter";
import VerificationCenterCoach from "../admin/VerificationCenter(Coach)";
import Comments from "../Components/Comments";
import Notifications from "../Components/Notifications";
import AdminAddSkill from "../admin/AdminAddSkill";
import CoachPlayerareaSkill from "../pages/PlayerareaSkill";
import CreateProfile from "../admin/3-CreateProfile";
import Playerprofile from "../admin/4-PlayersProfile";
import PlayerTimeline from "../admin/5-playerTimeline";
import NewsFeed from "../admin/6-newsfeed";
import Groups from "../admin/8-Groups";
import Selectedgroup from "../admin/7-SelectedGroup";
import AddGroups from "../admin/9-CreateNewGroup";
import Chats from "../admin/10-chats";
import GroupChat from "../admin/13-GroupChat";
import ClubHub from "../admin/11-clubhub";
import Settings from "../Components/Settings";
import ShopDashboard from "../admin/Shop/dashboard";
import Category from "../admin/Shop/category";
import EditItem from "../admin/Shop/EditItem";
import Items from "../admin/Shop/Items";
import AddItems from "../admin/3-CreateProfile";
import Orders from "../admin/Shop/Orders";
import SignUp from "../admin/SignUp";
import { Login } from "../admin/Login";
import AdminSideBar from '../admin/AdminSidebar';

export default function Admin() {
  const AdminSideBarLayout = () => {
    return (
      <div className="flex ">
        <AdminSideBar />
        <Outlet />
      </div>
    );
  };
  return (
    <Routes>
      <Route exact element={<AdminSideBarLayout />}>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/userarea" element={<UserArea />} />
        <Route exact path="/userarea/coach" element={<UserAreaCoach />} />
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
        <Route exact path="/notification" element={<Notifications />} />
        <Route exact path="/playerarea/skill" element={<AdminAddSkill />} />
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
        <Route exact path="/selectgroup/groups" element={<Selectedgroup />} />
        <Route exact path="/selectgroup/addgroups" element={<AddGroups />} />
        <Route exact path="/chat" element={<Chats />} />
        <Route exact path="/chat/:id" element={<Chats />} />
        <Route exact path="/chat/group" element={<GroupChat />} />
        <Route exact path="/clubhub" element={<ClubHub />} />
        <Route exact path="/setting" element={<Settings />} />
        <Route exact path="ShopDashboard" element={<ShopDashboard />} />
        <Route exact path="/shopDashboard" element={<ShopDashboard />} />
        <Route exact path="/category" element={<Category />} />
        <Route exact path="/editItem" element={<EditItem />} />
        <Route exact path="/allItems" element={<Items />} />
        <Route exact path="/allItems/addItem" element={<AddItems />} />
        <Route exact path="/allOrders" element={<Orders />} />
        <Route exact path="/SignUp" element={<SignUp />} />
      </Route>
      <Route exact path="/" element={<Login />} />
    </Routes>
  );
}
