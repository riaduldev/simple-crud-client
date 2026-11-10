
import { apiFetch } from "@/lib/api"
import Link from "next/link"

type UserDetailsPageProps = {
    params: Promise<{ userId: string }>;
};

const UserDetailsPage = async ({ params }: UserDetailsPageProps) => {
    const { userId } = await params;

    let user: { name: string; email: string } | null = null
    let errorMessage: string | null = null

    try {
        const res = await apiFetch(`/users/${encodeURIComponent(userId)}`)
        user = await res.json()
    } catch (error) {
        console.warn(`Failed to load user ${userId}:`, error)
        errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while loading this user.'
    }

    return (
        <div>
            <h1>User Details:{userId}</h1>
            {errorMessage ? (
                <p role="alert" className="text-destructive">{errorMessage}</p>
            ) : user ? (
                <>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </>
            ) : null}
            <Link
                href="/users"
                className="mt-4 inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
            >
                Back to users
            </Link>
        </div>
    );
};

export default UserDetailsPage;