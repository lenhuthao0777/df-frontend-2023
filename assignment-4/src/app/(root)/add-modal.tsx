'use client'

import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useBook } from '@/providers/book-provider'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const AddModal = () => {
  const form = useForm()
  const { state, dispatch } = useBook()

  const isOpen = state.isOpen && state.type === 'addBook'

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch({ type: 'onClose' })}>
      <DialogContent>
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            test
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-900/90 dark:text-white text-xs font-bold uppercase">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      onChange={field.onChange}
                      placeholder="Enter your name"
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-900/90 dark:text-white text-xs font-bold uppercase">
                    Author
                  </FormLabel>
                  <FormControl>
                    <Input
                      onChange={field.onChange}
                      placeholder="Enter your author"
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddModal
