import { FC } from 'react'

interface SelectProps {
  options: any
  placeholder: string
  onChange: any
  name: string
}

const Select: FC<SelectProps> = ({
  options = [],
  placeholder = '',
  onChange,
  name,
}) => {
  const handleChange = (e) => {
    e.preventDefault()
    onChange(e)
  }

  return (
    <div className="w-full">
      <select
        id="topic"
        name={name}
        onChange={handleChange}
        className="border border-gray-300 bg-transparent text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      >
        <option defaultValue="">{placeholder}</option>
        {options.map((item: any) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
