export default function About(): React.JSX.Element {
  return (
    <>
      <section className="py-6 flex justify-center">
        <div className="bg-yellow-200 p-6 rounded-2xl shadow-[0_4px_14px_-4px_rgba(0,0,0,0.1)] text-[#2A2A2A] relative transition-transform duration-300 ease-in-out cursor-pointer hover:scale-[1.03] hover:-translate-y-1 w-full max-w-[600px]">
          <div className="flex items-center justify-end gap-4 mb-4">
            <div>
              <h4 className="text-lg font-bold text-primary font-serif">
                Elizaveta Medvedeva
              </h4>
            </div>
            <img
              src="elizaveta.png"
              alt="Elizaveta"
              className="w-[80px] h-[80px] rounded-full object-cover shadow-md"
            ></img>
          </div>
          <p className="text-[15px] leading-relaxed mb-2">
            I&apos;m a junior frontend developer with a passion for creating
            clean, responsive user interfaces. Currently, I&apos;m deepening my
            skills by completing an advanced React course as part of the RS
            School program. I&apos;m focused on building real-world projects,
            improving component architecture, and learning best practices in
            modern frontend development.
          </p>

          <div className="mt-4">
            <h5 className="font-semibold mb-2 text-[15px] text-primary">
              Key Skills & Focus
            </h5>
            <ul className="list-disc list-inside text-[15px] text-[#444] space-y-1 marker:text-primary">
              <li>React & Component-based Architecture</li>
              <li>Responsive Layouts with Tailwind CSS</li>
              <li>Git, GitHub, and collaborative development</li>
              <li>Continual learning and building projects</li>
            </ul>
          </div>

          <a
            href="https://github.com/elizabethmedvedeva"
            className="absolute bottom-4 right-4 transition-transform duration-300 ease-in-out hover:scale-110"
          >
            <div className="w-[40px] h-[40px] rounded-full bg-primary flex items-center justify-center">
              <img
                src="github_logo.png"
                alt="githublogo"
                className="w-[35px] h-[35px]"
              />
            </div>
          </a>
        </div>
      </section>
      <section className="bc-section-background py-6 px-5 lg:px-[120px]">
        <div className="max-w-screen-md mx-auto w-full flex flex-col items-center justify-center text-center gap-6">
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] text-primary font-serif font-semibold leading-snug">
            RS School
          </h2>

          <div className="flex items-center gap-6 justify-center flex-wrap">
            <a
              href="https://rs.school/courses/reactjs"
              className="shrink-0 transition-transform duration-300 ease-out hover:scale-105"
            >
              <img
                src="rss-logo.svg"
                alt="RS School Logo"
                className="w-[80px] h-[80px]"
              />
            </a>
            <div className="max-w-md text-[#676867] text-[15px] sm:text-[16px] leading-relaxed font-sans text-left">
              <p>
                Proudly built by graduates of{' '}
                <a
                  href="https://rs.school/"
                  className="font-semibold text-[hsl(50,100%,56%)] hover:scale-105 inline-block transition-transform duration-300 ease-out"
                >
                  RS School
                </a>
                . Click the logo to learn more about the educational program.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
