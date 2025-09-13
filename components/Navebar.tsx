import Link from "next/link";
import { Button } from "./ui/button";
import { HomeIcon, LogIn, Sprout } from "lucide-react";
import ModeToggle from "./ModeToggle";
import { stackServerApp } from "@/stack";
import { UserButton } from "@stackframe/stack";

async function Navebar() {
  const user = await stackServerApp.getUser();

  const app = stackServerApp.urls;


  return (
    <nav className=" sticky top-0 left-0 w-full border-b bg-background/90 backdrop-blur supports-[bacrdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl m-auto px-4">
        <div className="flex items-center justify-between w-full h-16">
          <Link
            href="/"
            className="text-xl font-bold font-mono text-primary tracking-tighter "
          >
            🌳 Plantventory
          </Link>
          <div className=" hidden md:flex md:items-center space-x-4">

            {user && (
                <>
                  <Button variant="ghost" className="flex items-center gap-2" asChild>
                    <Link href={"/plants"}>
                      <Sprout className="w-4 h-4" />
                      <span className="hidden lg:inline">Plants</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2" asChild>
                    <Link href={"/"}>
                      <HomeIcon className="w-4 h-4" />
                      <span className="hidden lg:inline">Home</span>
                    </Link>
                  </Button>
                </>
            )}

            <ModeToggle />

            {user ? (
              <>

                {/* <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signOut}>
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Sign Out</span>
                  </Link>
                </Button> */}

                <UserButton />
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signIn}>
                    <LogIn className="w-4 h-4" />
                    <span className="hidden lg:inline">Sign In</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navebar;
