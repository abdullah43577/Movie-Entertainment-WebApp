import { useState } from 'react';
import { BeatLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export default function Loader({ isLoading }) {
  let [color, setColor] = useState('#171e31');

  return <BeatLoader color={color} loading={isLoading} cssOverride={override} size={100} aria-label="Loading Spinner" data-testid="loader" />;
}
