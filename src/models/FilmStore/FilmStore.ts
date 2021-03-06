import { types, flow, getRoot } from "mobx-state-tree"
import { User } from "../user-store"
// import { observable } from 'mobx'

const OtherVideos = types.model("OtherVideos", {
  project_id: types.optional(types.string, ""),
  music_artist_title: types.optional(types.string, ""),
  topic_names: types.optional(types.array(types.string), []),
  video_views: types.optional(types.string, ""),
})

const CommunityVideos = types.model("CommunityVideos", {
  is_awarded: types.optional(types.string, ""),
  in_top20perc: types.optional(types.string, ""),
  in_top50perc: types.optional(types.string, ""),
  cycle_type: types.optional(types.string, ""),
  cycle_name: types.optional(types.string, ""),
  cycle_type_name: types.optional(types.string, ""),
  topic_names: types.maybe(types.string),
  project_result: types.optional(types.string, ""),
})

const Film = types
  .model("Film", {
    id: types.identifier(types.optional(types.string, "")),
    creator_id: types.maybe(types.reference(User)),
    elevator_pitch: types.optional(types.string, ""),
    app_instance_id: types.optional(types.string, ""),
    title: types.optional(types.string, ""),
    project_lead: types.optional(types.string, ""),
    video_link: types.optional(types.string, ""),
    image_url: types.optional(types.string, ""),
    genre_name: types.optional(types.string, ""),
    bitly_url: types.optional(types.string, ""),
    trending: types.optional(types.string, ""),
    creator_profile_image_url: types.optional(types.string, ""),
  })
  .actions(self => ({
    addCreatorProfileImageUrl(url, pid = "pool") {
      self.creator_profile_image_url = url
    },
  }))

const Community = types.compose(CommunityVideos, Film)
const Other = types.compose(OtherVideos, Film)

export const FilmStoreModel = types
  .model("FilmStore", {
    communityFilms: types.optional(types.array(Community), []),
    otherFilms: types.optional(types.array(Other), []),
    films: types.optional(types.array(Film), []),
    isFetching: types.boolean,
    selectedCommunityFilm: types.maybe(types.reference(Community)),
    selectedOtherFilm: types.maybe(types.reference(Other)),
  })
  .actions(self => ({
    fetchFilms: flow(function*(url, edition) {
      try {
        self.isFetching = true
        const response = yield fetch(url)
        const responseJson = yield response.json()
        edition === "Community Videos"
          ? (self.communityFilms = responseJson.results)
          : (self.otherFilms = responseJson.results)

        // This is a contrived use of films[] and .map function, done for practise, except now it also creates
        // users in the user store
        let rootStore = getRoot(self)
        let userStore = rootStore.userStore
        self.films = responseJson.results.map(item => {
          // create user in user store
          if (userStore.getCreatorById(item.creator_id) === undefined) {
            userStore.addCreator(item.project_lead, item.creator_id)
          }

          return {
            id: item.id,
            creator_id: item.creator_id,
            elevator_pitch: item.elevator_pitch,
            app_instance_id: item.app_instance_id,
            title: item.title,
            project_lead: item.project_lead,
            video_link: item.video_link,
            image_url: item.image_url,
            genre_name: item.genre_name,
            bitly_url: item.bitly_url,
            trending: item.trending,
          }
        })

        self.isFetching = false
      } catch (error) {
        console.error(error)
      }
    }),
    addSelectedCommunityFilm(filmId) {
      self.selectedOtherFilm = null
      self.selectedCommunityFilm = filmId
    },
    addSelectedOtherFilm(filmId) {
      self.selectedCommunityFilm = null
      self.selectedOtherFilm = filmId
    },
  }))
  .views(self => ({
    getFilmById(pid) {
      if (self.selectedOtherFilm === null) {
        return self.communityFilms.find(item => parseInt(item.id) === parseInt(pid))
      } else {
        return self.otherFilms.find(item => parseInt(item.id) === parseInt(pid))
      }
    },
  }))

export type FilmStoreType = typeof FilmStoreModel.Type
