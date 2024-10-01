/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Notification from '../../../common/notification';
import Security_settings from '../security_settings';
import AccountSettings from './account_settings';
import Privacy_settings from './privacy_settings';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
  ];

  return (
    <div className="container justify-center p-4 flex flex-col min-h-full">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="flex mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`mr-4 pb-2 ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 dark:text-white'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg flex-grow overflow-auto">
        {activeTab === 'account' && (
          <div className="h-full overflow-auto">
            <AccountSettings />
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="h-full overflow-auto">
            <Privacy_settings/>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="h-full overflow-auto">
            <Security_settings />
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="h-full overflow-auto">
            <Notification />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;