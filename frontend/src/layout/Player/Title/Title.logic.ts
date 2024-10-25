import usePlayer from 'hooks/usePlayer';

const logic = () => {
  const { controls, player } = usePlayer();

  return {
    player,
    controls,
  };
};

export default logic;
