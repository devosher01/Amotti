import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Stack,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import {
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
} from "@tabler/icons-react";
import { onboardingSteps } from "../constants/data";
import { PremiumButton } from "../styles/StyledComponents";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  open,
  onClose,
  currentStep,
  onNextStep,
  onPrevStep,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" fontWeight={700}>Configuración Inicial</Typography>
          <Button onClick={onClose}><IconX size={20} /></Button>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={currentStep} orientation="vertical">
          {onboardingSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Step key={step.label}>
                <StepLabel>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ 
                      width: 40, 
                      height: 40, 
                      backgroundColor: index <= currentStep ? "#5b24b7" : "rgba(91, 36, 183, 0.1)" 
                    }}>
                      <IconComponent size={20} color={index <= currentStep ? "white" : "#5b24b7"} />
                    </Avatar>
                    <Typography variant="h6" fontWeight={600}>{step.title}</Typography>
                  </Stack>
                </StepLabel>
                <StepContent>
                  <Typography color="text.secondary" sx={{ ml: 7 }}>{step.description}</Typography>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onPrevStep} 
          disabled={currentStep === 0} 
          startIcon={<IconChevronLeft size={16} />}
        >
          Anterior
        </Button>
        <PremiumButton 
          onClick={onNextStep} 
          endIcon={currentStep === onboardingSteps.length - 1 ? <IconCheck size={16} /> : <IconChevronRight size={16} />}
        >
          {currentStep === onboardingSteps.length - 1 ? 'Finalizar' : 'Siguiente'}
        </PremiumButton>
      </DialogActions>
    </Dialog>
  );
};
