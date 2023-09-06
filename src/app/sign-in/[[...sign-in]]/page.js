import {SignIn} from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center" style={{height: 'calc(100vh - 64px'}}>
            <SignIn/>
        </div>
    )
}