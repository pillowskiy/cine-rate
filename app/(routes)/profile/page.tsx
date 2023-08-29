import { getSessionUser } from '@actions/getSessionUser';

export default async function ProfilePage() {
  const user = await getSessionUser();

  // TEMP
  if (!user) return <div>Only for authorized users</div>;

  return <div>{JSON.stringify(user)}</div>;
}
