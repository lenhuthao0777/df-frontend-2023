'use client'

import { useForm } from 'react-hook-form'
import * as y from 'yup'
import { useMutation } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import Auth from '@/services/apis/auth'
import { useToast } from '@/components/ui/use-toast'

const FormSignUp = () => {
  const { toast } = useToast()
  const router = useRouter()
  const schema = y.object({
    avatar: y.string(),
    email: y.string().email(),
    password: y.string().required(),
    name: y.string().required(),
  })

  const form = useForm<y.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: '',
      email: '',
      password: '',
      name: '',
    },
  })

  const { mutate: handleSinUp, isLoading } = useMutation({
    mutationKey: ['sign-up'],
    mutationFn: (values: y.InferType<typeof schema>) => Auth.signUp(values),
    onSuccess(data, variables, context) {
      toast({ title: 'SignUp success' })
      router.push('log-in')
    },
  })

  const onSubmit = (values: y.InferType<typeof schema>) => {
    handleSinUp(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[500px] bg-white p-5 rounded-md shadow-md dark:bg-[#1e1f22] space-y-2"
      >
        <h2 className="text-2xl font-extrabold dark:text-white text-center mb-10">
          Sign Up
        </h2>
        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white text-xs">Email</FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter your email"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white text-xs">
                Password
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Full Name */}
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white text-xs">Name</FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter your name"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-10">
          <Link
            href="log-in"
            className={buttonVariants({
              variant: 'outline',
              className: 'mr-2',
            })}
          >
            Back to Login Page
          </Link>

          <Button loading={isLoading} variant="secondary">
            SignUp
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default FormSignUp
