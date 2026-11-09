

type UserDetailsPageProps = {
    params: Promise<{ userId: string }>;
};

const UserDetailsPage = async ({ params }: UserDetailsPageProps) => {
    const { userId } = await params;


    const res = await fetch(`http://localhost:5000/users/${userId}`);
    const user = await res.json();
    return (
        <div>
            <h1>User Details:{userId}</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserDetailsPage;