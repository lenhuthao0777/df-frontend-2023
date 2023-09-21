const Select = ({ options = [], placeholder = '', onChange, name }) => {
  const handleChange = (e) => {
    e.preventDefault();
    onChange && onChange(e);
  };
  return (
    <div className='w-full'>
      <select
        id='topic'
        name={name}
        onChange={handleChange}
        className='border border-gray-300 bg-transparent text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
      >
        <option defaultValue>{placeholder}</option>
        {options.map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;