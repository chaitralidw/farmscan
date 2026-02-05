import { useState, useRef, useCallback, useEffect } from "react";
import { Camera, Upload, Image as ImageIcon, X, SwitchCamera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export function ImageUploader({
  onImageSelect,
  selectedImage,
  onClear,
}: ImageUploaderProps) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraFacing, setCameraFacing] = useState<"user" | "environment">(
    "environment",
  );
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Effect to attach stream when video element becomes available
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current && !videoRef.current.srcObject) {
      console.log("Attaching stream to video element");
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(e => console.error("Auto-play failed:", e));
    }
  }, [isCameraActive, capturedImage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onImageSelect(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const startCamera = async () => {
    console.log("startCamera function called!");
    setIsCameraLoading(true);
    
    // Fallback timeout - if camera doesn't load in 10 seconds, show error
    const timeoutId = setTimeout(() => {
      console.error("Camera loading timeout!");
      setIsCameraLoading(false);
      alert("Camera is taking too long to load. Please try again or use file upload.");
    }, 10000);
    
    try {
      // Detect if mobile device
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      setIsMobile(isMobileDevice);

      console.log("Requesting camera access...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      
      console.log("Camera stream obtained:", stream);
      streamRef.current = stream;
      
      // Activate camera UI
      // The useEffect above will handle attaching the stream to the video element
      console.log("Activating camera UI");
      clearTimeout(timeoutId);
      setIsCameraActive(true);
      setIsCameraLoading(false);
      
    } catch (err) {
      // If camera fails, fall back to file input
      clearTimeout(timeoutId);
      console.error("Camera error:", err);
      alert(`Camera error: ${err instanceof Error ? err.message : 'Unknown error'}. Please use file upload instead.`);
      setIsCameraLoading(false);
      cameraInputRef.current?.click();
    }
  };

  const switchCamera = async () => {
    stopCamera();
    setCameraFacing((prev) =>
      prev === "environment" ? "user" : "environment",
    );
    // Restart camera with new facing mode
    setTimeout(() => startCamera(), 100);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0);
        const imageUrl = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageUrl);
      }
    }
  };

  const acceptPhoto = () => {
    if (capturedImage) {
      onImageSelect(capturedImage);
      stopCamera();
      setCapturedImage(null);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  if (selectedImage) {
    return (
      <Card variant="elevated" className="relative overflow-hidden">
        <img
          src={selectedImage}
          alt="Selected leaf"
          className="w-full aspect-square object-cover rounded-xl"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-3 right-3"
          onClick={onClear}
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Scanning animation overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
        </div>
      </Card>
    );
  }

  // Show loading state while camera is initializing
  if (isCameraLoading) {
    return (
      <div className="space-y-4">
        <Card
          variant="elevated"
          className="relative overflow-hidden bg-black aspect-square flex items-center justify-center"
        >
          <div className="text-center text-white">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">{t("common.loading")}</p>
          </div>
        </Card>
      </div>
    );
  }

  // Camera view - integrated into main box
  if (isCameraActive) {
    // Show captured preview with accept/retake options
    if (capturedImage) {
      return (
        <div className="space-y-4">
          <Card variant="elevated" className="relative overflow-hidden">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full aspect-square object-cover rounded-xl"
            />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" onClick={retakePhoto}>
              {t("scan.retake")}
            </Button>
            <Button variant="default" size="lg" onClick={acceptPhoto}>
              ✓ {t("scan.usePhoto")}
            </Button>
          </div>
        </div>
      );
    }

    // Show live camera feed with overlay frame
    return (
      <div className="space-y-4">
        <Card
          variant="elevated"
          className="relative overflow-hidden bg-black"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full aspect-square object-cover rounded-xl"
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Camera overlay frame */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner frames */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-lg" />
            
            {/* Center scanning line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70 animate-pulse" />
          </div>
          
          {/* Flip camera button for mobile - positioned on top of video */}
          {isMobile && (
            <Button
              variant="secondary"
              size="icon"
              onClick={switchCamera}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
            >
              <SwitchCamera className="w-5 h-5" />
            </Button>
          )}
        </Card>
        
        {/* Camera controls */}
        <div className="flex gap-3">
          <Button variant="outline" size="lg" onClick={stopCamera} className="flex-1">
            {t("common.close")}
          </Button>
          <Button variant="default" size="lg" onClick={capturePhoto} className="flex-1">
            <Camera className="w-5 h-5 mr-2" />
            {t("scan.capture")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card
        variant="elevated"
        className={cn(
          "relative aspect-square flex flex-col items-center justify-center p-6 border-2 border-dashed transition-all cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center mb-4">
          <ImageIcon className="w-10 h-10 text-primary" />
        </div>
        <p className="text-lg font-semibold text-foreground text-center mb-2">
          {t("scan.instructions")}
        </p>
        <p className="text-sm text-muted-foreground text-center">
          {t("scan.dragDrop")}
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={startCamera}
        >
          <Camera className="w-5 h-5 mr-2" />
          {t("scan.camera")}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-5 h-5 mr-2" />
          {t("scan.upload")}
        </Button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) =>
          e.target.files?.[0] && handleFileSelect(e.target.files[0])
        }
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) =>
          e.target.files?.[0] && handleFileSelect(e.target.files[0])
        }
      />
    </div>
  );
}
