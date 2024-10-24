const Notification = ({ message }) => {
  if (!message.content) return null;

  const notificationStyle = {
    color: message.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return <div style={notificationStyle}>{message.content}</div>;
};

export default Notification;
