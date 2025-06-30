import { useLocation, useNavigate } from "react-router-dom";

export default function NextStep() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || "";

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.builder.io/api/v1/image/assets%2Ff31aa0067f7240bca8b84a2d6d209919%2Fc705ee0fddff46eaaf94e055c0ae079a?format=webp&width=800')",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-8"
        style={{ marginTop: "-4px" }}
      >
        {/* Logo */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/85715676f15b8c93b0373cad75c744ef44dc219f?width=1009"
          alt="Logo"
          className="h-12 sm:h-16 md:h-20 lg:h-22 w-auto object-contain max-w-[90vw]"
          style={{ marginTop: "-2px" }}
        />
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20"></div>

        {/* Main Card */}
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 border border-white/20 shadow-2xl">
            <div className="space-y-8 text-center">
              {/* Welcome Message */}
              <div>
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily:
                      "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                    fontStyle: "normal",
                    fontWeight: "900",
                    lineHeight: "normal",
                  }}
                >
                  أهلاً وسهلاً {name}
                </h1>
              </div>

              {/* Success Message */}
              <div>
                <p
                  className="text-lg sm:text-xl md:text-2xl"
                  style={{
                    color: "#FFF",
                    textAlign: "center",
                    fontFamily:
                      "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                    opacity: "0.9",
                  }}
                >
                  تم تسجيل اسمك بنجاح
                </p>
              </div>

              {/* Back Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleBack}
                  className="glass-button rounded-full px-8 py-3 sm:px-12 sm:py-3 md:px-16 md:py-4 border border-white/30 transition-all duration-200 hover:bg-white/20 active:scale-95 touch-manipulation min-h-[48px] min-w-[120px]"
                >
                  <span
                    className="text-base sm:text-lg md:text-xl"
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontFamily:
                        "The Year of The Camel, Scheherazade New, Noto Naskh Arabic, Amiri, Cairo, system-ui, sans-serif",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal",
                    }}
                  >
                    العودة
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
