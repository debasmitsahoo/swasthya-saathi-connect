import { useEffect, useRef } from "react";

const Team = () => {
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (teamRef.current) {
      const teamMembers = teamRef.current.querySelectorAll(".team-member");
      teamMembers.forEach((member) => {
        observer.observe(member);
      });
    }

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Debasmit Sahoo",
      rollNo: "2204000629146014",
      image: "https://img.freepik.com/free-photo/portrait-smiling-happy-young-man_171337-1532.jpg"
    },
    {
      name: "Monalisha Gochhayat",
      rollNo: "2204000629146015",
      image: "https://img.freepik.com/free-photo/portrait-smiling-happy-young-woman_171337-1532.jpg"
    },
    {
      name: "Ayush Achary",
      rollNo: "2204000629146011",
      image: "https://img.freepik.com/free-photo/portrait-smiling-happy-young-man_171337-1532.jpg"
    },
    
  ];

  return (
    <section id="team" className="py-16 md:py-24 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Mentor Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-medical-900 mb-4">
            Our Mentor
          </h2>
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src="https://img.freepik.com/free-photo/portrait-smiling-happy-young-woman_171337-1532.jpg"
                  alt="Mrs. Ronali Mohanty"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-medical-900 mb-1">Mrs. Ronali Mohanty</h4>
              <p className="text-medical-600 font-medium">Project Mentor</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-medical-900 mb-4">
            Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the talented individuals behind Swasthya Saathi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" ref={teamRef}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-member bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold text-medical-900 mb-1">{member.name}</h4>
                <p className="text-medical-600 font-medium">Roll No: {member.rollNo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team; 