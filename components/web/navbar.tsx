import Link from "next/link"
import { buttonVariants } from "../ui/button"
import { ThemeToggle } from "./theme-toggle"

const Navbar = () => {
  return (
    <nav className="w-full py-5 flex items-center justify-between">
        <div className="flex items-center gap-12">
            <Link href={"/"}>
            <h1 className="text-4xl font-bold">
                My <span className="text-sky-500">BlogApp</span>
            </h1>
            </Link>
            <div className="flex items-center gap-4">
                <Link className={buttonVariants({variant:"ghost"})} href={"/"}>Home</Link>
                <Link className={buttonVariants({variant:"ghost"})} href={"/b;og"}>Blog</Link>
                <Link className={buttonVariants({variant:"ghost"})} href={"/"}>Creat</Link>
            </div>
        </div>
        <div className="flex items-center gap-4 mr-4">
            <Link className={buttonVariants()} href={"/auth/sign-up"}>Sign Up</Link>
            <Link className={buttonVariants({variant:"outline"})} href={"/auth/login"}>Log In</Link>
            <ThemeToggle />
        </div>
    </nav>
  )
}

export default Navbar