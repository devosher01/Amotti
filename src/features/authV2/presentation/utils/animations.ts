import { keyframes } from "@mui/material";

// ============================================================================
// LOGIN PAGE ANIMATIONS
// ============================================================================

export const createPageAnimations = () => ({
  fadeInUp: keyframes`
    0% { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0); 
    }
  `,

  pulseSuccess: keyframes`
    0% { 
      opacity: 0.6; 
      transform: scale(1);
    }
    50% { 
      opacity: 1; 
      transform: scale(1.05);
    }
    100% { 
      opacity: 0.6; 
      transform: scale(1);
    }
  `,
});
