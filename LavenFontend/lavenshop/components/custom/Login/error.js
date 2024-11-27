import { ExclamationTriangle } from "@/components/icons/exclamation-triangle";

export const Error = ({ error }) => {
  return (
    <div className="flex items-center gap-x-4 px-4 py-2 bg-red-100 text-red-500 rounded">
      <ExclamationTriangle className="size-6" />
      <span>{error}</span>
    </div>
  );
};