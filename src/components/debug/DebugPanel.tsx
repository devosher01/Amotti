'use client';

import React, { useState } from 'react';
import { 
  Fab, 
  Box
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import { TestMeModal } from './TestMeModal';

export const DebugPanel: React.FC = () => {
  const [testMeModalOpen, setTestMeModalOpen] = useState(false);

  return (
    <>
      {/* Botón flotante simple para debugging */}
      <Box sx={{ 
        position: 'fixed', 
        bottom: 20, 
        left: 20, 
        zIndex: 9999,
        backgroundColor: 'red', // Para que sea súper visible
        borderRadius: '50%',
        padding: 1
      }}>
        <Fab 
          color="secondary" 
          aria-label="debug"
          onClick={() => setTestMeModalOpen(true)}
          sx={{ 
            backgroundColor: '#ff4444',
            '&:hover': {
              backgroundColor: '#ff6666'
            }
          }}
        >
          <BugReportIcon />
        </Fab>
      </Box>

      {/* Modal para test /auth/me */}
      <TestMeModal 
        open={testMeModalOpen} 
        onClose={() => setTestMeModalOpen(false)} 
      />
    </>
  );
};
