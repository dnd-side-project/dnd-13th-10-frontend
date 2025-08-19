import ProfileModifyView from './components/ProfileModifyView';

async function getUserProfile() {
  return {
    nickname: 'SEED',
  };
}

export default async function ProfileModifyPage() {
  const user = await getUserProfile();

  return <ProfileModifyView initialNickname={user.nickname} />;
}
