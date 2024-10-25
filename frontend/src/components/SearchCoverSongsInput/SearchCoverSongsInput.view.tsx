import { Select } from '@chakra-ui/react';
import { NextPage } from 'next';

import { SearchCoverSongsInputProps } from './SearchCoverSongsInput.props';
import logic from './SearchCoverSongsInput.logic';

const SearchCoverSongsInput: NextPage<SearchCoverSongsInputProps> = ({ artistName, value, onChange, onBlur }) => {
  const { data } = logic(artistName);

  return (
    <Select
      border='1px solid'
      borderColor='gray.700'
      focusBorderColor='purple.600'
      bg='gray.900'
      size='sm'
      variant='outline'
      color='white'
      value={`${value}`}
      onBlur={onBlur}
      onChange={(e: any) => {
        const val = e.target.value;
        onChange(val);
      }}
      disabled={!data.coverSongs.length}
      placeholder={data.coverSongs.length ? 'Escolha a música do cover...' : ' '}
      sx={{
        option: {
          color: 'black',
        },
      }}
    >
      {data.coverSongs.map((songName) => (
        <option key={songName} value={songName}>
          {songName}
        </option>
      ))}
    </Select>
  );
};

export default SearchCoverSongsInput;
