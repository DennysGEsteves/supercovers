import { useEffect, useRef } from 'react';

import usePlayer from 'hooks/usePlayer';
import { DateUtil } from 'utils';

const logic = () => {
  const { status, controls, player, onVideoProgress, onChangeVideoDuration, setPlayerRef } = usePlayer();
  const playerRef = useRef(null);

  function onChangeDuration(e: any) {
    onChangeVideoDuration(DateUtil.secondsToMinutesString(e));
  }

  function onChangeProgress(e: any) {
    onVideoProgress(DateUtil.secondsToMinutesString(e.playedSeconds), e.played * 100);
  }

  useEffect(() => {
    setPlayerRef(playerRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    player,
    controls,
    methods: {
      ...status,
      onChangeDuration,
      onChangeProgress,
    },
  };
};

export default logic;
