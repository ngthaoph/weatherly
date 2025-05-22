// pages/contact.tsx

import Head from "next/head";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Weatherly</title>
        <meta
          name="description"
          content="Get in touch with the creator of Weatherly."
        />
      </Head>
      <main className="max-w-xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Contact</h1>

        <p className="mb-6">
          Have questions, feedback, or suggestions? Feel free to reach out!
        </p>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="mb-4">You can contact me directly via email:</p>
          <a
            href="mailto:your.email@example.com"
            className="text-blue-600 underline text-lg"
          >
            your.email@example.com
          </a>
        </div>
      </main>
    </>
  );
}
