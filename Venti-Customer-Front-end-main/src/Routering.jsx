/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from "./AuthForms/signupForm";
import SigninForm from "./AuthForms/signinForm";
import OtpForm from "./AuthForms/otpForm";
import UsersDashboard from "./dashboard_module/all_users-dashboard/users_dashboard";
import Forgot_password_email from "./AuthForms/forgot_password/forgot_password_email";
import Directive from "./AuthForms/forgot_password/directive";
import Reset_password from "./AuthForms/forgot_password/reset_password";

// creator
import Creator_layout from "./dashboard_module/creator_dashboard/creator_layout";
import Creator_home from "./dashboard_module/creator_dashboard/creator_components/creator_home";
import Creator_profile from "./dashboard_module/creator_dashboard/creator_components/creator_profile";
import Edit_creator_profile from "./dashboard_module/creator_dashboard/creator_components/edit_creator_profile";
import Creator_events_layout from "./dashboard_module/creator_dashboard/creator_components/creator_events_layout";
import All_creator_events from "./dashboard_module/creator_dashboard/creator_components/all_creator_events";
import Coming_events from "./dashboard_module/creator_dashboard/creator_components/coming_events";
import Create_events from "./dashboard_module/creator_dashboard/creator_components/create_events";
import Summary from "./dashboard_module/creator_dashboard/creator_components/summary";
import Edit_event from "./dashboard_module/creator_dashboard/creator_components/edit_event";
import Creator_book_event from "./dashboard_module/creator_dashboard/creator_components/creator_book_event";
import Creator_settings from "./dashboard_module/creator_dashboard/creator_components/creator_settings";

import Settings_bar from "./dashboard_module/common/mobile_settings/settings_bar";
import { useAuth } from "./providers/AuthProvider";
import Home from "./dashboard_module/common/home";
import Profile from "./dashboard_module/common/profile";
import Messages from "./dashboard_module/common/messages";
import Report_problem from "./dashboard_module/common/report_problem";
import SettingsPage from "./dashboard_module/all_users-dashboard/unique_to_users/settings/settingsLayout";
import Events from "./dashboard_module/all_users-dashboard/event/events";
import Event_readmore from "./dashboard_module/all_users-dashboard/event/event_readmore";
import Events_layout from "./dashboard_module/all_users-dashboard/event/events_layout";
import My_events from "./dashboard_module/all_users-dashboard/event/my_events";
import Creator_uploads from "./dashboard_module/all_users-dashboard/unique_to_users/creator_uploads";
import Edit_profile from "./dashboard_module/common/edit_profile";

const USER_TYPE_USER = 0;

const Routing = () => {
  const { user, isLoading } = useAuth();
  const type = user?.userType;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/signup" element={<SignupForm />} />
      {/* <Route path="/signin" element={<SigninForm />} /> */}
      <Route path="/verification" element={<OtpForm />} />
      <Route path="/forgot-password-email" element={<Forgot_password_email />} />
      <Route path="/directive" element={<Directive />} />
      <Route path="/reset-password" element={<Reset_password />} />
      <Route path="/settings-bar" element={<Settings_bar />} />
      <Route path="/report-a-problem" element={<Report_problem />} />
      {user ? (
        type === USER_TYPE_USER ? (
          <Route path="/" element={<UsersDashboard />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings-page" element={<SettingsPage />} />

            <Route path="events" element={<Events_layout />}>
              <Route index element={<Events />} />
              <Route path="my-events" element={<My_events />} />
            </Route>

            <Route path="event/:id" element={<Event_readmore />} />
            <Route path="creator-uploads" element={<Creator_uploads />} />
            <Route path="edit-profile" element={<Edit_profile />} />
          </Route>
        ) : (
          <Route path="/creator" element={<Creator_layout />}>
            <Route index element={<Creator_home />} />
            <Route path="creator-profile" element={<Creator_profile />} />
            <Route path="edit-creator-profile" element={<Edit_creator_profile />} />
            <Route path="creator-events" element={<Creator_events_layout />}>
              <Route index element={<All_creator_events />} />
              <Route path="create-events" element={<Create_events />} />
              <Route path="coming-events" element={<Coming_events />} />
              <Route path="edit-event/:id" element={<Edit_event />} />
              <Route path="summary" element={<Summary />} />
            </Route>
            <Route path="creator-book-event/:id" element={<Creator_book_event />} />
            <Route path="creator-settings" element={<Creator_settings />} />
          </Route>
        )
      ) : (
        <Route path="/signin" element={<SigninForm />} />
      )}
       <Route path="*" element={<SigninForm />} />
      {/* <Route path="*" element={user ? <Navigate to="/" replace /> : <SigninForm />} /> */}
    </Routes>
  );
};

export default Routing;
