import { Api } from "farrow-api";
import { ApiService } from "farrow-api-server";
import {
  Int,
  ObjectType,
  Type,
  String,
  Union,
  Float,
  Nullable,
  Literal,
  List,
  TypeOf,
} from "farrow-schema";
import { prisma } from "../prisma";
import {
  PetStatus as PrismaPetStatus,
  Pet as PrismaPet,
  Category as PrismaCategory,
  PetPhoto as PrismaPetPhoto,
} from "@prisma/client";
import { Category } from "./category";
import { Pagination } from "./shared";

export class PetPhoto extends ObjectType {
  id = Int;
  petId = Int;
  url = String;
}
export const PetStatus = Union(
  Literal(PrismaPetStatus.AVAILABLE),
  Literal(PrismaPetStatus.PENDING),
  Literal(PrismaPetStatus.SOLD)
);
export class Pet extends ObjectType {
  id = Int;
  name = String;
  price = Float;
  costPrice = Float;
  description = String;
  categoryId = Nullable(Int);
  photos = List(PetPhoto);
  status = {
    [Type]: Nullable(PetStatus),
  };
}

export class MaskPet extends ObjectType {
  id = Int;
  name = String;
  price = Float;
  description = String;
  categoryId = Nullable(Int);
  category = Nullable(Category);
  photos = List(PetPhoto);
  status = {
    [Type]: Nullable(PetStatus),
  };
}
export const MaskPetList = List(MaskPet);

// ! create pet
export class CreatePetInput extends ObjectType {
  name = String;
  price = Float;
  description = String;
  costPrice = Float;
  categoryId = Int;
}

export class PetExist extends ObjectType {
  type = Literal("PET_EXIST");
  message = String;
}
export class CreatePetSuccess extends ObjectType {
  type = Literal("CREATE_PET_SUCCESS");
  pet = MaskPet;
}
export const CreatePetOutput = Union(PetExist, CreatePetSuccess);

export const createPet = Api(
  {
    description: "create a new pet",
    input: CreatePetInput,
    output: CreatePetOutput,
  },
  async (input) => {
    const maybeExistPet = await prisma.pet.findFirst({
      where: { name: input.name },
    });
    if (maybeExistPet)
      return { type: "PET_EXIST" as const, message: `pet ${input.name} exist` };

    const pet = await prisma.pet.create({
      data: { ...input, status: "AVAILABLE" },
    });

    const newCreatePet = await prisma.pet.findFirst({
      where: { id: pet.id },
      include: {
        category: true,
        photos: true,
      },
    });

    return {
      type: "CREATE_PET_SUCCESS" as const,
      pet: petToMaskPet(newCreatePet),
    };
  }
);

// find pet by id
export class GetPetByIdInput extends ObjectType {
  id = Int;
}
export class PetNotFound extends ObjectType {
  type = Literal("PET_NOT_FOUND");
  message = String;
  petId = Int;
}
export class GetPetByIdSuccess extends ObjectType {
  type = Literal("GET_PET_BY_ID_SUCCESS");
  pet = MaskPet;
}
export const GetPetByIdOutput = Union(PetNotFound, GetPetByIdSuccess);
export const getPetById = Api(
  {
    description: "get pet by id",
    input: GetPetByIdInput,
    output: GetPetByIdOutput,
  },
  async (input) => {
    const maybePet = await prisma.pet.findUnique({
      where: { id: input.id },
      include: { category: true, photos: true },
    });
    if (!maybePet)
      return {
        type: "PET_NOT_FOUND" as const,
        message: "pet not found",
        petId: input.id,
      };

    return {
      type: "GET_PET_BY_ID_SUCCESS" as const,
      pet: petToMaskPet(maybePet),
    };
  }
);

// ! findPets
export class GetPetListInput extends ObjectType {
  pageIndex = Nullable(Int);
  pageSize = Nullable(Int);
  categoryId = Nullable(Int);
  status = Nullable(PetStatus);
}
export class GetPetListOutput extends ObjectType {
  list = MaskPetList;
  pagination = Pagination;
}
export const getPetList = Api(
  {
    description: "get pet list by filter",
    input: GetPetListInput,
    output: GetPetListOutput,
  },
  async (input) => {
    const pageIndex = input.pageIndex ?? 0;
    const pageSize = input.pageSize ?? 20;
    const whereFilter: { categoryId?: number; status?: PrismaPetStatus } = {};
    if (typeof input.categoryId === "number") {
      whereFilter.categoryId = input.categoryId;
    }
    if (typeof input.status === "string") {
      whereFilter.status = input.status;
    }
    const pets = await prisma.pet.findMany({
      skip: pageIndex * pageSize,
      take: pageSize,
      where: whereFilter,
      include: { category: true, photos: true },
    });
    const total = await prisma.pet.count({
      where: whereFilter,
    });
    return {
      list: pets.map(petToMaskPet),
      pagination: { total, count: pets.length, pageSize, pageIndex },
    };
  }
);

export const service = ApiService({
  entries: {
    createPet,
    getPetList,
    getPetById,
  },
});

// ! util
export type PrismaPetWithCategory = PrismaPet & { category: PrismaCategory } & {
  photos: PrismaPetPhoto[];
};
export type PrismaMaskPet = Pick<
  PrismaPetWithCategory,
  | "id"
  | "categoryId"
  | "price"
  | "name"
  | "status"
  | "category"
  | "photos"
  | "description"
>;
export function petToMaskPet(pet: PrismaPetWithCategory): PrismaMaskPet {
  return {
    id: pet.id,
    categoryId: pet.categoryId,
    category: pet.category,
    status: pet.status,
    price: pet.price,
    name: pet.name,
    photos: pet.photos,
    description: pet.description,
  };
}
