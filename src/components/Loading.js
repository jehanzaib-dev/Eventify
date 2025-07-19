import Spinner from "@/components/Spinner";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-600 dark:text-gray-300">
      <Spinner size="10" color="border-indigo-600" />
      {text && <p className="mt-4 text-sm font-medium">{text}</p>}
    </div>
  );
}
