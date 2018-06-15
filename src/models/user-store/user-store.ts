import { types, flow } from "mobx-state-tree"

const User = types.model("User", {
  project_lead: types.optional(types.string, ""),
  image_url: types.optional(types.string, ""),
  project_names: types.optional(types.array(types.string), []),
  project_image_Urls: types.optional(types.array(types.string), []),
  creator_id: types.identifier(types.optional(types.string, "")),
})

export const UserStoreModel = types
  .model("UserStore", {
    users: types.optional(types.array(User), []),
    isFetching: types.boolean,
    selectedUser: types.maybe(types.reference(User)),
  })
  .actions(self => ({
    fetchUser: flow(function*(url: string, projectLead: string, creatorId: string) {
      try {
        self.isFetching = true

        // Check if user info has already been stored, if not then proceed
        const found = self.users.find(item => item.project_lead === projectLead)
        if (!found) {
          // Fetch raw html from individual creator on storyhive and store it as a string
          const response = yield fetch(url)
          const responseHtml = yield response.text()

          // Parse html string for profile image URL, project names, and project ID's
          const profileImage = multipleSearchStrings(
            responseHtml,
            '<img class="creator-image img-responsive" src="',
            '" alt=',
          )[0]
          const projects = multipleSearchStrings(responseHtml, 'title="View Project">', "</a>")
          const projectImageIds = multipleSearchStrings(
            responseHtml,
            'href="/project/show/id/',
            '" class="i-trackclick-profile',
          )

          // Fetch raw html for individual projects from storyhive using project IDs and parse image urls from html
          var projectImageUrls = []
          for (var imageId of projectImageIds) {
            console.log("image id: ", imageId)
            const response = yield fetch("https://www.storyhive.com/project/show/id/" + imageId)
            const responseHtml = yield response.text()
            let projectImageUrl: string
            projectImageUrl = multipleSearchStrings(
              responseHtml,
              '<img class="img-box-art" src="',
              '" alt="',
            )[0]
            if (projectImageUrl === undefined) {
              projectImageUrl = multipleSearchStrings(
                responseHtml,
                'style="background-image: url(',
                "); background-size: cover;",
              )[0]
            }
            projectImageUrls.push(projectImageUrl)
          }

          // Create users and add them to users array
          self.users.push({
            project_lead: projectLead,
            image_url: profileImage,
            project_names: projects,
            project_image_Urls: projectImageUrls,
            creator_id: creatorId,
          })
        } else {
          console.log("user already exists in store")
        }
      } catch (error) {
        console.error(error)
      }
    }),
    addSelectedUser(creatorId) {
      self.selectedUser = creatorId
    },
  }))

function multipleSearchStrings(
  responseHtml,
  searchStringStart,
  searchStringEnd,
  previousSearchEndIndex = 0,
  searchResults = [],
) {
  let searchStartIndex = responseHtml.indexOf(searchStringStart, previousSearchEndIndex)

  if (searchStartIndex > 0) {
    //
    let searchEndIndex = responseHtml.indexOf(searchStringEnd, searchStartIndex)
    let secondProjectString = responseHtml
      .substring(searchStartIndex + searchStringStart.length, searchEndIndex)
      .trim()
    //
    searchResults.push(secondProjectString)
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
