'use client'
import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"


const NewUserPage = () => {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAddNewUser = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setErrorMessage(null)
      setIsSubmitting(true)
      const formData = new FormData(e.currentTarget);
      const newUser = Object.fromEntries(formData.entries());

      try {
        const res = await apiFetch('/users', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        })
        const result: { insertedId?: string } = await res.json()
        if (!result.insertedId) {
          throw new Error('The API did not confirm that the user was added.')
        }
        router.push('/users')
      } catch (error) {
        console.warn('Failed to add user:', error)
        setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred while adding the user.')
      } finally {
        setIsSubmitting(false)
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding...' : 'Add User'}
                </Button>
              </Field>
              {errorMessage && (
                <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {errorMessage}
                </p>
              )}
            </FieldGroup>
          </form>
        </div>
      </main>
    );
};

export default NewUserPage;