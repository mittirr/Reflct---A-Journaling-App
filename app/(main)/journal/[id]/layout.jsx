import Link from "next/link";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";
// import Loading from "./loading";

export default function CollectionLayout({ children }) {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="text-sm text-yellow-600 hover:text-yellow-700"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <Suspense fallback={<BarLoader color="yellow" width={"100%"}/>}>{children}</Suspense>
    </div>
  );
}