import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "../navigation-store"
import { FilmStoreModel } from "../FilmStore"

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  filmStore: types.optional(FilmStoreModel, {
    isFetching: false,
  }),
})

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
