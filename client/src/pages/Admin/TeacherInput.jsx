/* eslint-disable react/prop-types */

const TeacherInput = ({ label, placeholder, value, onChange, type }) => (
  <div className="m-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
      {label.toUpperCase()}
    </label>
    <input
      className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={label}
      name={label}
      type={type || 'text'}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default TeacherInput;