import PropTypes from 'prop-types';

function GroupCard({ group, onGroupClick, activeGroupId }) {
  const { id, name } = group;
  const isActive = id === activeGroupId;

  //console.log(`Group ID: ${id}, Active Group ID: ${activeGroupId}, isActive: ${isActive}`);

  return (
    <li
      className={`text-black flex justify-center py-2 m-0.5 border border-b cursor-pointer ${isActive ? 'bg-slate-200' : ''}`}
      onClick={() => onGroupClick(id)}
    >
      {name}
    </li>
  );
}

GroupCard.propTypes = {
  group: PropTypes.object.isRequired,
  onGroupClick: PropTypes.func,
  activeGroupId: PropTypes.number, // Assuming group.id is a string, adjust accordingly if it's a different type
};

export default GroupCard;
