export const generateId = () => Math.random().toString(36).substr(2, 9);

export const formatTime = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  return `${hh}:${minutes} ${ampm}`;
};

export const FEES = {
  regular: 500,
  emergency: 1000,
};

export const PAYMENT_METHODS = [
  'Pay from Home (Online via UPI)',
  'Pay at Clinic (Cash/UPI at Desk)',
];
