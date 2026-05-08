const stats = [
  { value: "10+", label: "Jaar Ervaring" },
  { value: "25GB", label: "Bandbreedte" },
  { value: "20K", label: "TV Kanalen" },
  { value: "99%", label: "Uptime Garantie" },
  { value: "9K+", label: "Tevreden Klanten" },
];

export function Stats() {
  return (
    <section className="relative bg-primary-500 py-14 lg:py-16">
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6 text-center text-white">
          {stats.map((s) => (
            <div key={s.label} className="space-y-1 relative">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-none">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold opacity-90">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
