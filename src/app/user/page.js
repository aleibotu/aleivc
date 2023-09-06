'use client'
import {useUser} from "@clerk/nextjs";

export default function Page() {
    const {user} = useUser();
    if (!user) return null;
    const updateUser = async () => {
        // await user.update({});
    };
    return (
        <>
            <button onClick={updateUser}>Click me to update your name</button>
            <p>user.firstName: {user?.username}</p>
        </>
    );
}