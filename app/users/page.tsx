
import UserCard from '@/components/UserCard';
import { apiFetch } from '@/lib/api';

type User = {
    _id: string;
    name: string;
    email: string;
};

const UsersPage = async() => {
    let users: User[]
    let errorMessage: string | null = null

    try {
        const res = await apiFetch('/users')
        users = await res.json()
    } catch (error) {
        console.warn('Failed to load users:', error)
        users = []
        errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while loading users.'
    }

    return (
        <main className="min-h-svh bg-muted/30 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
            <h1 className="mb-1 text-2xl font-semibold tracking-tight">Users</h1>
            <p className="mb-6 text-sm text-muted-foreground">{errorMessage ? 'Users are unavailable' : `${users.length} total users`}</p>
            {errorMessage && (
                <p role="alert" className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                    {errorMessage}
                </p>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                users.map((user) => <UserCard key={user._id} user = {user}></UserCard>)
            }
            </div>
            </div>
        </main>
    );
};

export default UsersPage;