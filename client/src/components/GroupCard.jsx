import PropTypes from 'prop-types';

function GroupCard({ group, onGroupClick, activeGroupId }) {
  const { id, group_id } = group;
  const isActive = group_id == activeGroupId;

  return (
    <li
      className={`text-black flex justify-center p-2 m-1 border border-b cursor-pointer shadow shadow-slate-500 ${isActive ? 'bg-slate-200' : ''}`}
      onClick={() => onGroupClick(id)}
    >
      {group_id}
    </li>
  );
}

GroupCard.propTypes = {
  group: PropTypes.object.isRequired,
  onGroupClick: PropTypes.func,
  activeGroupId: PropTypes.string,
};

export default GroupCard;
