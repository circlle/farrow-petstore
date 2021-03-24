import { Api } from "farrow-api";
import { ApiService } from "farrow-api-server";
import { Int, ObjectType, Type, String, List } from "farrow-schema";

export class Category extends ObjectType {
  id = {
    description: "The id of category",
    [Type]: Int,
  };

  name = {
    description: "The name of category",
    [Type]: String,
  };

  description = {
    description: "category description",
    [Type]: String,
  };

  image = {
    description: "category photo",
    [Type]: String,
  };
}

export const CategoryList = List(Category);

// ! create category
export class CreateCategoryInput extends ObjectType {
  name = {
    description: "The name of category",
    [Type]: String,
  };

  description = {
    description: "category description",
    [Type]: String,
  };

  image = {
    description: "category photo",
    [Type]: String,
  };
}

export class CreateCategoryOutput extends ObjectType {
  category = {
    description: "The category",
    [Type]: Category,
  };
}

export const createCategory = Api(
  {
    description: "create a new category",
    input: CreateCategoryInput,
    output: CreateCategoryOutput,
  },
  (input) => {
    // todo
    return {
      category: {
        ...input,
        id: 1,
      },
    };
  }
);

// ! delete category
export class DeleteCategoryInput extends ObjectType {
  id = {
    description: "Category id for removing",
    [Type]: Int,
  };
}

export class DeleteCategoryOutput extends ObjectType {
  category = {
    description: "Category deleted",
    [Type]: Category,
  };
}

export const deleteCategory = Api(
  {
    description: "delete one category",
    input: DeleteCategoryInput,
    output: DeleteCategoryOutput,
  },
  (input) => {
    // todo
    return {
      category: {
        name: "",
        id: input.id,
        description: "",
        image: "",
      },
    };
  }
);

// ! get category list
export class GetCategoryListInput extends ObjectType {
  limit = {
    description: "how many category to get",
    [Type]: Int,
  };
}

export class GetCategoryListOutput extends ObjectType {
  list = {
    [Type]: CategoryList,
  };
  count = {
    [Type]: Int,
  };
}

export const getCategoryList = Api(
  {
    description: "get category list",
    input: GetCategoryListInput,
    output: GetCategoryListOutput,
  },
  (input) => {
    // todo
    return {
      list: [],
      count: input.limit,
    };
  }
);

export const service = ApiService({
  entries: {
    createCategory,
    deleteCategory,
    getCategoryList
  },
});
