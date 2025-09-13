import getPlants from "@/actions/plant.action";
import InventoreyTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack"
import { SignIn } from "@stackframe/stack";

export default async function page() {

    const user = await stackServerApp.getUser();
    const plants = await getPlants()

  return (
    <>
      {user ? (
        <>
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
        <h1 className="text-2xl py-5 leading-[1]">Inventorey Table</h1>
        <div className="lg:col-span-full w-full">
        <InventoreyTable plants={plants} />
        </div>
        </div>
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
            <SignIn/>
        </div>
      )}
    </>
  )
}
