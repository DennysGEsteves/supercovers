import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';

import { SearchCoverArtistInputProps } from './SearchCoverArtistInput.props';
import logic from './SearchCoverArtistInput.logic';

const SearchCoverArtistInput: NextPage<SearchCoverArtistInputProps> = ({ value, onChange, onBlur }) => {
  const { data, methods } = logic();

  return (
    <Box
      sx={{
        '& .chakra-input, .chakra-popover__content > div, .chakra-popover__content': {
          background: 'black !important',
          color: 'white',
        },
        '&  .chakra-popover__content': {
          border: '1px solid #333',
        },
      }}
    >
      <AutoComplete openOnFocus onChange={onChange}>
        <AutoCompleteInput
          variant='outline'
          size='sm'
          bg='gray.900'
          value={`${value || ''}`}
          placeholder=' '
          onBlur={onBlur}
          onChange={(e: any) => {
            const val = e.target.value;
            onChange(val);

            if (val.length > 2) {
              methods.searchCoverArtists(val);
            }
          }}
        />
        <AutoCompleteList>
          {data.coverArtists.map((artist: string) => (
            <AutoCompleteItem
              key={`option-${artist}`}
              value={artist}
              _selected={{ bg: 'whiteAlpha.50' }}
              _focus={{ bg: 'whiteAlpha.100' }}
            >
              {artist}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Box>
  );
};

export default SearchCoverArtistInput;
