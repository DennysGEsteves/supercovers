import { useState } from 'react';

const logic = () => {
  const [searchTypeValue, setSearchTypeValue] = useState('');

  return {
    data: {
      searchTypeValue,
    },
    methods: {
      setSearchTypeValue,
    },
  };
};

export default logic;
