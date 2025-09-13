"use server"

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { Prisma } from "@/lib/generated/prisma";
import { revalidatePath } from "next/cache";

export default async function getPlants(searchTerm?: string) {
    try {
        const currentUserId = await getUserId();
        if (!currentUserId) {
            return { success: false, userPlants: [] };
        }

        const whereClause: {
            userId: string;
            name?: {
                contains: string;
                mode: 'insensitive';
            };
        } = {
            userId: currentUserId,
        };

        if (searchTerm) {
            whereClause.name = {
                contains: searchTerm,
                mode: 'insensitive'
            };
        }

        const userPlants = await prisma.plants.findMany({
            where: whereClause,
        });

        // revalidatePath("/");

        return { success: true, userPlants };
    } catch (error) {
        console.error("Error fetching plants:", error);
        return { success: false, userPlants: [], error: "Failed to fetch plants" };
    }
}


export async function getPlantById(id: string) {
    return await prisma.plants.findUnique({
        where: { id }
    })
}


export async function createPlant(data: Prisma.PlantsCreateInput) {
    try {
        
        const currentUserId = await getUserId();
        if(!currentUserId) throw new Error("User not authenticated");

        const newPlant = await prisma.plants.create({
            data:{
                ...data,
                userId: currentUserId
            },
        })

        revalidatePath("/plants")
        return newPlant

    } catch (error) {
        console.error("Error creating plant:", error);
        throw error;
        
    }
}

export async function editPlant(id: string, data: Prisma.PlantsUpdateInput){
    try {
        
        const currentUserId = await getUserId();
        if(!currentUserId) throw new Error("User not authenticated");

        await prisma.plants.update({
            where: {id},
            data: {
                ...data,
                userId: currentUserId
            }
        })

        revalidatePath("/plants")

    } catch (error) {
        console.error("Error updating plant:", error);
        throw error;
    }
}


export async function deletePlant(id: string) {
    try {
        
        const currentUserId = await getUserId();
        if(!currentUserId) throw new Error("User not authenticated");

        await prisma.plants.delete({
            where: {id},
        })
        revalidatePath("/plants")

    } catch (error) {
        console.error("Error deleting plant:", error);
        throw error;
    }
}