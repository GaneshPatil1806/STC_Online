import PropTypes from 'prop-types';

function GroupCard({ group, onGroupClick, activeGroupId }) {
  const { id, group_id } = group;
  const isActive = group_id == activeGroupId;

  return (
    <li
      className={`text-black flex justify-center py-2 m-0.5 border border-b cursor-pointer ${isActive ? 'bg-slate-200' : ''}`}
      onClick={() => onGroupClick(id)}
    >
      {group_id}
    </li>
  );
}

GroupCard.propTypes = {
  group: PropTypes.object.isRequired,
  onGroupClick: PropTypes.func,
  activeGroupId: PropTypes.object,
};

export default GroupCard;
