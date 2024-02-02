import PropTypes from 'prop-types';

function ChatCard({ Name }) {
  return (
    <li className="text-black flex justify-center py-2 border border-b">{Name}</li>
  );
}

ChatCard.propTypes = {
  Name: PropTypes.string.isRequired,
};

export default ChatCard;
