'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Search = () => {
  return (
    <div className="mb-10 p-5 flex justify-end">
      <Input className="w-96 mr-2" />
      <Button variant="secondary">
        <Plus className="h-5 2-5" />
      </Button>
    </div>
  )
}

export default Search
