import Link from "next/link";

export default function Home() {
    return (
        <>
            <main className="flex w-full h-full">
                <ul>
                    <li>
                        <Link href="/welcome"> welcome </Link>
                    </li>
                    <li>
                        <Link href="/protect"> protect page </Link>
                    </li>
                </ul>
            </main>
        </>
    )
}
