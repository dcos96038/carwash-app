import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <h1 className="text-center text-2xl font-semibold">Welcome</h1>

      <div>
        <pre className="max-w-96 text-wrap text-sm font-medium italic">
          {JSON.stringify(session.user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
