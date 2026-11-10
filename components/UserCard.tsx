'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link"
import { useRouter } from "next/navigation";
import UpdateUserDialog from "./UpdateUserDialog";


type UserCardProps = {
  user: {
    _id: string
    name: string
    email: string
  }
}

const UserCard = ({ user }: UserCardProps) => {
    
    const router = useRouter();
    const handleDeleteUser = async (id: string) => {
        //    console.log('delete user', _id);
           const res = await fetch(`http://localhost:5000/users/${id}`,{
             method: "DELETE"
           });

           const afterDelete = await res.json();
           console.log('after delete', afterDelete);
           if(afterDelete.deletedCount > 0) {
               console.log('User delete successfully');
               router.refresh()
           }
    }
  return (
    <Card className="w-full transition-shadow hover:shadow-md">
      <CardHeader>
        <CardAction>
          <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            User
          </span>
        </CardAction>
        <CardTitle className="text-lg font-semibold">{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/users/${user._id}`}><Button className="w-full">View Details</Button></Link>
        <UpdateUserDialog user= {user}></UpdateUserDialog>
        <Button onClick={()=> handleDeleteUser(user._id)} variant='destructive'>Delete</Button>
      </CardFooter>
    </Card>
  )
};

export default UserCard;