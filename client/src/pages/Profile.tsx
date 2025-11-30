import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useLocation } from 'wouter';
import { currentUser } from '@shared/mockData';

export default function Profile() {
  const { user } = useAuth();
  const { language } = useAccessibility();
  const [, setLocation] = useLocation();

  if (!user) return null;

  // Bilingual user data
  const userData = {
    fullNameEn: currentUser.name.en,
    fullNameKa: currentUser.name.ka,
    statusEn: "Active Student",
    statusKa: "აქტიური სტუდენტი",
    enrollmentEn: "Bachelor of Computer Science",
    enrollmentKa: "კომპიუტერული მეცნიერების ბაკალავრი",
    profileLabelEn: "Profile",
    profileLabelKa: "პროფილი",
    accountInfoEn: "Your account information",
    accountInfoKa: "თქვენი ანგარიშის ინფორმაცია",
    accountInfoCardEn: "Account Information",
    accountInfoCardKa: "ანგარიშის ინფორმაცია",
    fullNameLabelEn: "Full Name",
    fullNameLabelKa: "სრული სახელი",
    emailLabelEn: "Email",
    emailLabelKa: "ელ-ფოსტა",
    statusLabelEn: "Status",
    statusLabelKa: "მდგომარეობა",
    enrollmentLabelEn: "Enrollment",
    enrollmentLabelKa: "ჩარიცხვა"
  };

  const currentFullName = language === 'ka' ? userData.fullNameKa : userData.fullNameEn;
  const currentStatus = language === 'ka' ? userData.statusKa : userData.statusEn;
  const currentEnrollment = language === 'ka' ? userData.enrollmentKa : userData.enrollmentEn;
  const profileLabel = language === 'ka' ? userData.profileLabelKa : userData.profileLabelEn;
  const accountInfo = language === 'ka' ? userData.accountInfoKa : userData.accountInfoEn;
  const accountInfoCard = language === 'ka' ? userData.accountInfoCardKa : userData.accountInfoCardEn;
  const fullNameLabel = language === 'ka' ? userData.fullNameLabelKa : userData.fullNameLabelEn;
  const emailLabel = language === 'ka' ? userData.emailLabelKa : userData.emailLabelEn;
  const statusLabel = language === 'ka' ? userData.statusLabelKa : userData.statusLabelEn;
  const enrollmentLabel = language === 'ka' ? userData.enrollmentLabelKa : userData.enrollmentLabelEn;

  return (
    <div className="min-h-screen bg-background">
      <Header onAccessibilitySettingsClick={() => setLocation('/accessibility')} />
      <main id="main-content" className="flex-1 p-6 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{profileLabel}</h1>
            <p className="text-muted-foreground">{accountInfo}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{accountInfoCard}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="" alt={currentFullName} />
                  <AvatarFallback className="text-lg">{currentUser.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{currentFullName}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">Username: {user.username}</p>
                </div>
              </div>

              <div className="grid gap-4 border-t pt-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{fullNameLabel}</p>
                  <p className="text-sm text-muted-foreground">{currentFullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{emailLabel}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{statusLabel}</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">{currentStatus}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{enrollmentLabel}</p>
                  <p className="text-sm text-muted-foreground">{currentEnrollment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
