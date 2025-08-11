
import { FaLaptopCode, FaStar, FaChartLine } from 'react-icons/fa';

const benefitsData = [
  {
    icon: <FaLaptopCode />,
    title: 'Realistic Test Environment',
    description: 'Our timed tests simulate real interview conditions, helping you manage time and perform under pressure.',
  },
  {
    icon: <FaStar />,
    title: ' High-Quality Questions',
    description: 'We meticulously curate a comprehensive collection of problems from the gold-standard platforms, LeetCode and Codeforces, ensuring you practice with the most relevant and challenging questions appearing in  top tech interviews',
  },
  {
    icon: <FaChartLine />,
    title: 'Visualize Your Growth',
    description: 'Gain insights into your coding journey with a powerful analytics dashboard. Instantly see your total solved questions, with a clear distinction between problems originating from LeetCode and Codeforces.'
  },
];

const WhyUsSection = () => {
  return (
    <section className="why-us-section">
      <h2>Why Choose AlgoDojo?</h2>
      <div className="benefits-grid">
        {benefitsData.map((benefit, index) => (
          <div className="benefit-card" key={index}>
            <div className="benefit-card__icon">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUsSection;