'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import * as y from 'yup'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Auth from '@/services/apis/auth'

export default function FormLogin() {
  const router = useRouter()
  const schema = y.object({
    email: y.string().email(),
    password: y.string().required(),
  })

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate: handleLogin } = useMutation({
    mutationKey: ['log-in'],
    mutationFn: (values: y.InferType<typeof schema>) => Auth.login(values),
    onSuccess(data: any) {
      if (data?.status === 200) {
        Cookies.set('userInfo', JSON.stringify(data?.data))
        router.push('/')
      }
    },
  })

  const onLogin = (values: y.InferType<typeof schema>) => {
    handleLogin(values)
  }

  return (
    <div className="w-96 min-h-[200px] bg-white rounded-md dark:bg-[#1e1f22] shadow p-5">
      <h2 className="mb-10 text-2xl text-center font-extrabold">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLogin)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-900/90 dark:text-white text-xs font-bold uppercase">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    onChange={field.onChange}
                    type="email"
                    placeholder="Enter your email"
                    value={field.value}
                  />
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
                <FormLabel className="text-zinc-900/90 dark:text-white text-xs font-bold uppercase">
                  password
                </FormLabel>
                <FormControl>
                  <Input
                    onChange={field.onChange}
                    type="password"
                    placeholder="Enter your password"
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-10 flex justify-end">
            <Button type="submit" variant="secondary">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
