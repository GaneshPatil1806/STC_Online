import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function GroupCard({ group, onGroupClick }) {
  const { id } = useParams();
  const { group_name,id:id1 } = group;
  let classNames = id != id1 ? `` : 'bg-[#A6E3E9]';

  return (
    <li
      className={`text-black flex justify-center p-2 m-1 border border-b cursor-pointer shadow shadow-slate-500 ${classNames}`}
      onClick={() => onGroupClick(group)}
    >
      {group_name}
    </li>
  );
}

GroupCard.propTypes = {
  group: PropTypes.object.isRequired,
  onGroupClick: PropTypes.func,
  activeGroup: PropTypes.object,
};

export default GroupCard;