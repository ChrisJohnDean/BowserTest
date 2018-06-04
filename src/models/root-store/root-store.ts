import { types } from "mobx-state-tree"
import { NavigationStoreModel } from "../navigation-store"
import  { FilmStore } from "../FilmStore"

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  navigationStore: types.optional(NavigationStoreModel, {}),
  filmStore: types.optional(FilmStore, {
    //communityFilms: [],
    //otherFilms: [],
    //films: [],
    isFetching: true,
    //selectedCommunityFilm: "",
    //selectedOtherFilm: "",
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
