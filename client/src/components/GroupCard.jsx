import PropTypes from 'prop-types';  

function GroupCard({ group,onGroupClick }) {
  const { name } = group;
  return (
    <div className="text-black flex justify-center md:py-2 border border-b cursor-pointer" onClick={()=>onGroupClick()}>{name}</div>
  );
}

GroupCard.propTypes = {
  group: PropTypes.object.isRequired, 
  onGroupClick: PropTypes.func
};

export default GroupCard;