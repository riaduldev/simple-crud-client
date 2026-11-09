'use client'
import type { FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"


const NewUserPage = () => {
    const router = useRouter()

    const handleAddNewUser = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget);
      const newUser = Object.fromEntries(formData.entries());

      console.log(newUser);

      const res =await fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(newUser)

      })

      console.log('response from server', res);
      const afterSubmit = await res.json();
      console.log('after submit', afterSubmit);
      if(afterSubmit.insertedId){
        console.log('User Added Successfully');
        router.push('/users')
      }
    }
    return (
      <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Add a user</h1>
            <p className="text-sm text-muted-foreground">
              Enter the user&apos;s name and email address below.
            </p>
          </div>
          <form
            onSubmit={handleAddNewUser}
            className="rounded-xl border bg-card p-6 shadow-sm sm:p-8"
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
                <Input
                  id="fieldgroup-name"
                  name="name"
                  placeholder="Jordan Lee"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                <Input
                  id="fieldgroup-email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                />
                <FieldDescription>
                  We&apos;ll send updates to this address.
                </FieldDescription>
              </Field>
              <Field orientation="horizontal" className="justify-end pt-2">
                <Button type="reset" variant="outline">
                  Reset
                </Button>
                <Button type="submit">Add User</Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </main>
    );
};

export default NewUserPage;