import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      You must have entered a wrong query Go back to <Link to="/">HomePage</Link>
    </div>
  );
}
