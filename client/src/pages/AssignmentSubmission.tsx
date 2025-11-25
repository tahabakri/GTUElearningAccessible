import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import {
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Upload,
  File,
  Clock,
  User,
  HelpCircle,
  Save,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useState, useRef } from "react";
import { getCourseContent, currentUser } from "@shared/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AssignmentSubmission() {
  const [, params] = useRoute("/course/:courseId/assignment/:weekNum");
  const [, setLocation] = useLocation();
  const { language } = useAccessibility();
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: number;
  } | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<
    "no_attempt" | "submitted"
  >("no_attempt");
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "recent" | "upload" | "private"
  >("upload");
  const [fileName, setFileName] = useState("");
  const successMessageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [showLateWarning, setShowLateWarning] = useState(false);
  const { toast } = useToast();

  // Check if submission is late (for demo purposes, we'll simulate this)
  const isLateSubmission = false; // In real app, compare with deadline

  const courseId = params?.courseId as string;
  const weekNum = parseInt(params?.weekNum as string);
  const courseData = getCourseContent(courseId);

  // Safety check for courseData
  if (!courseData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {language === "ka" ? "კურსი ვერ მოიძებნა" : "Course not found"}
            </h1>
            <Button onClick={() => setLocation("/dashboard")}>
              {language === "ka"
                ? "დაბრუნება დაშბორდში"
                : "Return to Dashboard"}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const course = {
    id: courseData.id,
    title: courseData.title,
    instructor: courseData.instructor,
  };

  // Find the week from courseData.weeks array
  const week = courseData.weeks?.find((w) => w.id === weekNum);

  // Create assignment object from week data if week has an assignment
  const assignment = week?.assignment
    ? {
        titleEn: week.assignment,
        titleKa: week.title.ka,
        descriptionEn: `Complete the ${week.assignment} assignment for ${week.title.en}`,
        descriptionKa: `შეასრულეთ ${week.title.ka} დავალება`,
        dueEn: "December 30, 2025, 11:59 PM",
        dueKa: "30 დეკემბერი, 2025, 23:59",
      }
    : null;

  if (!course || !assignment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {language === "ka"
                ? "დავალება ვერ მოიძებნა"
                : "Assignment not found"}
            </h1>
            <p className="text-muted-foreground mb-4">
              {language === "ka"
                ? "ეს კვირა არ შეიცავს დავალებას."
                : "This week does not have an assignment."}
            </p>
            <Button onClick={() => setLocation(`/course/${courseId}`)}>
              {language === "ka" ? "დაბრუნება კურსში" : "Return to Course"}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const courseTitle = language === "ka" ? course.title.ka : course.title.en;
  const assignmentTitle =
    language === "ka" ? assignment.titleKa : assignment.titleEn;
  const assignmentDesc =
    language === "ka" ? assignment.descriptionKa : assignment.descriptionEn;
  const dueDate = language === "ka" ? assignment.dueKa : assignment.dueEn;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.name.endsWith(".docx"))
    ) {
      setUploadedFile({ name: file.name, size: file.size });
      setFileName(file.name.replace(/\.[^/.]+$/, ""));
      setIsModalOpen(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({ name: file.name, size: file.size });
      setFileName(file.name.replace(/\.[^/.]+$/, ""));
      setIsModalOpen(true);
    }
  };

  const handleUploadConfirm = () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    setIsModalOpen(false);

    // Simulate upload delay
    setTimeout(() => {
      setSubmissionStatus("submitted");
      setIsUploading(false);
      if (successMessageRef.current) {
        successMessageRef.current.focus();
      }
    }, 2000);
  };

  const openFilePicker = () => {
    setIsModalOpen(true);
    setSelectedTab("upload");
  };

  // Save draft handler
  const handleSaveDraft = () => {
    if (uploadedFile) {
      setIsDraftSaved(true);
      toast({
        title: language === "ka" ? "მონახაზი შენახულია" : "Draft saved",
        description:
          language === "ka"
            ? "თქვენი ფაილი შენახულია მონახაზად."
            : "Your file has been saved as a draft. You can continue later.",
      });
    }
  };

  // Preview handler - opens confirmation dialog
  const handlePreview = () => {
    if (uploadedFile) {
      if (isLateSubmission) {
        setShowLateWarning(true);
      } else {
        setShowPreviewDialog(true);
      }
    }
  };

  // Final submit after preview confirmation
  const handleFinalSubmit = () => {
    setShowPreviewDialog(false);
    setShowLateWarning(false);
    setIsUploading(true);

    setTimeout(() => {
      setSubmissionStatus("submitted");
      setIsUploading(false);
      if (successMessageRef.current) {
        successMessageRef.current.focus();
      }
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="p-6 max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation(`/course/${courseId}`)}
              className="gap-2"
              data-testid="button-back-to-course"
            >
              <ChevronLeft className="h-4 w-4" />
              {language === "ka" ? "დაბრუნება კურსში" : "Back to Course"}
            </Button>
          </div>

          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-muted-foreground mb-8"
          >
            <ol className="flex flex-wrap gap-1">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/dashboard");
                  }}
                  className="hover:underline focus:underline focus:outline-none"
                >
                  {language === "ka" ? "დაშბორდი" : "Dashboard"}
                </a>
              </li>
              <li aria-hidden="true"> &gt; </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/dashboard");
                  }}
                  className="hover:underline focus:underline focus:outline-none"
                >
                  {language === "ka" ? "ჩემი კურსები" : "My Courses"}
                </a>
              </li>
              <li aria-hidden="true"> &gt; </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation(`/course/${courseId}`);
                  }}
                  className="hover:underline focus:underline focus:outline-none"
                >
                  {courseTitle}
                </a>
              </li>
              <li aria-hidden="true"> &gt; </li>
              <li aria-current="page" className="font-medium text-foreground">
                {assignmentTitle}
              </li>
            </ol>
          </nav>

          {/* Assignment Header Card */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {assignmentTitle}
              </h1>
              <p className="text-lg text-muted-foreground">{courseTitle}</p>
            </div>

            <div className="space-y-4 border-t pt-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">
                  {language === "ka" ? "აღწერა" : "Description"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {assignmentDesc}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-500" />
                <p className="text-sm font-semibold text-foreground">
                  {language === "ka" ? "ვადა:" : "Due Date:"}
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  {dueDate}
                </p>
              </div>
            </div>
          </div>

          {/* Submission Status Table */}
          <div className="bg-card border rounded-lg overflow-hidden mb-6">
            <table
              className="w-full"
              role="table"
              aria-label={
                language === "ka" ? "წარდგენის სტატუსი" : "Submission Status"
              }
            >
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    {language === "ka" ? "კრიტერიუმი" : "Criteria"}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    {language === "ka" ? "სტატუსი" : "Status"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {language === "ka"
                      ? "წარდგენის მდგომარეობა"
                      : "Submission Status"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {submissionStatus === "submitted" ? (
                        <>
                          <CheckCircle2
                            className="h-4 w-4 text-green-600"
                            aria-hidden="true"
                          />
                          <span className="text-sm font-medium text-green-700 dark:text-green-400">
                            {language === "ka" ? "გაგზავნილია" : "Submitted"}
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle
                            className="h-4 w-4 text-orange-500"
                            aria-hidden="true"
                          />
                          <span className="text-sm font-medium text-orange-700 dark:text-orange-400">
                            {language === "ka"
                              ? "ცდომილება არ გაკეთებულა"
                              : "No Attempt"}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {language === "ka"
                      ? "შეფასების მდგომარეობა"
                      : "Grading Status"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      {submissionStatus === "submitted"
                        ? language === "ka"
                          ? "მოლოდინში"
                          : "Pending"
                        : language === "ka"
                          ? "არ არის შეფასებული"
                          : "Not Graded"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {language === "ka" ? "დარჩენილი დრო" : "Time Remaining"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                      {language === "ka" ? "7 დღე 12 საათი" : "7 days 12 hours"}
                    </span>
                  </td>
                </tr>
                {uploadedFile && submissionStatus === "submitted" && (
                  <tr>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {language === "ka" ? "ატვირთული ფაილი" : "Uploaded File"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <File
                          className="h-4 w-4 text-blue-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-foreground">
                          {uploadedFile.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({formatFileSize(uploadedFile.size)})
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Upload Area - Only show if not submitted */}
          {submissionStatus === "no_attempt" && (
            <div className="bg-card border rounded-lg p-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold">
                  {language === "ka" ? "ფაილის ატვირთვა" : "File Submission"}
                </h2>
                {/* Help Tooltip - Help and Documentation Heuristic */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                      >
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">
                          {language === "ka" ? "დახმარება" : "Help"}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs p-3">
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold">
                          {language === "ka"
                            ? "მიღებული ფორმატები:"
                            : "Accepted formats:"}
                        </p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>PDF (.pdf)</li>
                          <li>Microsoft Word (.docx)</li>
                        </ul>
                        <p className="font-semibold mt-2">
                          {language === "ka" ? "მაქს. ზომა:" : "Max size:"}
                        </p>
                        <p>50 MB</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {isDraftSaved && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  >
                    <Save className="h-3 w-3 mr-1" />
                    {language === "ka" ? "მონახაზი შენახულია" : "Draft Saved"}
                  </Badge>
                )}
              </div>

              <div
                role="button"
                tabIndex={0}
                aria-label={
                  language === "ka"
                    ? "ფაილის ატვირთვის ზონა - გადაიტანეთ ფაილი ან დააჭირეთ ასარჩევად"
                    : "File upload zone - drag a file or click to select"
                }
                className="border-2 border-dashed border-primary rounded-lg p-12 text-center bg-primary/5 hover:bg-primary/10 focus:bg-primary/10 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={openFilePicker}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openFilePicker();
                  }
                }}
                data-testid="dropzone-assignment-upload"
              >
                <Upload
                  className="h-12 w-12 text-primary mx-auto mb-4"
                  aria-hidden="true"
                />
                <p className="text-lg font-semibold text-foreground mb-2">
                  {language === "ka"
                    ? "გადაიტანეთ ფაილი აქ"
                    : "Drag Your File Here"}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  {language === "ka"
                    ? "ან დააჭირეთ ფაილის ასარჩევად"
                    : "or click to choose a file"}
                </p>
                <Button
                  variant="default"
                  onClick={(e) => {
                    e.stopPropagation();
                    openFilePicker();
                  }}
                  data-testid="button-browse-files-assignment"
                >
                  <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                  {language === "ka" ? "აირჩიეთ ფაილი" : "Choose File"}
                </Button>
                <p className="text-xs text-muted-foreground mt-6">
                  {language === "ka"
                    ? "მხარდაჭერილი ფორმატები: PDF, Word (.docx)"
                    : "Supported formats: PDF, Word (.docx)"}
                </p>
              </div>

              {isUploading && (
                <div
                  className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded flex items-center gap-3"
                  role="status"
                  aria-live="polite"
                >
                  <div
                    className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"
                    aria-hidden="true"
                  ></div>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {language === "ka"
                      ? "ფაილი იტვირთება..."
                      : "Uploading file..."}
                  </p>
                </div>
              )}

              {/* Save Draft and Preview Buttons - Flexibility and Efficiency Heuristic */}
              {uploadedFile && !isUploading && (
                <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg flex items-center gap-3 flex-1">
                    <File className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(uploadedFile.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleSaveDraft}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {language === "ka" ? "მონახაზის შენახვა" : "Save Draft"}
                    </Button>
                    <Button
                      variant="default"
                      onClick={handlePreview}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      {language === "ka"
                        ? "გადახედვა & გაგზავნა"
                        : "Preview & Submit"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Success State */}
          {submissionStatus === "submitted" && (
            <div
              ref={successMessageRef}
              tabIndex={-1}
              className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center"
              role="status"
              aria-live="polite"
              data-testid="success-message-assignment"
            >
              <CheckCircle2
                className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4"
                aria-hidden="true"
              />
              <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                {language === "ka"
                  ? "წარმატებით გაგზავნილია!"
                  : "Successfully Submitted!"}
              </h2>
              <p className="text-sm text-green-600 dark:text-green-500 mb-6">
                {language === "ka"
                  ? "თქვენი დავალება მიღებულია. ლექტორი მალე შეამოწმებს."
                  : "Your assignment has been received. Your instructor will review it soon."}
              </p>
              <Button
                variant="default"
                onClick={() => setLocation(`/course/${courseId}`)}
                data-testid="button-return-to-course"
              >
                {language === "ka" ? "დაბრუნება კურსში" : "Return to Course"}
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* File Picker Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {language === "ka" ? "ფაილის არჩევა" : "File picker"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 border-r pr-4 space-y-1">
              <button
                onClick={() => setSelectedTab("recent")}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedTab === "recent" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {language === "ka" ? "ბოლო ფაილები" : "Recent files"}
              </button>
              <button
                onClick={() => setSelectedTab("upload")}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedTab === "upload" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {language === "ka" ? "ფაილის ატვირთვა" : "Upload a file"}
              </button>
              <button
                onClick={() => setSelectedTab("private")}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedTab === "private" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {language === "ka" ? "პირადი ფაილები" : "Private files"}
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 pl-4 overflow-y-auto">
              {selectedTab === "recent" && (
                <div className="text-center py-8 text-muted-foreground">
                  <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "ka"
                      ? "ბოლო ფაილები არ არის"
                      : "No recent files"}
                  </p>
                </div>
              )}

              {selectedTab === "upload" && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx"
                      className="hidden"
                      onChange={handleFileSelect}
                      aria-label={
                        language === "ka" ? "ფაილის არჩევა" : "Choose file"
                      }
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {language === "ka" ? "ფაილის არჩევა" : "Choose File"}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      {language === "ka"
                        ? "მაქს. ზომა: 50MB"
                        : "Max size: 50MB"}
                    </p>
                  </div>

                  {uploadedFile && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <File className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="font-medium text-sm">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(uploadedFile.size)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="save-as" className="text-sm">
                            {language === "ka" ? "შენახვა როგორც" : "Save as"}
                          </Label>
                          <Input
                            id="save-as"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="mt-1"
                          />
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>
                            {language === "ka" ? "ავტორი:" : "Author:"}
                          </span>
                          <span className="font-medium text-foreground">
                            {language === "ka" ? currentUser.name.ka : currentUser.name.en}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedTab === "private" && (
                <div className="text-center py-8 text-muted-foreground">
                  <File className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === "ka"
                      ? "პირადი ფაილები არ არის"
                      : "No private files"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              {language === "ka" ? "გაუქმება" : "Cancel"}
            </Button>
            <Button
              onClick={handleUploadConfirm}
              disabled={!uploadedFile}
              className="bg-primary"
            >
              <Upload className="h-4 w-4 mr-2" />
              {language === "ka" ? "ამ ფაილის ატვირთვა" : "Upload this file"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Confirmation Dialog - Help Users Recognize, Diagnose, Recover from Errors */}
      <AlertDialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === "ka"
                ? "დადასტურება გაგზავნამდე"
                : "Confirm Submission"}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {language === "ka"
                    ? "გთხოვთ გადახედოთ ინფორმაციას გაგზავნამდე:"
                    : "Please review your submission details:"}
                </p>
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      {language === "ka" ? "კურსი:" : "Course:"}
                    </span>
                    <span className="text-sm font-medium">{courseTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      {language === "ka" ? "დავალება:" : "Assignment:"}
                    </span>
                    <span className="text-sm font-medium">
                      {assignmentTitle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      {language === "ka" ? "ფაილი:" : "File:"}
                    </span>
                    <span className="text-sm font-medium">
                      {uploadedFile?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      {language === "ka" ? "ზომა:" : "Size:"}
                    </span>
                    <span className="text-sm font-medium">
                      {uploadedFile ? formatFileSize(uploadedFile.size) : ""}
                    </span>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === "ka" ? "უკან" : "Go Back"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleFinalSubmit}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {language === "ka"
                ? "დადასტურება და გაგზავნა"
                : "Confirm & Submit"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Late Submission Warning Dialog */}
      <AlertDialog open={showLateWarning} onOpenChange={setShowLateWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              {language === "ka"
                ? "გვიანი წარდგენა"
                : "Late Submission Warning"}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {language === "ka"
                    ? "ეს დავალება დაგვიანებულია. დაგვიანებული წარდგენა შეიძლება გამოიწვიოს ქულის შემცირება."
                    : "This submission is past the due date. Late submissions may result in a grade penalty."}
                </p>
                <div className="p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                    {language === "ka"
                      ? "დაგვიანებული: 2 დღე და 5 საათი"
                      : "Late by: 2 days and 5 hours"}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "ka"
                    ? "გსურთ მაინც გაგზავნა?"
                    : "Do you still want to submit?"}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === "ka" ? "გაუქმება" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleFinalSubmit}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              {language === "ka" ? "მაინც გაგზავნა" : "Submit Anyway"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
