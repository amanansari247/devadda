import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";




export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 sm:p-24">
      <Header/>
      <Hero/>
     
      <Footer/>
    </main>
  );
}
