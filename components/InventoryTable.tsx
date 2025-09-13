"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combo-box";
import { Search } from "lucide-react";
import { useState } from "react";
import getPlants from "@/actions/plant.action";
import { useRouter } from "next/navigation";
import CreateDailoge from "./create-dailoge";
import EditDailog from "./EditDiloge";
import DeleteDialog from "./DeleteDialog";


type Plants = Awaited<ReturnType <typeof getPlants> >


interface InventoryTableProps {
  plants: Plants;
}




export default function InventoreyTable({plants}: InventoryTableProps) {

  const router = useRouter()

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlants = plants?.userPlants?.filter((plant: typeof plants.userPlants[number]) => 
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory)
  )

  return (

    <div className="w-full">
      <div className="flex items-center gap-2 py-4">

        <div className="relative max-w--sm w-full">
          <Input
          placeholder="Filter plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10" />

          <Search className=" absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <Combobox value={selectedCategory} onChange={(val) => setSelectedCategory(val)} />

        <CreateDailoge text="New Plant" />

      </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Plant Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...filteredPlants]?.reverse().map((plant: typeof plants.userPlants[number]) => {
          
          const slugifiedName = plant.name.toLowerCase().replace(/\s+/g, '-');
          const slug = `${plant.id}--${slugifiedName}`
          const plantUrl = `/plants/${slug}`;

          return( 
          <TableRow key={plant.id} onClick={() => router.push(plantUrl)} className=" cursor-pointer">
            <TableCell>{plant.id}</TableCell>
            <TableCell>{plant.name}</TableCell>
            <TableCell>{plant.category}</TableCell>
            <TableCell className="font-bold">{plant.price}</TableCell>
            <TableCell className="font-bold">{plant.stock}</TableCell>
            <TableCell className="text-right">
            <div className="flex justify-end space-x-4"
            onClick={(e) => e.stopPropagation()}>
              <EditDailog plant={plant} />
              <DeleteDialog plant={plant} />
            </div>
            </TableCell>
          </TableRow>
          )
        })}
      </TableBody>
    </Table>
    </div>

  );
}
