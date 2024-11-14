"use client"

import Link from "next/link"

export default function ErrorPage() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-md space-y-4 text-center">
        <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-600 dark:bg-red-900 dark:text-red-400">
          Error
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Oops, something went wrong!</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {`We're sorry, but it looks like there was an issue on our end. Please try again later or contact us if the
          problem persists.`}
        </p>
        <Link
          href="/user/dashboard"
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}