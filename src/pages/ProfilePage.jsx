import UserProfile from '../components/Profile/UserProfile';

const ProfilePage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">User Profile</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your account settings</p>
      </div>
      
      <UserProfile />
    </div>
  );
};

export default ProfilePage;