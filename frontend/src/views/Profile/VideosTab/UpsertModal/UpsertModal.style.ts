export const StepperCSS = {
  '& .cui-steps__horizontal-step-container div:nth-child(2) span': {
    color: '#333 !important',
  },
  '& .cui-steps__horizontal-step-container [aria-current="step"] ~ div span': {
    color: '#FFF !important',
  },
  '& .cui-steps__horizontal-step-container div:nth-child(1)[aria-current="step"]': {
    backgroundColor: '#805AD5 !important',
  },
  '& .cui-steps__horizontal-step-container div:nth-child(1)[aria-current="step"] span': {
    color: '#FFF !important',
  },
};
