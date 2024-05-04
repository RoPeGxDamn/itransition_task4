import UserTable from "../components/UserTable";
import { useAuth } from "../context/AuthProvider";

export default function Home() {
  const { token } = useAuth();
  return (
    <>
      {token ? (
        <UserTable />
      ) : (
        <h1 className="text-center mt-5">
          Login for being able to manage users!
        </h1>
      )}
    </>
  );
}
