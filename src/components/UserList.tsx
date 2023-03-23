import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import type { User } from "@prisma/client";
import { useEffect, useState } from "react";

/*
* UserRow is the component that renders a single user
*/
const UserRow = ( user: User ): JSX.Element => {
    // since we are updating the role of a user we need to use a useState to keep track of the current role
    const [ role, setRole ] = useState( user.role );
    
    // state for the edit button on toggle
    const [ isEditing, setIsEditing ] = useState( false );

    // function to change the role of a user
    const changeRole = api.user.updateUserRole.useMutation();

    return(
        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                    <p className="text-base font-medium truncate text-white">
                        {user.username}
                    </p>
                    <p className="text-sm truncate text-gray-400">
                        {user.email}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-white">
                    {role}
                </div>
                <div>
                    {
                        !isEditing ? (
                            <button onClick={ () => setIsEditing( true ) }>
                                <span className="text-sm">edit</span>
                            </button>
                        ) : null
                    }
                    {
                        isEditing ? (
                            <div className="flex flex-col">
                                <button onClick={() => {
                                    setIsEditing( false ); 
                                    changeRole.mutate({id: user.id, role: role}); 
                                    if (role === "ADMIN") {
                                        setRole( "USER" );
                                    } else {
                                        setRole( "ADMIN" );
                                    }
                                    }}>
                                    {
                                        role === "ADMIN" ? (
                                            <span className="text-sm">demote</span>
                                        ) : (
                                            <span className="text-sm">promote</span>
                                        )
                                    }
                                </button>
                                <button onClick={() => setIsEditing( false )}>
                                    <span className="text-sm">cancel</span>
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

    // query to get the current user
    const currentUser = api.user.getCurrentUser.useQuery({
        email: session?.user?.email,
    });

    // if user is not an admin, return only the user's information
    if (currentUser?.data?.role !== "ADMIN") {
        return <div></div>
    }
    
    // if the user role is admin, get the list of all users
    const users = api.user.getAllUsers.useQuery().data;

    const userRows = users?.map( ( user ) => <UserRow key={user.id} {...user} /> );

    return (
        <div>
            <ul className="flex flex-col justify-between">
                {userRows}
            </ul>
        </div>
    )
};      

export default UserList;