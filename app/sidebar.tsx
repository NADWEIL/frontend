import Link from "next/link";
import { LEARNING_CATEGORIES } from "./learning-categories";

export function Sidebar() {
  return (
    <aside className="w-full lg:w-64 lg:flex-none">
      <div className="rounded-3xl border border-gray-200 bg-white/90 p-4 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-900/80 lg:sticky lg:top-32">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            Explorer
          </p>
          <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
            Thèmes utiles
          </h2>
        </div>

        <nav className="flex flex-col gap-2">
          {LEARNING_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/themes/${category.slug}`}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-800 transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-primary/40 dark:hover:bg-primary/10"
            >
              {category.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
