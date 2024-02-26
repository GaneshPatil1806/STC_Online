import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function GroupCard({ group, onGroupClick }) {
  const {id} = useParams();
  const { group_id, id:id1 } = group;
  let a= (id!=id1 ? " md:bg-slate-50 bg-slate-200 " : " bg-slate-200 ");

  return (
    <li
      className={`text-black flex justify-center p-2 m-1 border border-b cursor-pointer shadow shadow-slate-500 ${a}`}
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
