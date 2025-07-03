import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OtherDesignsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || "";
  const selectedOption = location.state?.selectedOption || "";
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);

  const handleBack = () => {
    navigate("/next", { state: { name } });
  };

  const handleNext = () => {
    if (selectedDesign === null) {
      alert("يرجى اختيار تصميم أولاً");
      return;
    }
    console.log("Selected design:", selectedDesign);
    alert(`تم اختيار التصميم رقم ${selectedDesign + 1}`);
  };

  const handleDesignSelect = (designIndex: number) => {
    setSelectedDesign(designIndex);
  };

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
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-white/20 shadow-2xl">
            <div className="space-y-8">
              {/* Main Question */}
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
                  <p>اختار التصميم الذي يناسبك :</p>
                </h1>
              </div>

              {/* Content Grid - تصاميم قابلة للاختيار */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* تصميم 1: Traditional Buildings 1 */}
                <button
                  onClick={() => handleDesignSelect(0)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 0
                      ? "border-orange-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F6eaba692d0cb43efa6cb4146c46da6cd?format=webp&width=800"
                    alt="تصميم ال��باني التراثية 1"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute"
                    style={{
                      left: "45%",
                      top: "18%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <span
                      style={{
                        color: "#CD7D25",
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 2: Children with Building */}
                <button
                  onClick={() => handleDesignSelect(1)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 1
                      ? "border-blue-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fe382ee81b4f543dfa715bd27f662d080?format=webp&width=800"
                    alt="تصميم الأطفال مع المباني"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute transform -translate-x-1/2"
                    style={{
                      left: "45.5%",
                      top: "21.5%",
                      paddingLeft: "-3px",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFF",
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 3: Globe with Children Night */}
                <button
                  onClick={() => handleDesignSelect(2)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 2
                      ? "border-blue-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F2262e547591344f0b2d8aaa805e39c19?format=webp&width=800"
                    alt="تصميم الكرة الأرضية مع الأطفال الليلية"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute"
                    style={{
                      left: "93px",
                      top: "255px",
                      transform: "matrix(1, 0, 0, 1, -54.832, -33.5)",
                      padding: "7px 0 0 22px",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFF",
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 4: Globe Night Scene */}
                <button
                  onClick={() => handleDesignSelect(3)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 3
                      ? "border-blue-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F0a790e5233b14f1184fd4225f3fe4fc1?format=webp&width=800"
                    alt="تصميم الكرة ��لأرضية الليلية"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute top-[58px] left-[52%] transform -translate-x-1/2">
                    <span
                      style={{
                        color: "#FFF",
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 5: Lanterns Day */}
                <button
                  onClick={() => handleDesignSelect(4)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 4
                      ? "border-green-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F52b65e90e4684ca28f041fd9f404c133?format=webp&width=800"
                    alt="تصميم الفوانيس النهارية"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute transform -translate-x-1/2"
                    style={{
                      top: "65px",
                      left: "45%",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFF",
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                      }}
                    >
                      {name || "عبدالوهاب عبدالعزيز"}
                    </span>
                  </div>
                </button>

                {/* تصميم 6: Fireworks and Fountain */}
                <button
                  onClick={() => handleDesignSelect(5)}
                  className={`relative glass-input rounded-2xl p-0 border min-h-[300px] overflow-hidden transition-all duration-200 hover:scale-105 ${
                    selectedDesign === 5
                      ? "border-yellow-400 border-2"
                      : "border-white/30"
                  }`}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F96b53ae5f1eb40a1ae739dceab99b054?format=webp&width=800"
                    alt="تصميم الألعاب النارية والنافورة"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute transform -translate-x-1/2"
                    style={{
                      top: "56px",
                      left: "48%",
                      paddingLeft: "-5px",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFF",
                        fontFamily:
                          "KO Aynama, Amiri, Scheherazade New, Noto Naskh Arabic, Cairo, system-ui, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontStyle: "normal",
                      }}
                    >
                      {name || "عبدالوهاب عبدالع��يز"}
                    </span>
                  </div>
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 pt-4">
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

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  disabled={selectedDesign === null}
                  className={`glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px] ${
                    selectedDesign !== null
                      ? "hover:bg-white/20 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
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
                    التالي
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
