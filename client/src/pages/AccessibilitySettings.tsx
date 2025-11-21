import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AccessibilitySettings } from '@/components/AccessibilitySettings';
import { useLocation } from 'wouter';

export default function AccessibilitySettingsPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onAccessibilitySettingsClick={() => setLocation('/dashboard')} />
      
      <main id="main-content" className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <AccessibilitySettings onClose={() => setLocation('/dashboard')} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
