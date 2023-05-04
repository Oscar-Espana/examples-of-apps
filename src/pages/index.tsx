import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-center text-4xl">Aplicaciones de prueba</h1>
      <h2 className="font-medium text-xl mb-5">Enlaces de páginas:</h2>
      <ul>
        <li>
          <Link href="/go-js">Go JS</Link>
        </li>
      </ul>
    </div>
  );
}
