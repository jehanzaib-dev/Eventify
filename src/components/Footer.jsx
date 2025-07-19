export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} <span className="font-semibold text-indigo-600 dark:text-indigo-400">Eventify</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
