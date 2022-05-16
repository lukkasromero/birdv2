import ThreeLazy from "./ThreeLazy";

const WelcomeSection = () => {
  return (
    <div id="welcome" className="bg-slate-100">
      <div className="relative">
        <ThreeLazy />
        <div className="relative container max-w-7xl mx-auto px-8 py-8 pt-0 lg:pt-4">
          <main className="lg:pt-2 pt-7 lg:pb-24 pb-40">
            <div className="grid gap-12 z-30 text-center">
              <div className="grid gap-8 flex justify-center">
                <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                  <div className="mx-auto rounded-lg lg:px-8 lg:py-0 py-4">
                    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
                      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
                      Stake and Earn Up to 241% of your deposit on <span className="text-yellow-500">BUSD BirdStaking</span>
                      </h1>
                      <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto">
                      Stake your BUSD and get daily rewards with BirdStaking!
                      </p>
                      <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
                        <a
                          className="bg-slate-900 cursor-pointer hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-12 rounded-lg w-full flex items-center justify-center sm:w-auto"
                          href="#dashboard"
                        >
                          Invest
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
