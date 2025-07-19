export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        About <span className="text-indigo-600 dark:text-indigo-400">Eventify</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        Eventify is a simple yet powerful event listing app powered by Ticketmaster.
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        It helps you find events by city and explore their details with ease.
      </p>
    </div>
  );
}
