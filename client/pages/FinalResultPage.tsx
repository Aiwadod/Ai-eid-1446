import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function FinalResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    if (canvas) {
      const link = document.createElement("a");
      link.download = `eid-design-${name || "design"}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleShare = () => {
    const canvas = canvasRef.current;
    if (canvas && navigator.share) {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `eid-design-${name || "design"}.png`, {
            type: "image/png",
          });
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
        }
      });
    } else {
      handleDownload(); // Fallback to download
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      canvas &&
      designImages[selectedDesign] &&
      textPositions[selectedDesign]
    ) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          // Set canvas size to match image
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw the background image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Add text overlay
          const position = textPositions[selectedDesign];

          // Set font properties
          ctx.font = "bold 24px Arial, sans-serif";
          ctx.fillStyle = position.color || "#FFFFFF";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Add text stroke for better visibility
          ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
          ctx.lineWidth = 2;

          // Calculate position based on canvas size
          let x = 0;
          let y = 0;

          if (
            typeof position.left === "string" &&
            position.left.includes("%")
          ) {
            x = (parseFloat(position.left) / 100) * canvas.width;
          } else if (typeof position.left === "string") {
            x = parseFloat(position.left);
          } else {
            x = position.left;
          }

          if (typeof position.top === "string" && position.top.includes("%")) {
            y = (parseFloat(position.top) / 100) * canvas.height;
          } else if (typeof position.top === "string") {
            y = parseFloat(position.top.replace("px", ""));
          } else {
            y = position.top;
          }

          // Ensure text is within canvas bounds
          if (x < 0) x = canvas.width / 2;
          if (y < 0) y = canvas.height / 2;
          if (x > canvas.width) x = canvas.width / 2;
          if (y > canvas.height) y = canvas.height / 2;

          // Draw text with stroke first, then fill
          if (ctx.lineWidth > 0) {
            ctx.strokeText(name, x, y);
          }
          ctx.fillText(name, x, y);
        };

        img.onerror = () => {
          console.error("Failed to load image:", designImages[selectedDesign]);
        };

        img.src = designImages[selectedDesign];
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

              {/* Hidden Canvas for Download */}
              <canvas ref={canvasRef} style={{ display: "none" }} />

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
