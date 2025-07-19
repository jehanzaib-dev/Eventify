export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Contact <span className="text-indigo-600 dark:text-indigo-400">Us</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        You can reach us at:
      </p>
      <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
        <li className="flex items-center justify-center gap-2">
          <span className="font-medium">Email:</span>
          <a
            href="mailto:support@eventify.com"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            support@eventify.com
          </a>
        </li>
        <li className="flex items-center justify-center gap-2">
          <span className="font-medium">Phone:</span>
          <a
            href="tel:+921234567890"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            +92 123 4567890
          </a>
        </li>
      </ul>
    </div>
  );
}
