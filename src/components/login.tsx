'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'

export type LoginCredentials = {
  username: string
  password: string
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Please enter username'
  }),
  password: z.string().min(2, {
    message: 'Please enter password'
  })
})

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  const [isLoading, setIsLoading] = useState(false)

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const { username, password } = values
    const loginData: LoginCredentials = {
      username: username,
      password: password
    }
    console.log(loginData)
    // loginMutation.mutate(loginData, {
    //   onSuccess: () => {
    //     // setIsLoading(false);
    //   },
    //   onError: () => {
    //     setIsLoading(false);
    //   }
    // });
  }

  return (
    <>
      <Card className="w-[350px] shadow-2xl shadow-blue-300">
        <CardHeader>
          <CardTitle className="text-xl">Admin Login </CardTitle>
          <CardDescription className="opacity-50">Sign in to manage your blog</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} className="w-full" size="lg" type="submit">
                  {isLoading ? (
                    <>
                      <LoaderCircle size={18} color="white" className="animate-spin" /> loading...
                    </>
                  ) : (
                    'Signin'
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
