/* eslint-disable react-hooks/exhaustive-deps */
import usePlayer from 'hooks/usePlayer';

const logic = () => {
  const { controls, player, playlist } = usePlayer();

  return {
    player,
    playlist,
    controls,
  };
};

export default logic;
