import PropTypes from 'prop-types';  

function GroupCard({ group }) {
  const { name } = group;
  return (
    <p className="text-black flex justify-center py-2 border border-b cursor-pointer">{name}</p>
  );
}

GroupCard.propTypes = {
  group: PropTypes.object.isRequired, 
};

export default GroupCard;