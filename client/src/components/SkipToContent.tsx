export function SkipToContent() {
  // The app uses hash-based routing, so a plain href="#main-content" anchor
  // would be interpreted as a route change. Instead, move focus to the main
  // content region directly (the standard accessible "skip link" behaviour).
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.getElementById("main-content");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus();
      main.scrollIntoView();
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      data-testid="link-skip-to-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
