import usePlayer from 'hooks/usePlayer';

const logic = () => {
  const { player, controls, onChangeVolume, onChangeMuted } = usePlayer();

  return {
    player,
    controls,
    methods: {
      onChangeVolume,
      onChangeMuted,
    },
  };
};

export default logic;
