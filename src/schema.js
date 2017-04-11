module.exports = {
    "basic!": {
        "name!": "string",
        "mobile!": "number",
        "email!": "string",
        "picture": "string",
        "website": "string",
        "summary": "string",
        "location!": {
            "address!": "string",
            "city!": "string",
            "country!": "string",
            "pincode!": "string",
        },
        "profiles": {
            "github": "string",
            "linkedin": "string",
        },
        "__template": "<div><h1>${name}</h1></div>"
    },
    "work": [{
        "company!": "string",
        "position!": "string",
        "startDate!": "string",
        "endDate": "string",
        "website": "string",
        "summary": "string",
    }],
    "education!": [{
        "school!": "string",
        "area": "string",
        "degree": "string",
        "startDate": "string",
        "endDate": "string",
        "score": "number",
        "courses": "string[]"
    }],
    "volunteer": [{
        "organization!": "string",
        "position!": "string",
        "startDate!": "string",
        "endDate!": "string",
        "website": "string",
        "summary": "string"
    }],
    "awards": [{
        "title!": "string",
        "string": "string",
        "awarder": "string",
        "summary": "string"
    }],
    "skills!": [{
        "name!": "string",
        "level": "string",
        "keywords": "string[]"
    }],
    "languages!": [{
        "name!": "string",
        "level": "string"
    }],
    "interests": [{
        "name!": "string",
        "keywords": "string[]"
    }],
    "references": [{
        "name!": "string",
        "note!": "string"
    }],
    "work__template": "",
    "education__template": "",
    "volunteer__template": "",
    "awards__template": "",
    "skills__template": "",
    "languages__template": "",
    "interests__template": "",
    "references__template": "",
}