import usePlayer from 'hooks/usePlayer';

const logic = () => {
  const { player } = usePlayer();

  return {
    player,
  };
};

export default logic;
