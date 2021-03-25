// import { Pet } from "@prisma/client"
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
} from "farrow-schema";
import { prisma } from "../prisma";
import { PetStatus } from '@prisma/client'
import { Category } from "./category";

// export type Pet = {
//   id: number
//   name: string
//   price: number
//   costPrice: number
//   categoryId: number | null
// }

// /**
//  * Model PetPhoto
//  */

// export type PetPhoto = {
//   id: number
//   petId: number | null
//   url: string
// }
export class Pet extends ObjectType {
  id = Int;
  name = String;
  price = Float;
  costPrice = Float;
  categoryId = Nullable(Int);
  status = {
    [Type]: Nullable(
      Union(
        Literal(PetStatus.AVAILABLE),
        Literal(PetStatus.PENDING),
        Literal(PetStatus.SOLD)
      )
    ),
  };
}

export class MaskPet extends ObjectType {
  id = Int;
  name = String;
  price = Float;
  categoryId = Nullable(Int);
  category = Nullable(Category);
  status = {
    [Type]: Nullable(
      Union(
        Literal(PetStatus.AVAILABLE),
        Literal(PetStatus.PENDING),
        Literal(PetStatus.SOLD)
      )
    ),
  };
}
export const MaskPetList = List(MaskPet)

// ! create pet
export class CreatePetInput extends ObjectType {
  name = String;
  price = Float;
  costPrice = Float;
  categoryId = Nullable(Int);
}

export class PetExist extends ObjectType {
  type = Literal("PET_EXIST");
  message = String;
}
export class CreatePetSuccess extends ObjectType {
  type = Literal("CREATE_PET_SUCCESS");
  pet = MaskPet;
}
export class CreatePetOutput extends ObjectType {
  data = Union(PetExist, CreatePetSuccess);
}

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
      return {
        data: { type: "PET_EXIST", message: `pet ${input.name} exist` },
      };

    const result = await prisma.pet.create({ data: input });
    return { data: { type: "CREATE_PET_SUCCESS", pet: result } };
  }
);

// ! findPets
export class GetPetListInput extends ObjectType {
  limit = Nullable(Int)
  categoryId = Nullable(Int)
}

export const service = ApiService({
  entries: {
    createPet
  }
})
