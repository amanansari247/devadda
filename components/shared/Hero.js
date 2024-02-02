
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
<div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
  <div className="flex flex-col justify-center gap-8">
    <h1 className="h1-bold">Linking Developers, Igniting Ideas!!</h1>
    <p>
    DevAdda is a dynamic platform where developers come together to collaborate, share ideas, and innovate. Connect with fellow programmers, ignite creativity, and bring your projects to life.
    </p>
    <Link href="/login">
    <button className="button w-full h-9  sm:w-24 border border-purple-300 " size='lg'>
      
        Explore 😎
     
    </button>
    </Link>
    
  </div>
  <Image 
  src='/assets/images/devadda-hero.png'
  alt="Pro coder"
  width={1000}
  height={1000}
  className="max-h-[70vh] object-contain object-center"
  />

</div>

      </section>

      
    </>
  );
}
