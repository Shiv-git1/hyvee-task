import Navbar from "./components/Navbar";
import InputForm from "./components/InputForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#060606]">
      <Navbar />
      <InputForm />
    </main>
  );
}
