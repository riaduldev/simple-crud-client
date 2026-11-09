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

type UserCardProps = {
  user: {
    _id: string
    name: string
    email: string
  }
}

const UserCard = ({ user }: UserCardProps) => {
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
      </CardFooter>
    </Card>
  )
};

export default UserCard;