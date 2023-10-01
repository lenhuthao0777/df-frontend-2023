/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import Modal from '../../components/ui/modal'
import Select from '../../components/ui/select'
import { useBook } from '../../providers/book-provider'

interface DataLocalType {
  id?: string
  name: string
  author: string
  topic: string
}

const AddModal = () => {
  const { state, dispatch } = useBook()

  const [values, setValues] = useState<DataLocalType>({
    name: '',
    author: '',
    topic: '',
  })

  const [validate, setValidate] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const isOpen = state.isOpen && state.type === 'addBook'

  const handleClose = () => {
    dispatch({ type: 'onClose' })
  }

  const options = [
    {
      id: 1,
      label: 'Programming',
      value: 'Programming',
    },
    {
      id: 2,
      label: 'Database',
      value: 'Database',
    },
    {
      id: 3,
      label: 'Devops',
      value: 'Devops',
    },
  ]

  const changeValues = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }))
  }

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!values.name || !values.author || !values.topic) {
      setValidate('Field can not be blank!')
    } else {
      setValidate('')
      setIsLoading(true)
      const dataLocal: DataLocalType[] = JSON.parse(
        localStorage.getItem('books') as string,
      )
      dataLocal.push({
        id: uuid(),
        name: values?.name,
        author: values?.author,
        topic: values?.topic,
      })

      setTimeout(() => {
        if (values) {
          const newData = JSON.stringify(dataLocal)
          localStorage.setItem('books', newData)
        }
        handleClose()
        setIsLoading(false)
      }, 1000)
    }
  }

  return (
    <Modal open={isOpen} onClose={handleClose} title="Add book">
      <form onSubmit={handleForm} className="w-full space-y-5 dark:text-white">
        <p className="text-xs text-red-500">{validate}</p>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-xs font-semibold">
            Name
          </label>
          <Input
            name="name"
            id="name"
            placeholder="Enter name"
            onChange={changeValues}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="author" className="text-xs font-semibold">
            Author
          </label>
          <Input
            name="author"
            placeholder="Enter author"
            onChange={changeValues}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="topic" className="text-xs font-semibold">
            Topic
          </label>
          <Select
            options={options}
            name="topic"
            onChange={changeValues}
            placeholder="Choose a topic"
          />
        </div>

        <div className="flex justify-end">
          <Button isLoading={isLoading} type="submit" variant="danger">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AddModal
