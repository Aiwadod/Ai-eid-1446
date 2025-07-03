import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function FinalResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const name = location.state?.name || "";
  const selectedDesign =
    location.state?.selectedDesign !== undefined
      ? location.state.selectedDesign
      : 0;
  const selectedOption = location.state?.selectedOption || "";
  const designImages = location.state?.designImages || [];
  const textPositions = location.state?.textPositions || [];

  // Get current design data
  const currentImage = designImages[selectedDesign];
  const currentPosition = textPositions[selectedDesign];

  const drawImageWithText = () => {
    const canvas = canvasRef.current;
    if (!canvas || !currentImage || !currentPosition || !name) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size
      canvas.width = 800;
      canvas.height = 800;

      // Draw background image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw text
      ctx.font = "bold 28px Arial, sans-serif";
      ctx.fillStyle = currentPosition.color || "#FFFFFF";
      ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";

      // Calculate text position
      let x = canvas.width / 2;
      let y = canvas.height / 2;

      if (
        typeof currentPosition.left === "string" &&
        currentPosition.left.includes("%")
      ) {
        x = (parseFloat(currentPosition.left) / 100) * canvas.width;
      } else if (typeof currentPosition.left === "string") {
        x = (parseFloat(currentPosition.left) / 800) * canvas.width;
      }

      if (
        typeof currentPosition.top === "string" &&
        currentPosition.top.includes("%")
      ) {
        y = (parseFloat(currentPosition.top) / 100) * canvas.height;
      } else if (typeof currentPosition.top === "string") {
        y =
          (parseFloat(currentPosition.top.replace("px", "")) / 800) *
          canvas.height;
      }

      // Draw text with stroke and fill
      ctx.strokeText(name, x, y);
      ctx.fillText(name, x, y);

      setImageLoaded(true);
    };

    img.src = currentImage;
  };

  const handleBack = () => {
    if (selectedOption === "نادي الذكاء الاصطناعي") {
      navigate("/ai-club", { state: { name, selectedOption } });
    } else {
      navigate("/other-designs", { state: { name, selectedOption } });
    }
  };

  const handleDownload = async () => {
    const imageElement = imageRef.current;
    if (!imageElement) {
      alert("لم يتم العثور على التصميم. يرجى المحاولة مرة أخرى.");
      return;
    }

    setIsGenerating(true);

    try {
      // Wait for images to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(imageElement, {
        useCORS: true,
        allowTaint: false,
        scale: 2, // Higher quality
        backgroundColor: null,
        logging: false,
        onclone: (clonedDoc) => {
          // Ensure all images are loaded in the cloned document
          const images = clonedDoc.querySelectorAll("img");
          images.forEach((img) => {
            img.crossOrigin = "anonymous";
          });
        },
      });

      // Create download link
      const dataURL = canvas.toDataURL("image/png", 1.0);
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
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    const imageElement = imageRef.current;
    if (!imageElement) {
      handleDownload();
      return;
    }

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(imageElement, {
        useCORS: true,
        allowTaint: false,
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

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
                    handleDownload();
                  });
              } else {
                handleDownload();
              }
            } else {
              handleDownload();
            }
          }
        },
        "image/png",
        1.0,
      );
    } catch (error) {
      console.error("Share failed:", error);
      handleDownload();
    } finally {
      setIsGenerating(false);
    }
  };

  // No need for canvas useEffect - we'll use HTML elements directly

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

              {/* Preview Card for Download */}
              <div className="relative glass-input rounded-2xl p-4 border border-white/30">
                <div
                  ref={imageRef}
                  className="relative w-[400px] h-[400px] mx-auto bg-white rounded-xl overflow-hidden"
                  style={{ aspectRatio: "1/1" }}
                >
                  {designImages[selectedDesign] && (
                    <>
                      <img
                        src={designImages[selectedDesign]}
                        alt="تصميم عيد الأضحى"
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      {/* Text overlay */}
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          left: textPositions[selectedDesign]?.left || "50%",
                          top: textPositions[selectedDesign]?.top || "50%",
                          transform: "translateX(-50%)",
                          textAlign: "center",
                          zIndex: 10,
                        }}
                      >
                        <span
                          style={{
                            color:
                              textPositions[selectedDesign]?.color || "#FFF",
                            fontFamily: "KO Aynama, Arial, sans-serif",
                            fontSize: "18px",
                            fontWeight: "bold",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                            display: "block",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {name}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                {isGenerating && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                    <p className="text-white">جاري إنشاء الصورة...</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className={`glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px] ${
                    isGenerating
                      ? "bg-gray-500/20 cursor-not-allowed opacity-50"
                      : "bg-green-500/20 hover:bg-green-500/30 hover:bg-white/20"
                  }`}
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
                    {isGenerating ? "جاري التحميل..." : "تحميل الصورة"}
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  disabled={isGenerating}
                  className={`glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px] ${
                    isGenerating
                      ? "bg-gray-500/20 cursor-not-allowed opacity-50"
                      : "bg-blue-500/20 hover:bg-blue-500/30 hover:bg-white/20"
                  }`}
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
                    {isGenerating ? "جاري المعالجة..." : "مشاركة"}
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
