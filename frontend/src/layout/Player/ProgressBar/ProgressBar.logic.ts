import usePlayer from 'hooks/usePlayer';

const logic = () => {
  const { controls, player } = usePlayer();

  const onSeek = (value: number) => {
    player.ref.current.seekTo(value / 100, 'fraction');
    // setTimeCurrentPercent(value);
  };

  return {
    player,
    controls,
    methods: {
      onSeek,
    },
  };
};

export default logic;
