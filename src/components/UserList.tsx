import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import type { User } from "@prisma/client";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

/*
* UserRow is the component that renders a single user
*/
const UserRow = ( user: User ): JSX.Element => {
    // since we are updating the role of a user we need to use a useState to keep track of the current role
    const [ role, setRole ] = useState( user.role );

    // state for the edit button on toggle
    const [ isEditing, setIsEditing ] = useState( false );

    // function to change the role of a user
    const {mutate, isLoading} = api.user.updateUserRole.useMutation(
        {
            onSuccess: () => {
                // setRole here
                setRole( role === "ADMIN" ? "USER" : "ADMIN" );
            },
        }
    );

    // confirmation box to make sure the user wants to change the role
    const confirmChange = () => {
        if (role === "ADMIN") {
            return window.confirm( "Are you sure you want to demote this user?" );
        } else {
            return window.confirm( "Are you sure you want to promote this user?" );
        }
    };

    return(
        <li className="py-3 sm:py-4">
            <div className="flex flex-row items-center space-x-4">
                <div className="flex-1 min-w-0">
                    <p className="text-base font-medium truncate text-white">
                        {user.username? user.username : user.name}
                    </p>
                    <p className="text-sm truncate text-gray-400">
                        {user.email}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-white">
                    {isLoading ? "Updating..."  : role}
                </div>
                <div>
                    {
                        !isEditing ? (
                            <button 
                                onClick={ () => setIsEditing( true ) }
                                className="p-1">
                                <BsThreeDotsVertical />
                            </button>
                        ) : null
                    }
                    {
                        isEditing ? (
                            <div className="flex flex-col justify-center items-center text-sm">
                                <button 
                                    onClick={() => {
                                    setIsEditing( false ); 
                                    if(confirmChange()){
                                        mutate({id: user.id, role: role}); 
                                    }
                                    }}
                                    className={`${role == "ADMIN" ? "bg-red-500" : "bg-green-500"} rounded-lg p-1`}
                                >
                                    {
                                        role === "ADMIN" ? (
                                            <span>Demote</span>
                                        ) : (
                                            <span>Promote</span>
                                        )
                                    }
                                </button>
                                <button 
                                    onClick={() => setIsEditing( false )}
                                    className="bg-gray-400 rounded-lg mt-1 p-1 w-full"
                                >
                                    <span>Cancel</span>
                                </button>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </li>
    )
};

const UserList = (): JSX.Element => {
    const { data: session, status } = useSession();

    // check if user is unauthenticated
    if (status !== "authenticated") {
        return <div></div>;
    }

    // if the user role is admin, get the list of all users
    const users = api.user.getAllUsers.useQuery().data;

    // query to get the current user
    const currentUser = api.user.getCurrentUser.useQuery({
        email: session?.user?.email,
    });

    // if user is not an admin, return only the user's information
    if (currentUser?.data?.role !== "ADMIN") {
        return <div></div>
    }

    const userRows = users?.map( ( user ) => <UserRow key={user.id} {...user} /> );

    return (
        <div className="w-11/12 md:w-1/2 px-2 py-4 my-20">
            <ul className="flex flex-col justify-between">
                {userRows}
            </ul>
        </div>
    )
};      

export default UserList;