export default async function ProfilePage() {
  const user = null;

  // TEMP
  if (!user) return <div>Only for authorized users</div>;

  return <div>{JSON.stringify(user)}</div>;
}
