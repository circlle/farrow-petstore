import { ObjectType, Int } from "farrow-schema";

export class Pagination extends ObjectType {
  total = Int;
  count = Int;
  pageSize = Int;
  pageIndex = Int;
}