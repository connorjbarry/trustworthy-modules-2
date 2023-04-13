import { api } from "~/utils/api";
import type { User } from "@prisma/client";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

/*
 * UserRow is the component that renders a single user
 */
const UserRow = (user: User): JSX.Element => {
  // since we are updating the role of a user we need to use a useState to keep track of the current role
  const [role, setRole] = useState(user.role);

  // state for the edit button on toggle
  const [isEditing, setIsEditing] = useState(false);

  // function to change the role of a user
  const { mutate, isLoading } = api.user.updateUserRole.useMutation({
    onSuccess: () => {
      // setRole here
      setRole(role === "ADMIN" ? "USER" : "ADMIN");
    },
  });

  // confirmation box to make sure the user wants to change the role
  const confirmChange = () => {
    if (role === "ADMIN") {
      return window.confirm("Are you sure you want to demote this user?");
    } else {
      return window.confirm("Are you sure you want to promote this user?");
    }
  };

  return (
    <li className="py-3 sm:py-4">
      <div className="flex flex-row items-center space-x-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-medium text-white">
            {user.username ? user.username : user.name}
          </p>
          <p className="truncate text-sm text-gray-400">{user.email}</p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-white">
          {isLoading ? "Updating..." : role}
        </div>
        <div>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="p-1">
              <BsThreeDotsVertical />
            </button>
          ) : null}
          {isEditing ? (
            <div className="flex flex-col items-center justify-center text-sm">
              <button
                onClick={() => {
                  setIsEditing(false);
                  if (confirmChange()) {
                    mutate({ id: user.id, role: role });
                  }
                }}
                className={`${
                  role == "ADMIN" ? "bg-red-500" : "bg-green-500"
                } rounded-lg p-1`}
              >
                {role === "ADMIN" ? <span>Demote</span> : <span>Promote</span>}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="mt-1 w-full rounded-lg bg-gray-400 p-1"
              >
                <span>Cancel</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
};

const UserList = (): JSX.Element => {
  // if the user role is admin, get the list of all users
  const users = api.user.getAllUsers.useQuery().data;

  const userRows = users?.map((user) => <UserRow key={user.id} {...user} />);

  return (
    <div className="my-20 w-11/12 px-2 py-4 md:w-1/2">
      <ul className="flex flex-col justify-between">{userRows}</ul>
    </div>
  );
};

export default UserList;
