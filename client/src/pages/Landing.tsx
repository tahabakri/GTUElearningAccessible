import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileText,
  ExternalLink,
  AlertCircle,
  Info,
  LogIn,
  Calendar,
} from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { landingPageContent } from "@shared/mockData";
import { SkipToContent } from "@/components/SkipToContent";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";
import { Globe, Facebook, Plus } from "lucide-react";
import gtuLogo from "@/assets/gtu-logo.svg";

export default function Landing() {
  const [, setLocation] = useLocation();
  const { language, setLanguage } = useAccessibility();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <SkipToContent />

      {/* Header */}
      <header
        className="sticky top-0 z-50 w-full border-b border-white/10 shadow-lg transition-colors duration-300 backdrop-blur-sm"
        style={{
          backgroundColor: "var(--header-bg)",
          color: "var(--header-fg)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 dark:bg-white/5 rounded-lg flex items-center justify-center shadow-sm backdrop-blur-sm border border-white/10">
              <img
                src={gtuLogo}
                alt="GTU Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight">
                საქართველოს ტექნიკური უნივერსიტეტი
              </h1>
              <p className="text-xs opacity-80 font-medium">
                GEORGIAN TECHNICAL UNIVERSITY
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <AccessibilityToolbar />
            </div>

            <Button
              onClick={() => setLocation("/login")}
              className="hidden sm:flex gap-2 font-semibold bg-white/15 hover:bg-white/25 text-inherit border-white/30 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20"
              variant="outline"
              aria-label={
                language === "ka" ? "შესვლა სისტემაში" : "Log In to System"
              }
            >
              <LogIn className="h-4 w-4" />
              {language === "ka" ? "შესვლა" : "Log In"}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "ka" ? "en" : "ka")}
              className="flex items-center gap-2 font-medium hover:bg-white/15 dark:hover:bg-white/10 text-inherit"
              aria-label={
                language === "ka" ? "Switch to English" : "გადართვა ქართულზე"
              }
            >
              <Globe className="h-4 w-4" />
              {language === "ka" ? "ENGLISH" : "ქართული"}
            </Button>
          </div>
        </div>
      </header>

      <main id="main-content" className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12" aria-label="Welcome">
          <div
            className="rounded-2xl p-8 mb-6 shadow-xl transition-colors duration-300 border border-white/10"
            style={{ background: "var(--hero-bg)", color: "var(--hero-fg)" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-inherit drop-shadow-sm">
              {language === "ka"
                ? landingPageContent.hero.title.ka
                : landingPageContent.hero.title.en}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto font-medium opacity-90 text-inherit drop-shadow-sm">
              {language === "ka"
                ? landingPageContent.hero.subtitle.ka
                : landingPageContent.hero.subtitle.en}
            </p>

            {/* Clear Login Call-to-Action - Enhanced with animation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative group">
                {/* Animated ring effect */}
                <div className="absolute -inset-1 bg-white/30 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
                <Button
                  size="lg"
                  onClick={() => setLocation("/login")}
                  className="relative gap-2 text-lg px-8 py-6 bg-white text-violet-700 dark:text-violet-900 hover:bg-white/95 border-2 border-white font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <LogIn className="h-6 w-6" />
                  {language === "ka"
                    ? "შესვლა სისტემაში"
                    : "Log In to E-Learning"}
                </Button>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open(
                    landingPageContent.hero.scheduleButton.link,
                    "_blank",
                  )
                }
                className="gap-2 text-lg px-8 py-6 font-medium bg-white/10 dark:bg-white/5 border-white/40 text-inherit hover:bg-white/20 dark:hover:bg-white/15"
              >
                <Calendar className="h-5 w-5" />
                {language === "ka"
                  ? landingPageContent.hero.scheduleButton.text.ka
                  : landingPageContent.hero.scheduleButton.text.en}
              </Button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Announcements Section */}
            <section aria-labelledby="announcements-heading">
              <h2
                id="announcements-heading"
                className="text-2xl font-bold text-foreground mb-4"
              >
                {language === "ka" ? "განცხადებები" : "Announcements"}
              </h2>
              <div className="space-y-4">
                {landingPageContent.announcements.map((announcement, index) => (
                  <article
                    key={index}
                    className={`p-4 rounded-lg border-l-4 shadow-sm transition-colors duration-300 dark:shadow-md ${
                      announcement.type === "important"
                        ? "border-l-orange-500 dark:border-l-orange-400"
                        : "border-l-blue-500 dark:border-l-blue-400"
                    }`}
                    style={{ backgroundColor: "var(--announcement-bg)" }}
                  >
                    <div className="flex items-start gap-3">
                      {announcement.type === "important" ? (
                        <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">
                          {language === "ka"
                            ? announcement.title.ka
                            : announcement.title.en}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                          {language === "ka"
                            ? announcement.text.ka
                            : announcement.text.en}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Faculty List Accordion */}
            <section aria-labelledby="faculties-heading">
              <h2
                id="faculties-heading"
                className="text-2xl font-bold text-foreground mb-4"
              >
                {language === "ka" ? "ფაკულტეტები" : "Course Categories"}
              </h2>
              <Card className="shadow-sm">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faculties" className="border-none">
                    <AccordionTrigger className="px-6 py-5 hover:bg-muted/30 transition-colors group">
                      <span className="font-bold text-lg">
                        {language === "ka"
                          ? `ყველა ფაკულტეტი (${landingPageContent.faculties.length})`
                          : `Browse All Faculties (${landingPageContent.faculties.length})`}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
                        {language === "ka"
                          ? "აირჩიეთ ფაკულტეტი დამატებითი ინფორმაციისთვის"
                          : "Select a faculty to learn more about available courses"}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {landingPageContent.faculties.map((faculty, index) => (
                          <div
                            key={index}
                            className="p-4 bg-muted/30 rounded-lg hover:bg-muted/60 transition-colors cursor-pointer border border-transparent hover:border-primary/20"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                // Could navigate to faculty page
                              }
                            }}
                          >
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                              {language === "ka" ? faculty.ka : faculty.en}
                            </p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </section>
          </div>

          {/* Sidebar - Right Column (1/3) */}
          <aside className="space-y-6" aria-labelledby="resources-heading">
            <h2
              id="resources-heading"
              className="text-2xl font-bold text-foreground"
            >
              {language === "ka" ? "რესურსები" : "Resources"}
            </h2>

            {landingPageContent.resources.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="shadow-sm">
                <CardHeader className="pb-3 border-b bg-muted/10">
                  <CardTitle className="text-lg font-bold">
                    {language === "ka" ? section.title.ka : section.title.en}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          href="#"
                          className="flex items-center gap-3 text-sm text-primary hover:underline hover:text-primary/80 transition-colors p-2 rounded hover:bg-muted/50 group"
                          onClick={(e) => e.preventDefault()}
                          aria-label={`${
                            language === "ka"
                              ? "ჩამოტვირთეთ PDF: "
                              : "Download PDF: "
                          } ${
                            language === "ka" ? item.label.ka : item.label.en
                          }`}
                        >
                          <FileText className="h-5 w-5 flex-shrink-0 text-primary/70 group-hover:text-primary" />
                          <span className="flex-1 font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary">
                            {language === "ka" ? item.label.ka : item.label.en}
                          </span>
                          {item.type === "PDF" && (
                            <span className="text-[10px] uppercase tracking-wider bg-muted px-2 py-1 rounded font-bold text-muted-foreground border">
                              PDF
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-16 py-12 transition-colors duration-300 border-t border-white/10"
        style={{
          backgroundColor: "var(--footer-bg)",
          color: "var(--footer-fg)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-lg text-inherit">
                {language === "ka" ? "კონტაქტი" : "Contact"}
              </h3>
              <address className="not-italic text-sm space-y-2 font-medium opacity-85">
                <p>
                  {language === "ka"
                    ? landingPageContent.footer.address.ka
                    : landingPageContent.footer.address.en}
                </p>
                <p>{landingPageContent.footer.phone}</p>
                <p>{landingPageContent.footer.email}</p>
              </address>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-lg text-inherit">
                {language === "ka" ? "სწრაფი ბმულები" : "Quick Links"}
              </h3>
              <ul className="space-y-2 text-sm font-medium opacity-85">
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:underline hover:opacity-100 text-inherit transition-opacity"
                  >
                    {language === "ka" ? "მთავარი ვებგვერდი" : "Main Website"}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:underline hover:opacity-100 text-inherit transition-opacity"
                  >
                    {language === "ka" ? "ბიბლიოთეკა" : "Library"}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="hover:underline hover:opacity-100 text-inherit transition-opacity"
                  >
                    {language === "ka" ? "დახმარება" : "Help"}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-lg text-inherit">
                {language === "ka" ? "სოციალური მედია" : "Social Media"}
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="p-2 bg-white/15 dark:bg-white/10 rounded-full shadow-sm hover:bg-white/25 dark:hover:bg-white/20 transition-colors text-inherit"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="p-2 bg-white/15 dark:bg-white/10 rounded-full shadow-sm hover:bg-white/25 dark:hover:bg-white/20 transition-colors text-inherit"
                  aria-label="Google Plus"
                >
                  <Plus className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 dark:border-white/10 pt-8 text-center text-sm font-medium opacity-70">
            <p>
              {language === "ka"
                ? landingPageContent.footer.copyright?.ka
                : landingPageContent.footer.copyright?.en}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
