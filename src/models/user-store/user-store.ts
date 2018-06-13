import { types, flow } from "mobx-state-tree"
import DomSelector from "react-native-dom-parser"

const User = types.model("User", {
  project_lead: types.optional(types.string, ""),
  image_url: types.optional(types.string, ""),
  project_names: types.optional(types.array(types.string), []),
})

export const UserStoreModel = types
  .model("UserStore", {
    users: types.optional(types.array(User), []),
    isFetching: types.boolean,
  })
  .actions(self => ({
    fetchUser: flow(function*(url: string, projectLead: string) {
      try {
        self.isFetching = true
        const found = self.users.find(item => item.project_lead === projectLead)

        if (!found) {
          console.log(url)
          const response = yield fetch(url)
          const responseHtml = yield response.text()

          const imageStringStart = '<img class="creator-image img-responsive" src="'
          const index = responseHtml.indexOf(imageStringStart)
          const newIndex = responseHtml.indexOf(".jpg", index) + 4
          const imageString = responseHtml.substring(index + imageStringStart.length, newIndex)
          console.log(newIndex)
          console.log(index)
          console.log(imageString)

          let projectsStringStart = 'title="View Project">'
          let projectsStartIndex = responseHtml.indexOf(projectsStringStart)
          let projectEndIndex = responseHtml.indexOf("</a>", projectsStartIndex)
          let projectString = responseHtml
            .substring(projectsStartIndex + projectsStringStart.length, projectEndIndex)
            .trim()

          console.log("projectsStartIndex: ", projectsStartIndex)
          console.log(projectString)
          const projects = multipleProjectStrings(responseHtml, projectEndIndex)
          console.log(projects.length)
          var i
          for (i = 0; i < projects.length; i++) {
            console.log("project name: ", projects[i])
          }
          // let secondProjectStartIndex = responseHtml.indexOf(
          //   'title="View Project">',
          //   projectEndIndex,
          // )
          // if (secondProjectStartIndex > 0) {
          //   let secondProjectEndIndex = responseHtml.indexOf("</a>", secondProjectStartIndex)
          //   let secondProjectString = responseHtml.substring(
          //     secondProjectStartIndex + projectsStringStart.length,
          //     secondProjectEndIndex,
          //   )

          //   console.log(secondProjectString)
          // }

          // self.users.push({
          //   project_lead: projectLead,
          //   image_url: imageUrl,
          //   project_names: projectNames,
          // })
        } else {
          console.log("user already exists in store")
        }
      } catch (error) {
        console.error(error)
      }
    }),
    // multipleProjectStrings: function(responseHtml, firstProjectEndIndex) {
    //   let projectsStringStart = 'title="View Project">'
    //   let secondProjectStartIndex = responseHtml.indexOf(
    //     'title="View Project">',
    //     firstProjectEndIndex,
    //   )
    //   if (secondProjectStartIndex > 0) {
    //     let secondProjectEndIndex = responseHtml.indexOf("</a>", secondProjectStartIndex)
    //     let secondProjectString = responseHtml.substring(
    //       secondProjectStartIndex + projectsStringStart.length,
    //       secondProjectEndIndex,
    //     )
    //     console.log(secondProjectString)
    //   }
    // },
  }))

function multipleProjectStrings(responseHtml, firstProjectEndIndex, projects = []) {
  //var projects = []
  let projectsStringStart = 'title="View Project">'
  let secondProjectStartIndex = responseHtml.indexOf('title="View Project">', firstProjectEndIndex)
  let secondProjectEndIndex: any
  if (secondProjectStartIndex > 0) {
    secondProjectEndIndex = responseHtml.indexOf("</a>", secondProjectStartIndex)
    let secondProjectString = responseHtml
      .substring(secondProjectStartIndex + projectsStringStart.length, secondProjectEndIndex)
      .trim()
    projects.push(secondProjectString)
    console.log(secondProjectString)
    projects.concat(multipleProjectStrings(responseHtml, secondProjectEndIndex, projects))
  }
  console.log(projects.length)
  return projects
}

export type UserStoreType = typeof UserStoreModel.Type
