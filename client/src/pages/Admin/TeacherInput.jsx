import PropTypes from 'prop-types';

const TeacherInput = ({ label, placeholder, value, onChange }) => (
  <div className="mb-1">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
      {label}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={label}
      name={label}
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

TeacherInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TeacherInput;