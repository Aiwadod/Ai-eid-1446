import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AIClubPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || "";
  const selectedOption = location.state?.selectedOption || "";

  const handleBack = () => {
    navigate("/next", { state: { name } });
  };

  const handleNext = () => {
    // Handle next step logic here
    console.log("Proceeding to next step...");
    alert("الخطوة التالية...");
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
        {/* Logo - ثابت كما طلبت */}
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
              {/* Welcome Message for AI Club Members */}
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
                  مرحباً {name} في نادي الذكاء الاصطناعي
                </h1>
              </div>

              {/* Content Grid - مكان للصور والمحتوى */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Placeholder للصور - سيتم استبدالها بالتصميم من Builder.io */}
                <div className="glass-input rounded-2xl p-0 border border-white/30 min-h-[300px] overflow-hidden">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F0f6d408a380b4e768b567e471bda4422?format=webp&width=800"
                    alt="عيد مبارك"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                <div className="glass-input rounded-2xl p-0 border border-white/30 min-h-[300px] overflow-hidden">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fe7a8bc6e60074702a35620eb622af786?format=webp&width=800"
                    alt="عيد مبارك"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                <div className="glass-input rounded-2xl p-0 border border-white/30 min-h-[300px] overflow-hidden">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2F4573685d3b664853845521b00c7c1af4?format=webp&width=800"
                    alt="عيد مبارك"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>

                <div className="glass-input rounded-2xl p-0 border border-white/30 min-h-[300px] overflow-hidden">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fe51bcf82f4d14907a2aef17e28483c47?format=webp&width=800"
                    alt="عيد مبارك"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
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
