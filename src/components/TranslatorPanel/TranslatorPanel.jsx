import { Box, Paper, TextField, IconButton, Typography } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTranslator } from '../../hooks/useTranslator';

export function TranslatorPanel() {
  const { text, morse, handleTextChange, handleMorseChange } = useTranslator();

  const handleCopyText = async content => {
    try {
      await navigator.clipboard.writeText(content);
      // TODO: 나중에 스낵바로 복사 완료 알림 추가
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* 텍스트 입력 영역 */}
        <Box sx={{ position: 'relative' }}>
          <Typography variant="subtitle1" gutterBottom>
            텍스트
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={text}
            onChange={e => handleTextChange(e.target.value)}
            placeholder="변환할 텍스트를 입력하세요"
            sx={{ pr: 5 }}
          />
          <IconButton
            onClick={() => handleCopyText(text)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 40,
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Box>

        {/* 방향 전환 아이콘 */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton>
            <SwapVertIcon />
          </IconButton>
        </Box>

        {/* 모스 부호 입력 영역 */}
        <Box sx={{ position: 'relative' }}>
          <Typography variant="subtitle1" gutterBottom>
            모스 부호
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={morse}
            onChange={e => handleMorseChange(e.target.value)}
            placeholder="· − · − · −"
            sx={{ pr: 5 }}
          />
          <IconButton
            onClick={() => handleCopyText(morse)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 40,
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
