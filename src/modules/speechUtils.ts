import { CustomWindow, SpeechSynthesisVoice } from 'modules/types';
import { VOICE, VOICE_LANGUAGE } from './constants';

let voiceList: SpeechSynthesisVoice[] = [];

const SpeechRecognition =
  (window as CustomWindow).SpeechRecognition ||
  (window as CustomWindow).webkitSpeechRecognition;
const recognition = new SpeechRecognition();

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

/**
 * [stt 초기화]
 */
export const sttInit = () => {
  recognition.lang = VOICE_LANGUAGE;
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
};

/**
 * [stt 시작]
 *
 * @param startCb stt 시작 콜백
 * @param stopCb stt 종료 콜백
 * @param resultCb stt 결과 전달 콜백
 */
export const sttStart = (
  startCb: () => void,
  stopCb: () => void,
  resultCb: (text: string) => void
) => {
  recognition.onstart = startCb;
  recognition.onend = stopCb;
  recognition.onresult = (event: any) =>
    resultCb(event.results[0][0].transcript);

  recognition.start();
};

/**
 * [입력 내용을 여러 문장으로 나누어주는 함수]
 *
 * @param contents 입력 내용
 * @returns {string[]}
 */
export const splitContents = (contents: string): string[] =>
  contents.split(/[?\n|!\n|.\n|\n]/);
