import { SpeechSynthesisVoice } from 'modules/types';
import { VOICE, VOICE_LANGUAGE } from './constants';

let voiceList: SpeechSynthesisVoice[] = [];

/**
 * TTS 목소리 리스트 초기화
 */
export const ttsInit = () => {
  const setVoiceList = () => {
    voiceList = window.speechSynthesis.getVoices();
  };

  setVoiceList();

  if (window.speechSynthesis.onvoiceschanged !== undefined)
    window.speechSynthesis.onvoiceschanged = setVoiceList;
};

/**
 * TTS 수행
 * @param text 입력 텍스트
 */
export const startSpeech = (
  text: string,
  startCb: () => void,
  stopCb: () => void
) => {
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.onstart = startCb;
  utterance.onend = stopCb;

  utterance.lang = VOICE_LANGUAGE;
  utterance.voice = voiceList.find(
    (voice) => voice.name === VOICE
  ) as SpeechSynthesisVoice;
  window.speechSynthesis.speak(utterance);
};

/**
 * TTS 정지
 */
export const stopSpeech = () => window.speechSynthesis.cancel();

export const splitContents = (contents: string) =>
  contents.split(/[?\n|!\n|.\n|\n]/);
