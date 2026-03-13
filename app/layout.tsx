import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"

export default function RootLayout({ children }) {

return (

<html lang="ar">

<body className="bg-gray-50">

<Navbar/>

<main className="max-w-7xl mx-auto px-6 py-10">

{children}

</main>

<Footer/>

</body>

</html>

)

}