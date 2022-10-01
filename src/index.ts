import { DatasourceFieldType, QueryType } from "@budibase/types"
import datasource from "./datasource"
// @ts-ignore
import json from "../schema.json"

export default {
  integration: datasource,
  schema: json
}
