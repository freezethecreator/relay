export default function Page() {
  return (
    <section>
      <h1 className="text-4xl font-extrabold tracking-tight">Incoming</h1>
      <p className="mt-2 text-muted">Files your teammates sent you.</p>
      <div className="mt-16 text-center">
        <p className="font-semibold">Nothing incoming yet</p>
        <p className="mt-1 text-sm text-muted">Files sent to your @tag will appear here.</p>
      </div>
    </section>
  );
}
