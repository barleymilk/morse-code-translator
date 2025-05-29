import { useState, useCallback } from 'react';
import { MORSE_CODE, REVERSE_MORSE_CODE } from '../utils/morseCodeMap';

export const useTranslator = () => {
  const [text, setText] = useState('');
  const [morse, setMorse] = useState('');

  // 텍스트를 모스 부호로 변환
  const textToMorse = useCallback(input => {
    if (!input) return '';

    return input
      .toUpperCase()
      .split('')
      .map(char => MORSE_CODE[char] || char)
      .join(' ')
      .replace(/\s{2,}/g, '   '); // 연속된 공백을 3개의 공백으로 변환
  }, []);

  // 모스 부호를 텍스트로 변환
  const morseToText = useCallback(input => {
    if (!input) return '';

    return input
      .split('   ') // 단어 구분 (공백 3개)
      .map(word =>
        word
          .split(' ') // 문자 구분 (공백 1개)
          .map(code => REVERSE_MORSE_CODE[code] || code)
          .join(''),
      )
      .join(' ');
  }, []);

  // 텍스트 입력 핸들러
  const handleTextChange = useCallback(
    newText => {
      setText(newText);
      setMorse(textToMorse(newText));
    },
    [textToMorse],
  );

  // 모스 부호 입력 핸들러
  const handleMorseChange = useCallback(
    newMorse => {
      setMorse(newMorse);
      setText(morseToText(newMorse));
    },
    [morseToText],
  );

  return {
    text,
    morse,
    handleTextChange,
    handleMorseChange,
  };
};
