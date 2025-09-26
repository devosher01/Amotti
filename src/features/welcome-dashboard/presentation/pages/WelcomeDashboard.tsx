"use client";

import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import { useUser } from '@/features/auth/presentation/contexts/UserContext';
import { useFacebook } from '@/features/oauth/presentation/hooks/useFacebook';
import { useInstagram } from '@/features/oauth/presentation/hooks/useInstagram';
import { useConnections } from '@/features/oauth/presentation/hooks/useConnections';
import PageContainer from "@/features/shared/components/container/PageContainer";
import { WelcomeHeader } from "../components/WelcomeHeader";
import { SocialConnections } from "../components/SocialConnections";
import { OnboardingModal } from "../modals/OnboardingModal";
import { DemoModal } from "../modals/DemoModal";
import { AccountSelectionModal } from '@/features/oauth/presentation/components/FacebookPageSelectionModal';
import { InstagramAccountSelectionModal } from '@/features/oauth/presentation/components/InstagramAccountSelectionModal';
import { InstagramConnectionModal } from '@/features/oauth/presentation/components/InstagramConnectionModal';

export default function WelcomeDashboard() {
  const { user } = useUser();
  const facebook = useFacebook();
  const instagram = useInstagram();
  const connections = useConnections(!!user);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const [instagramModalOpen, setInstagramModalOpen] = useState(false);
  const [instagramSelectionOpen, setInstagramSelectionOpen] = useState(false);

  const handleConnectPlatform = async (platform: string) => {
    if (!user?.userId) return;

    if (platform === 'facebook') {
      await facebook.startOAuth();
    } else if (platform === 'instagram') {
      setInstagramModalOpen(true);
    } else {
      console.log(`${platform} estará disponible próximamente`);
    }
  };

  const handleSelectFacebookPage = async (pageId: string) => {
    facebook.reset();
    const result = await facebook.connectPage(pageId);
    if (result.success) {
      connections.refetch();
    }
  };

  const handleConnectInstagramViaFacebook = async () => {
    setInstagramModalOpen(false);

    const facebookConnection = connections.connections.find(
      conn => conn.platform === 'facebook' && conn.status === 'active'
    );

    if (!facebookConnection) {
      return;
    }

    await instagram.getAccountsFromFacebook(facebookConnection.pageInfo?.id);
    setInstagramSelectionOpen(true);
  };

  const handleSelectInstagramAccount = async (instagramAccountId: string) => {
    const facebookConnection = connections.connections.find(
      conn => conn.platform === 'facebook' && conn.status === 'active'
    );

    if (!facebookConnection) return;

    const result = await instagram.connectViaFacebook(facebookConnection.pageInfo?.id, instagramAccountId);

    if (result.success) {
      setInstagramSelectionOpen(false);
      await connections.refetch();
      console.log('Instagram conectado exitosamente');
    }
  };

  const handleNextStep = () => {
    if (onboardingStep < 3) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setOnboardingOpen(false);
      setOnboardingStep(0);
    }
  };

  const handlePrevStep = () => {
    if (onboardingStep > 0) setOnboardingStep(onboardingStep - 1);
  };

  return (
    <PageContainer title="Amotii" description="Tu central de marketing en redes sociales">
      <Container maxWidth="xl">
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <WelcomeHeader
            onStartOnboarding={() => setOnboardingOpen(true)}
            onShowDemo={() => setDemoOpen(true)}
          />
        </Box>

        <Box sx={{ py: { xs: 2, md: 4 } }}>
          <SocialConnections
            onConnectPlatform={handleConnectPlatform}
            connections={connections.connections}
            isLoading={false}
            onDeleteConnection={connections.deleteConnection}
          />
        </Box>
      </Container>

      <OnboardingModal
        open={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        currentStep={onboardingStep}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
      />

      <DemoModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
      />

      <AccountSelectionModal
        open={facebook.pages.length > 0}
        onClose={() => facebook.reset()}
        title="Selecciona una página de Facebook"
        subtitle="Elige la página que quieres conectar a Tactiko"
        accounts={facebook.pages}
        onSelectAccount={handleSelectFacebookPage}
        isLoading={facebook.isLoading}
        error={facebook.error}
        showLinkedIndicator={true}
      />

      <InstagramConnectionModal
        open={instagramModalOpen}
        onClose={() => setInstagramModalOpen(false)}
        onConnectViaFacebook={handleConnectInstagramViaFacebook}
        onConnectDirect={() => console.log('La conexión directa de Instagram estará disponible próximamente')}
      />

      <InstagramAccountSelectionModal
        open={instagramSelectionOpen}
        onClose={() => setInstagramSelectionOpen(false)}
        accounts={instagram.accounts}
        onSelectAccount={handleSelectInstagramAccount}
        isLoading={instagram.isLoading}
        error={instagram.error}
      />
    </PageContainer>
  );
}