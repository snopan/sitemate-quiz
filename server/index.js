import express from "express"

const app = express()
app.use(express.json())
const port = 3000

/** 
 * Contains all issue where each issue is typed
 * {
 *  title: string,
 *  description: string
 * }
 * and is mapped with key id: string
 */ 
const issues = {}

// This function checks whether the given id is for a valid issue within all issues
const isValidIssue = (issues, id) => Object.keys(issues).includes(`${id}`)

// This function retireves the issue and formats it to what return needs to be
// this does not cover if the given issue id doesn't exist, it should be checked before
const getFormattedIssue = (issues, id) => {
    const issue = issues[id]
    return {
        id,
        title: issue.title,
        description: issue.description
    }
}

// Get all issues
app.get("/issues", (req, res) => {
    const formattedIssueList = Object.keys(issues).map(id => getFormattedIssue(issues, id))
    res.json({ issues: formattedIssueList })
})

// Get an issue by id
app.get("/issues/:id", (req, res) => {
    const id = req.params.id

    // When the given issue id doesn't exist
    if (!isValidIssue(issues, id)) {
        res.status(400).send("The provided issue id does not exist")
    }

    res.json(getFormattedIssue(issues, id))
})

// Create an issue
app.post("/issues", (req, res) => {
    const { id, title, description } = req.body

    // Issue already exists
    if (isValidIssue(issues, id)) {
        res.status(400).send("Another issue already exist with the same id")
    }

    issues[id] = { title, description }
    res.status(200).send()
})

// Update an issue by id and only update the title or description if they're not empty
app.put("/issues", (req, res) => {
    const { id, title: newTitle, description: newDescription } = req.body

    // When the given issue id doesn't exist
    if (!isValidIssue(issues, id)) {
        res.status(400).send("The provided issue id does not exist")
    }

    const issue = issues[id]
    issues[id] = {
        title: newTitle ? newTitle : issue.title,
        description: newDescription ? newDescription : issue.description
    }
    res.json(getFormattedIssue(issues, id))
})

// Delete an issue by id
app.delete("/issues/:id", (req, res) => {
    const id = req.params.id

    // When the given issue id doesn't exist
    if (!isValidIssue(issues, id)) {
        res.status(400).send("The provided issue id does not exist")
    }
    
    delete issues[id]
    res.status(200).send()
})

// Start the express server
app.listen(port)