import { types, flow, getRoot } from "mobx-state-tree"

export const User = types.model("User", {
  project_lead: types.optional(types.string, ""),
  image_url: types.optional(types.string, ""),
  project_names: types.optional(types.array(types.string), []),
  project_image_urls: types.optional(types.array(types.string), []),
  creator_id: types.identifier(types.optional(types.string, "")),
})

export const UserStoreModel = types
  .model("UserStore", {
    users: types.optional(types.array(User), []),
    isFetching: types.boolean,
    // selectedUser: types.maybe(types.reference(User)),
  })
  .actions(self => ({
    fetchUser: flow(function*(url: string, projectLead: string, creatorId: string, filmId: string) {
      try {
        self.isFetching = true

        // Check if user info has already been stored, if not then proceed
        const found = self.users.find(item => item.project_lead === projectLead)
        if (found.image_url === "") {
          // Fetch raw html from individual creator on storyhive and store it as a string
          const response = yield fetch(url)
          const responseHtml = yield response.text()

          // Parse html string for profile image URL, project names, and project ID's
          const profileImage = whileLoopSearch(
            responseHtml,
            '<img class="creator-image img-responsive" src="',
            '" alt=',
          )[0]
          const projects = whileLoopSearch(responseHtml, 'title="View Project">', "</a>")
          const projectImageIds = whileLoopSearch(
            responseHtml,
            'href="/project/show/id/',
            '" class="i-trackclick-profile',
          )

          // Gets reference for filmStore
          let rootStore = getRoot(self)
          let filmStore = rootStore.filmStore

          // Use the filmId paramater to grab matching film from filmstore, and add creators profile image to said film in filmStore
          let someFilm = filmStore.getFilmById(filmId)
          someFilm.addCreatorProfileImageUrl(profileImage, filmId)

          // Fetch raw html for individual projects from storyhive
          // using project IDs and parse image urls from html
          var projectImageUrls = []
          for (var imageId of projectImageIds) {
            const response = yield fetch("https://www.storyhive.com/project/show/id/" + imageId)
            const responseHtml = yield response.text()
            let projectImageUrl: string
            projectImageUrl = whileLoopSearch(
              responseHtml,
              '<img class="img-box-art" src="',
              '" alt="',
            )[0]
            if (projectImageUrl === undefined) {
              projectImageUrl = whileLoopSearch(
                responseHtml,
                'style="background-image: url(',
                "); background-size: cover;",
              )[0]
            }
            projectImageUrls.push(projectImageUrl)
          }

          // Create users and add them to users array
          let creator = self.getCreatorById(creatorId)
          creator.image_url = profileImage
          creator.project_image_urls = projectImageUrls
          creator.project_names = projects
        } else {
          console.log("user already exists in store")
        }
        self.isFetching = false
      } catch (error) {
        console.error(error)
      }
    }),
    addCreator(projectLead, creatorId) {
      self.users.push({
        project_lead: projectLead,
        creator_id: creatorId,
      })
    },
  }))
  .views(self => ({
    getCreatorById(pid) {
      let creator = self.users.find(item => parseInt(item.creator_id) === parseInt(pid))
      return creator
    },
  }))

function whileLoopSearch(responseHtml, searchStringStart, searchStringEnd) {
  var mySearchResults = []
  var searchStartIndex = responseHtml.indexOf(searchStringStart)

  // Searches html.text() for all text between search string start and end. Stops while loop when search
  // start index is -1, meaning there are no more search results.
  while (searchStartIndex >= 0) {
    let searchEndIndex = responseHtml.indexOf(searchStringEnd, searchStartIndex)
    let projectString = responseHtml
      .substring(searchStartIndex + searchStringStart.length, searchEndIndex)
      .trim()
    mySearchResults.push(projectString)

    searchStartIndex = responseHtml.indexOf(searchStringStart, searchEndIndex)
  }

  return mySearchResults
}

function multipleSearchStrings(
  responseHtml,
  searchStringStart,
  searchStringEnd,
  previousSearchEndIndex = 0,
  searchResults = [],
) {
  let searchStartIndex = responseHtml.indexOf(searchStringStart, previousSearchEndIndex)

  if (searchStartIndex >= 0) {
    //
    let searchEndIndex = responseHtml.indexOf(searchStringEnd, searchStartIndex)
    let projectString = responseHtml
      .substring(searchStartIndex + searchStringStart.length, searchEndIndex)
      .trim()
    //
    searchResults.push(projectString)
    searchResults.concat(
      multipleSearchStrings(
        responseHtml,
        searchStringStart,
        searchStringEnd,
        searchEndIndex,
        searchResults,
      ),
    )
  }
  return searchResults
}

export type UserStoreType = typeof UserStoreModel.Type
export type UserType = typeof User.Type
