import FeatureCard from "./subcomponents/FeaturesCard";

const Features = () => {
  const features = [
    {
      title: "Advanced Analytics",
      description:
        "Get deep insights into your data with powerful analytics tools and real-time reporting dashboards.",
      icon: "📊",
    },
    {
      title: "Team Collaboration",
      description:
        "Work seamlessly with your team using built-in collaboration tools and shared workspaces.",
      icon: "👥",
    },
    {
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with 99.9% uptime guarantee and automated backups.",
      icon: "🔒",
    },
    {
      title: "Easy Integration",
      description:
        "Connect with your existing tools through our robust API and pre-built integrations.",
      icon: "🔗",
    },
    {
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our dedicated support team available around the clock.",
      icon: "💬",
    },
    {
      title: "Scalable Solution",
      description:
        "Grow your business without limits. Our platform scales with your needs automatically.",
      icon: "📈",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Powerful Features for Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to streamline your workflow and boost
            productivity
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
