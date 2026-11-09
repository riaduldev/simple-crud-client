import UserCard from '@/components/UserCard';


type User = {
    _id: string;
    name: string;
    email: string;
};

const UsersPage = async() => {
    const res = await fetch(`http://localhost:5000/users`)
    const users: User[] = await res.json()
    return (
        <main className="min-h-svh bg-muted/30 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
            <h1 className="mb-1 text-2xl font-semibold tracking-tight">Users</h1>
            <p className="mb-6 text-sm text-muted-foreground">{users.length} total users</p>
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