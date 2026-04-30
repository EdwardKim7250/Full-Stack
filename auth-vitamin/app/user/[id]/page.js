export default async function UserProfile({ params }) {
  const { id } = await params;
 
  return <h1>User Profile: {id}</h1>;
}