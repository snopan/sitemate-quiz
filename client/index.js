import axios from "axios"
import prompts from "prompts"

const serverPort = 3000

const askAction = async () => {
    const { action } = await prompts({
        type: "select",
        name: "action",
        message: "What action would you like to do",
        choices: [
            { title: '1 - Read issues', value: 1 },
            { title: '2 - Create issue', value: 2 },
            { title: '3 - Update issue', value: 3 },
            { title: '4 - Delete issue', value: 4 },
            { title: '5 - Exit program', value: 5 },
        ]
    })

    switch (action) {
        case 1:
            await askReadAction()
            break;
        case 2:
            await createIssue()
            break;
        case 3: 
            await updateIssue()
            break;
        case 4: 
            await deleteIssue()
            break;
        case 5:
            process.exit()
        default:
            throw Error("not a valid option");
    }

    await askAction()
}

const askReadAction = async () => {
    const { readAction } = await prompts({
        type: "select",
        name: "readAction",
        message: "What read action would you like to do",
        choices: [
            { title: '1 - Read all issues', value: 1 },
            { title: '2 - Read single issue', value: 2 },
        ]
    })

    switch (readAction) {
        case 1: 
            await readAllIssue()
            break;
        case 2: 
            await readSingleIssue()
            break;
        default:
            throw Error("not a valid read option");
    }
}

const readAllIssue = async () => {
    const { data } = await axios.get(`http://localhost:${serverPort}/issues`)
    console.log(data.issues)
}

const readSingleIssue = async () => {
    const { id } = await prompts({
        type: "number",
        name: "id",
        message: "Please provide an id to the issue you want to fetch",
        validate: value => !value || value < 0 ? "Please provide a valid id number" : true
    })

    const { data } = await axios.get(`http://localhost:${serverPort}/issues/${id}`)
    console.log(data)
}

const createIssue = async () => {
    const { id, title, description } = await prompts([
        {
            type: "number",
            name: "id",
            message: "Please provide an id for the issue, no negative id number allowed",
            validate: value => !value || value < 0 ? "Please provide a valid id number" : true
        },
        {
            type: "text",
            name: "title",
            message: "Please provide a title for the issue",
            validate: value => !value ? "No title provided, please give a title" : true
        },
        {
            type: "text",
            name: "description",
            message: "Please provide a description for the issue",
            validate: value => !value ? "No description provided, please give a description" : true
        }
    ])

    const response = await axios.post(
        `http://localhost:${serverPort}/issues`, 
        { id, title, description }
    )
    // The issue may already exist
}

const updateIssue = async () => {
    const { id, title, description } = await prompts([
        {
            type: "number",
            name: "id",
            message: "Please provide an id for the issue, no negative id number allowed",
            validate: value => !value || value < 0 ? "Please provide a valid id number" : true
        },
        {
            type: "text",
            name: "title",
            message: "Please provide a new title for the issue, if nothing is provided the it will remain the same",
        },
        {
            type: "text",
            name: "description",
            message: "Please provide a new description for the issue, if nothing is provided the it will remain the same",
        }
    ])

    const response = await axios.put(
        `http://localhost:${serverPort}/issues`, 
        { id, title, description }
    )
}

const deleteIssue = async () => {
    const { id } = await prompts({
        type: "number",
        name: "id",
        message: "Please provide an id to the issue you want to delete",
        validate: value => !value || value < 0 ? "Please provide a valid id number" : true
    })

    const response = await axios.delete(`http://localhost:${serverPort}/issues/delete/${id}`)
}

( async () => askAction() )()

