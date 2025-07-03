import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";

export default function FinalResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const name = location.state?.name || "";
  const selectedDesign = location.state?.selectedDesign || 0;
  const selectedOption = location.state?.selectedOption || "";
  const designImages = location.state?.designImages || [];
  const textPositions = location.state?.textPositions || [];

  const handleBack = () => {
    if (selectedOption === "نادي الذكاء الاصطناعي") {
      navigate("/ai-club", { state: { name, selectedOption } });
    } else {
      navigate("/other-designs", { state: { name, selectedOption } });
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      alert("لم يتم العثور على التصميم. يرجى المحاولة مرة أخرى.");
      return;
    }

    // Check if canvas has content
    const ctx = canvas.getContext("2d");
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
    const hasContent = imageData?.data.some((pixel) => pixel !== 0);

    if (!hasContent) {
      alert("يتم تحضير التصميم... يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.");
      return;
    }

    // Wait a moment to ensure canvas is fully rendered
    setTimeout(() => {
      try {
        const dataURL = canvas.toDataURL("image/png", 1.0);

        // Check if the dataURL is valid
        if (dataURL === "data:,") {
          alert("فشل في إنشاء الصورة. يرجى المحاولة مرة أخرى.");
          return;
        }

        const link = document.createElement("a");
        link.download = `eid-design-${name.replace(/\s+/g, "-") || "design"}.png`;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("Download successful for:", name);
      } catch (error) {
        console.error("Download failed:", error);
        alert("حدث خطأ أثناء التحميل. يرجى المحاولة مرة أخرى.");
      }
    }, 500);
  };

  const handleShare = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      setTimeout(() => {
        try {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                if (navigator.share && navigator.canShare) {
                  const file = new File(
                    [blob],
                    `eid-design-${name || "design"}.png`,
                    {
                      type: "image/png",
                    },
                  );

                  if (navigator.canShare({ files: [file] })) {
                    navigator
                      .share({
                        title: "تصميم عيد الأضحى المبارك",
                        text: `تصميم عيد الأضحى المبارك - ${name}`,
                        files: [file],
                      })
                      .catch((error) => {
                        console.log("Error sharing:", error);
                        handleDownload(); // Fallback to download
                      });
                  } else {
                    handleDownload(); // Fallback to download
                  }
                } else {
                  handleDownload(); // Fallback to download
                }
              }
            },
            "image/png",
            1.0,
          );
        } catch (error) {
          console.error("Share failed:", error);
          handleDownload(); // Fallback to download
        }
      }, 100);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      canvas &&
      designImages[selectedDesign] &&
      textPositions[selectedDesign] &&
      name
    ) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Create a proxy URL to avoid CORS issues
        const imageUrl = designImages[selectedDesign];

        // Set fixed canvas size for consistent output
        canvas.width = 800;
        canvas.height = 800;

        // Clear canvas first
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const img = new Image();

        img.onload = () => {
          try {
            // Draw the background image to fill the canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Add text overlay
            const position = textPositions[selectedDesign];

            // Set font properties for Arabic text
            ctx.font = 'bold 32px Arial, "Helvetica Neue", sans-serif';
            ctx.fillStyle = position.color || "#FFFFFF";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Add text stroke for better visibility
            ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
            ctx.lineWidth = 3;

            // Calculate position based on canvas size
            let x = canvas.width / 2; // Default to center
            let y = canvas.height / 2; // Default to center

            // Handle percentage-based positions
            if (
              typeof position.left === "string" &&
              position.left.includes("%")
            ) {
              x = (parseFloat(position.left) / 100) * canvas.width;
            } else if (typeof position.left === "string") {
              const leftValue = parseFloat(position.left.replace("px", ""));
              x = (leftValue / 800) * canvas.width; // Scale to canvas size
            } else if (typeof position.left === "number") {
              x = (position.left / 800) * canvas.width; // Scale to canvas size
            }

            if (
              typeof position.top === "string" &&
              position.top.includes("%")
            ) {
              y = (parseFloat(position.top) / 100) * canvas.height;
            } else if (typeof position.top === "string") {
              const topValue = parseFloat(position.top.replace("px", ""));
              y = (topValue / 800) * canvas.height; // Scale to canvas size
            } else if (typeof position.top === "number") {
              y = (position.top / 800) * canvas.height; // Scale to canvas size
            }

            // Ensure text is within canvas bounds with margin
            const margin = 50;
            x = Math.max(margin, Math.min(canvas.width - margin, x));
            y = Math.max(margin, Math.min(canvas.height - margin, y));

            // Draw text with stroke first, then fill
            ctx.strokeText(name, x, y);
            ctx.fillText(name, x, y);

            console.log(
              `Text "${name}" drawn at position (${x}, ${y}) with color ${position.color}`,
            );
          } catch (error) {
            console.error("Error drawing on canvas:", error);
          }
        };

        img.onerror = (error) => {
          console.error("Failed to load image:", imageUrl, error);
          // Draw fallback with text only
          ctx.fillStyle = "#0066cc";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 32px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(name, canvas.width / 2, canvas.height / 2);
        };

        // Set image source without crossOrigin to avoid CORS issues
        img.src = imageUrl;
      }
    }
  }, [name, selectedDesign, designImages, textPositions]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.builder.io/api/v1/image/assets/TEMP/b37441c973e48eb00df249611cee60605f9128e1?width=3026')",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-8"
        style={{ marginTop: "-4px" }}
      >
        {/* Logo */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/44601a5eb5d1394f281854f475784406e2daf9df?width=1009"
          alt="Logo"
          className="h-12 sm:h-16 md:h-20 lg:h-22 w-auto object-contain max-w-[90vw] mb-8 sm:mb-12 md:mb-16"
          style={{ marginTop: "-2px" }}
        />

        {/* Main Card */}
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-white/20 shadow-2xl">
            <div className="space-y-8">
              {/* Success Message */}
              <div className="text-center">
                <h1
                  style={{
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily:
                      "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                    fontSize: "clamp(24px, 5vw, 48px)",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal",
                  }}
                >
                  تم إنشاء تصميمك بنجاح!
                </h1>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.75)",
                    fontFamily:
                      "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                    fontSize: "18px",
                    marginTop: "16px",
                  }}
                >
                  عيد أضحى مبارك يا {name}
                </p>
              </div>

              {/* Preview Card */}
              <div className="relative glass-input rounded-2xl p-4 border border-white/30">
                <div className="relative aspect-square max-w-md mx-auto">
                  {designImages[selectedDesign] && (
                    <>
                      <img
                        src={designImages[selectedDesign]}
                        alt="تصميم عيد الأضحى"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      {/* Text overlay preview */}
                      <div
                        className="absolute"
                        style={{
                          left: textPositions[selectedDesign]?.left || "50%",
                          top: textPositions[selectedDesign]?.top || "50%",
                          transform: "translateX(-50%)",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            color:
                              textPositions[selectedDesign]?.color || "#FFF",
                            fontFamily:
                              "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                            fontSize: "16px",
                            fontWeight: "500",
                            fontStyle: "normal",
                          }}
                        >
                          {name}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Canvas for Download - Temporarily visible for debugging */}
              <div className="mt-4 p-4 glass-input rounded-xl border border-white/30">
                <p className="text-white text-center mb-2">معاينة التحميل:</p>
                <canvas
                  ref={canvasRef}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 hover:bg-white/20 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px] bg-green-500/20 hover:bg-green-500/30"
                >
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.90)",
                      fontFamily:
                        "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "100.909%",
                    }}
                  >
                    تحميل الصورة
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 hover:bg-white/20 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px] bg-blue-500/20 hover:bg-blue-500/30"
                >
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.90)",
                      fontFamily:
                        "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "100.909%",
                    }}
                  >
                    مشاركة
                  </span>
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 pt-4 border-t border-white/20">
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 hover:bg-white/20 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px]"
                >
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontFamily:
                        "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "100.909%",
                    }}
                  >
                    السابق
                  </span>
                </button>

                {/* New Design Button */}
                <button
                  onClick={() => navigate("/")}
                  className="glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 hover:bg-white/20 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px]"
                >
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontFamily:
                        "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: "400",
                      lineHeight: "100.909%",
                    }}
                  >
                    تصميم جديد
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
