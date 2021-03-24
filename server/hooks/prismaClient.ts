import { createContext } from "farrow-pipeline";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const PrismaContext = createContext<PrismaClient>(prisma);

export { PrismaContext }